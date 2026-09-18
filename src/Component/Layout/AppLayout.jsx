import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";
import Footer from "../Footer";
import "./Applayout.css";

export const AppLayout = ({ handleTheme }) => {
  return (
    <div className="app-layout">
      <Navbar handleTheme={handleTheme} />

      <main className="app-main">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};