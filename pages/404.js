import React from "react";
import Link from "next/link";
function comp404() {
  return (
    <div className="flex   flex-col h-screen w-full bg-gray-400 justify-center items-center text-8xl font-semibold ">
      <div className="pl-8 border border-l-4 border-r-0 border-y-0">
        <p>404</p>
        <p className="text-xl">Page not found</p>
      </div>
      <Link
        href={"/"}
        className="px-4 my-5 text-sm py-1 border border-sky-500 border-2 bg-gray-800 rounded-md"
      >
        Home
      </Link>
    </div>
  );
}

export default comp404;
