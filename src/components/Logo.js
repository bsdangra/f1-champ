import f1Logo from "../imgs/f1.png";
import styles from "../styles/styles.module.css";

export function Logo() {
  return (
    <div className={styles.appLogo}>
      <img src={f1Logo} alt="F1 - Logo" />
    </div>
  );
}
