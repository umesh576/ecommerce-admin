import Link from "next/link";
import React from "react";
import { CgProfile } from "react-icons/cg";
import { IoIosLogOut } from "react-icons/io";
import { useAuth } from "@/context/auth.context";

export const Header = () => {
  const { user, logout } = useAuth();

  console.log(user);

  return (
    <div className="bg-gray-600 p-4 flex items-center justify-between">
      {/* Welcome Message */}
      <h2 className="text-white text-xl font-serif">
        Welcome {user?.firstName} {user?.lastName ?? "Admin"} !!
      </h2>

      {/* Profile + Logout Buttons  */}
      <div className="flex items-center gap-8 text-white">
        {/* Profile Icon */}
        <Link
          href="/profile"
          className="flex items-center gap-2 hover:text-gray-300 transition-colors"
        >
          <CgProfile size={28} />
          <span>Profile</span>
        </Link>

        {/* Logout Icon */}
        <button
          onClick={logout}
          className="flex items-center gap-2 hover:text-gray-300 transition-colors"
        >
          <IoIosLogOut size={28} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};
