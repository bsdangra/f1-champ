import React, { useState, useEffect } from "react";
import styles from "./styles/styles.module.css";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { driverStandings, winnerInfo } from "./service/api";
import { NavBar } from "./components/NavBar";
import { DriverStandings } from "./components/DriverStandings";
import { SeasonsWinner } from "./components/SeasonsWinner";

function App() {
  const [driverList, setDriverList] = useState([]);
  const [seasonsWinnerList, setSeasonsWinnerList] = useState([]);
  const [showDriverSec, setShowDriverSec] = useState(true);
  const [selectedDriverId, setSelectedDriverId] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const yearFilter = 2005;

  useEffect(() => {
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
    });
  }, []);

  const getWinnerInfo = (driverInfo) => {
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
          });
        });
        setSeasonsWinnerList(arr);
        setShowDriverSec(false);
        setSelectedDriverId(driverInfo.driverId);
        setSelectedYear(driverInfo.season);
      }
    });
  };

  return (
    <>
      <NavBar />
      <div className={styles.container}>
        <Typography variant="h3" color="text.primary" className={styles.heading}>
          { showDriverSec ? 'F1 Champions' : `${selectedYear} Seasons Champions`}
        </Typography>
        {showDriverSec &&
          driverList.map((driver) => {
            return (
              <DriverStandings driver={driver} getWinnerInfo={getWinnerInfo} />
            );
          })}
        {!showDriverSec && (
          <div className={styles.backBtn}>
            <Button variant="contained" onClick={() => setShowDriverSec(true)} >
            Back{" "}
          </Button>
          </div>
        )}
        {!showDriverSec &&
          seasonsWinnerList.map((driver, index) => {
            return (
              <SeasonsWinner
                driver={driver}
                selectedDriverId={selectedDriverId}
                selectedYear={selectedYear}
              />
            );
          })}
      </div>
    </>
  );
}

export default App;
