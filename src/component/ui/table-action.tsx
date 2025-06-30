"use client";

import React from "react";
import { IoTrashOutline } from "react-icons/io5";
import { VscEdit } from "react-icons/vsc";
import Link from "next/link";

interface IProps {
  updateLink: string;
  handleDelete: () => void;
}

export const Actions: React.FC<IProps> = ({ updateLink, handleDelete }) => {
  return (
    <div className="flex justify-center gap-2">
      <Link href={updateLink}>
        <VscEdit size={22} className="text-black-500" />
      </Link>
      <div>
        <button
          title="Delete"
          onClick={handleDelete}
          className="w-fit cursor-pointer"
        >
          <IoTrashOutline size={20} className="text-red-500" />
        </button>
      </div>
    </div>
  );
};
