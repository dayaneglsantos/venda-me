import Menu from "../components/Menu";
import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Menu />
      <Outlet />
    </div>
  );
};
