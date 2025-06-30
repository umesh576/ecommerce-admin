import Link from "next/link";
import React from "react";

interface IProps {
  title: string;
  link?: string;
  buttonText?: string;
}

const PageHeading: React.FC<IProps> = ({ title, link, buttonText }) => {
  return (
    <div className="tracking-wider flex w-full items-center justify-between px-6 mt-5">
      <p className="font-bold text-2xl">{title}</p>
      {buttonText && (
        <Link href={link ?? "/"}>
          <button className="cursor-pointer rounded-md px-3 py-2 font-bold tracking-wider bg-orange-500 text-white ">
            {buttonText}
          </button>
        </Link>
      )}
    </div>
  );
};

export default PageHeading;
