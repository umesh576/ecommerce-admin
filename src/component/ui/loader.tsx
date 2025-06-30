"use client";

import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-64">
      <div className="flex flex-col items-center space-y-2">
        <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-600 text-sm">Loading, please wait...</p>
      </div>
    </div>
  );
};

export default Loader;
