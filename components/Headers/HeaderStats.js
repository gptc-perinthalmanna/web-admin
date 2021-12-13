import React from "react";
import Image from "next/image";

export default function HeaderStats() {
  return (
    <>
      {/* Header */}
      <div className="relative pt-8 pb-6 bg-blueGray-800 md:pt-2">
        <div className="flex items-center justify-center w-full px-4 md:px-10">
          <Image
            src={"/logo.png"}
            alt="logo"
            width={100}
            height={100}
            className="filter grayscale invert"
          />
          <div className="ml-3 text-gray-100">
            <p className="font-bold text-7xl">GPTC Admin</p>
            <p className="ml-2 text-xl">
              <span className="text-green-400">https://</span>
              <span className="font-bold text-teal-400">web-admin</span>
              .gptcperinthalmanna.in
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
