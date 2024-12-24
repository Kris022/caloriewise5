import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Settings.module.css";
import { IoArrowBack, IoChevronForward } from "react-icons/io5";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { IoMdNotifications, IoMdNotificationsOff } from "react-icons/io";

const Settings = () => {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);
    // TODO: Implement theme switching logic
  };

  const handleNotificationsToggle = () => {
    setNotificationsEnabled(!notificationsEnabled);
    // TODO: Implement notifications logic
  };

  return (
    <div className={styles.settingsContainer}>
      <header className={styles.header}>
        <button className={styles.backButton} onClick={() => navigate("/")}>
          <IoArrowBack />
        </button>
        {/* <h1>Settings</h1> */}
      </header>

      <section className={styles.section}>
        <h2>Appearance</h2>
        <div className={styles.settingItem}>
          <span>Theme</span>
          <button className={styles.themeToggle} onClick={handleThemeToggle}>
            {isDarkMode ? <MdLightMode /> : <MdDarkMode />}
            {isDarkMode ? "Light Mode" : "Dark Mode"}
            <IoChevronForward />
          </button>
        </div>
      </section>

      <section className={styles.section}>
        <h2>Goals</h2>
        <div className={styles.settingItem}>
          <span>Your Caloric Goals</span>
          <button
            className={styles.settingButton}
            onClick={() => navigate("/goals")}
          >
            2,000kcal
            <IoChevronForward />
          </button>
        </div>
      </section>

      <section className={styles.section}>
        <h2>Notifications</h2>
        <div className={styles.settingItem}>
          <span>Push Notifications</span>
          <button
            className={styles.notificationToggle}
            onClick={handleNotificationsToggle}
          >
            {notificationsEnabled ? (
              <IoMdNotifications />
            ) : (
              <IoMdNotificationsOff />
            )}
            <IoChevronForward />
          </button>
        </div>
      </section>
    </div>
  );
};

export default Settings;
