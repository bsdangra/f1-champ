import React from 'react';
import styles from "../styles/styles.module.css";
import CircularProgress from '@mui/material/CircularProgress';

export function GlobalLoader({ open }) {
  return (
    <>
      {open && (
        <div className={styles.backdrop}>
          <CircularProgress className={styles.spinner} />
        </div>
      )}
    </>
  );
}
