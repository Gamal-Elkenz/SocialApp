import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

export default function () {
  return (
    <div className="bg-zinc-500">
      <Navbar />
      <div className="w-3/4 mx-auto my-7">
            <Outlet />
      </div>
    </div>
  );
}
