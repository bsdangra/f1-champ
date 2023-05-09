import React from "react";
import styles from "../styles/styles.module.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";


export function SeasonsWinner({ driver, selectedDriverId, selectedYear }) {
  return (
    <div>
      <Card
        variant="outlined"
        className={
          driver.driverId === selectedDriverId
            ? styles.sectionWinner
            : styles.section
        }
      >
        <CardContent>
          <Typography variant="h5" color="#fff">
            {`${driver.raceName} - ${driver.constructorName}`}
          </Typography>
          <Typography variant="h5" color="#fff">
            {driver?.givenName + " " + driver?.familyName}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
