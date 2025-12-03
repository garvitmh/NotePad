// src/components/Navbar.jsx

import React from "react";
import { Plus } from "lucide-react";
import ThinkPadLogo from "../assets/ThinkPadLogo.jpg";
import { Link } from "react-router";
export const Navbar = () => {
  return (
    <>
      {/* CHANGE: Added 'backdrop-blur-md' and changed 'bg-base-300' to 'bg-base-300/40' 
        to make the navbar transparent and allow the background effects to show through.
      */}
      <div className="navbar backdrop-blur-md bg-base-300/40">
        <div className="flex-1 justify-stat ml-28">
          <a href="/" className="flex items-center ml-4 sm:ml-10">
            <img
              src={ThinkPadLogo}
              alt="ThinkPad Logo"
              className="inline-block w-8 h-8 mr-2 "
            />
            <span className="  text-3xl  font-extrabold text-primary font-mono tracking-tight">
              ThinkPad
            </span>
          </a>
        </div>
        <div className="flex-none">
          <Link
            to={"/create"}
            className="btn btn-outline btn-primary mr-4 sm:mr-52"
          >
            <Plus className="mr-1" />
            <span>Create Note</span>
          </Link>
        </div>
      </div>
    </>
  );
};