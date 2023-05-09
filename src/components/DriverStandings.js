import React from "react";
import styles from "../styles/styles.module.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export function DriverStandings({ driver, getWinnerInfo }) {
  return (
    <div onClick={() => getWinnerInfo(driver)} style={{cursor: 'pointer'}}>
      <Card variant="outlined" className={styles.section}>
        <CardContent>
          <Typography variant="h5" color="#fff">
            {driver?.season}
          </Typography>
          <Typography variant="h5" color="#fff">
            {driver?.givenName + " " + driver?.familyName}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
