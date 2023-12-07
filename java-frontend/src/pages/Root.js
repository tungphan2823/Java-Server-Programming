import Sidebar from "../components/SideBar";

import './Root.css'
import { Outlet } from "react-router-dom";
const RootPage = () => {
  return (
    <div className="container">
      <div className="Sidebar">
        <Sidebar />
      </div>
      <main className="Outlet">
        <Outlet />
      </main>
    </div>
  );
};
export default RootPage;
