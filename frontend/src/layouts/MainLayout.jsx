import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

function MainLayout() {
  return (
    <div className="relative min-h-screen pb-16">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-hero-grid bg-[size:40px_40px] opacity-20 [mask-image:linear-gradient(180deg,rgba(0,0,0,1),transparent)]" />
      <Navbar />
      <Outlet />
    </div>
  );
}

export default MainLayout;
