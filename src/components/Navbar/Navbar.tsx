"use client";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";

const Navbar = () => {
  return (
    <div className="overflow-x-hidden">
      <div className="md:block hidden"><DesktopNav/></div>
      <div className="md:hidden"><MobileNav/></div>
    </div>
  );
};

export default Navbar;
