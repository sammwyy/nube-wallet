import styles from "./landscape-bg.module.css";

export default function LandscapeBG({ children }) {
  return (
    <div className={styles["area"]}>
      <ul className={styles["circles"]}>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
  );
}
