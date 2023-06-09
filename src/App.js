import React, { useState, useEffect } from "react";
import styles from "./styles/styles.module.css";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { driverStandings, winnerInfo } from "./service/api";
import { NavBar } from "./components/NavBar";
import { DriverStandings } from "./components/DriverStandings";
import { SeasonsWinner } from "./components/SeasonsWinner";
import { GlobalLoader } from "./components/GlobalLoader";

function App() {
  const [driverList, setDriverList] = useState([]);
  const [seasonsWinnerList, setSeasonsWinnerList] = useState([]);
  const [showDriverSec, setShowDriverSec] = useState(true);
  const [selectedDriverId, setSelectedDriverId] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [loading, setLoading] = useState(false);
  const yearFilter = 2005;

  useEffect(() => {
    setLoading(true);
    const res = driverStandings();
    res.then((result) => {
      let list = result?.MRData?.StandingsTable?.StandingsLists;
      if (list && list.length > 0) {
        let filterObj = list.filter(
          (item) => Number(item.season) >= yearFilter
        );
        let arr = [];
        filterObj.forEach((element) => {
          arr.push({
            season: Number(element.season),
            givenName: element?.DriverStandings[0].Driver.givenName,
            familyName: element?.DriverStandings[0].Driver.familyName,
            driverId: element?.DriverStandings[0].Driver.driverId,
          });
        });
        setDriverList(arr);
      }
      setLoading(false);
    });
  }, []);

  const getWinnerInfo = (driverInfo) => {
    setLoading(true);
    const res = winnerInfo(driverInfo.season);
    res.then((result) => {
      let list = result?.MRData?.RaceTable?.Races;
      if (list && list.length > 0) {
        let arr = [];
        list.forEach((element) => {
          arr.push({
            givenName: element?.Results[0].Driver.givenName,
            familyName: element?.Results[0].Driver.familyName,
            driverId: element?.Results[0].Driver.driverId,
            constructorName: element?.Results[0].Constructor.name,
            raceName: element?.raceName,
            circuitId: element?.Circuit.circuitId,
          });
        });
        setSeasonsWinnerList(arr);
        setShowDriverSec(false);
        setSelectedDriverId(driverInfo.driverId);
        setSelectedYear(driverInfo.season);
      }
      setLoading(false);
    });
  };

  return (
    <>
      <NavBar />
      <div className={styles.container}>
        {loading && (
          <div>
            <GlobalLoader open={loading} />{" "}
          </div>
        )}
        <Typography
          variant="h3"
          color="text.primary"
          className={styles.heading}
        >
          {showDriverSec ? "F1 Champions" : `${selectedYear} Seasons Champions`}
        </Typography>
        {showDriverSec &&
          driverList.map((driver) => {
            return (
              <DriverStandings
                driver={driver}
                getWinnerInfo={getWinnerInfo}
                key={driver.season}
              />
            );
          })}
        {!showDriverSec && (
          <div className={styles.backBtn}>
            <Button variant="contained" onClick={() => setShowDriverSec(true)}>
              Back{" "}
            </Button>
          </div>
        )}
        {!showDriverSec &&
          seasonsWinnerList.map((driver) => {
            return (
              <SeasonsWinner
                driver={driver}
                selectedDriverId={selectedDriverId}
                selectedYear={selectedYear}
                key={driver?.circuitId}
              />
            );
          })}
      </div>
    </>
  );
}

export default App;
