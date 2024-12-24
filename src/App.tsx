import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import {
  AiOutlineHome,
  AiOutlinePlus,
  AiOutlineHistory,
  AiOutlineSetting,
} from "react-icons/ai";
import styles from "./App.module.css";
import Settings from "./components/Settings";
import Goals from "./components/Goals";
import AddFood from "./components/AddFood";
import Home from "./components/Home";
import PWAPrompt from "./components/PWAPrompt";
import { ThemeProvider } from "./context/ThemeContext";
import { FoodProvider } from "./context/FoodContext";

function App() {
  return (
    <ThemeProvider>
      <FoodProvider>
        <BrowserRouter>
          <div className={styles.appContainer}>
            <main className={styles.mainContent}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/add" element={<AddFood />} />
                <Route path="/history" element={<div>History</div>} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/goals" element={<Goals />} />
              </Routes>
            </main>

            <nav className={styles.bottomNav}>
              <Link to="/" className={styles.navItem}>
                <AiOutlineHome />
                <span>Home</span>
              </Link>
              <Link to="/add" className={styles.navItem}>
                <AiOutlinePlus />
                <span>Add</span>
              </Link>
              <Link to="/history" className={styles.navItem}>
                <AiOutlineHistory />
                <span>History</span>
              </Link>
              <Link to="/settings" className={styles.navItem}>
                <AiOutlineSetting />
                <span>Settings</span>
              </Link>
            </nav>
            <PWAPrompt />
          </div>
        </BrowserRouter>
      </FoodProvider>
    </ThemeProvider>
  );
}

export default App;
