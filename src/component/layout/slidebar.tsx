import Link from "next/link";
import React from "react";
import { LuLayoutDashboard } from "react-icons/lu";
import { TbUsersGroup } from "react-icons/tb";
import { CgMenuBoxed } from "react-icons/cg";
import { FaBoxOpen } from "react-icons/fa6";
import { IoPricetagsOutline } from "react-icons/io5";
import Image from "next/image";
const SideBar = () => {
  return (
    <div className="h-full w-[250px] py-4 px-4 bg-slate-900">
      {/* logo */}
      <div className="">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="Logo"
            width={120}
            height={60}
            className="cursor-pointer"
          />
        </Link>
      </div>
      {/* Navigation link */}
      <Link href="/">
        <div className=" tracking-wider flex items-center gap-2 px-2 mt-20 cursor-pointer text-orange-500 hover:text-orange-400">
          <LuLayoutDashboard />
          <p>Dashboard</p>
        </div>
      </Link>
      <Link href="/categories">
        <div className=" tracking-wider flex items-center gap-2 px-2 mt-10 cursor-pointer text-orange-500 hover:text-orange-400">
          <IoPricetagsOutline />
          <p>Category</p>
        </div>
      </Link>

      <Link href="/products">
        <div className=" tracking-wider flex items-center gap-2 px-2 mt-10 cursor-pointer text-orange-500 hover:text-orange-400">
          <FaBoxOpen />
          <p>Products</p>
        </div>
      </Link>

      <Link href="/orders">
        <div className=" tracking-wider flex items-center gap-2 px-2 mt-10 cursor-pointer text-orange-500 hover:text-orange-400">
          <CgMenuBoxed />
          <p>Orders</p>
        </div>
      </Link>

      <Link href="/users">
        <div className=" tracking-wider flex items-center gap-2 px-2 mt-10 cursor-pointer text-orange-500 hover:text-orange-400">
          <TbUsersGroup />
          <p>Users</p>
        </div>
      </Link>
    </div>
  );
};

export default SideBar;
