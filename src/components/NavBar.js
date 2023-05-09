import React from "react";
import styles from "../styles/styles.module.css";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Logo } from './Logo';

export function NavBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar className={styles.toolbarContainer}>
          <Logo />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
