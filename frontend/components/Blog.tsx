'use client'
import { useRef, useState } from "react";
export default function Blog({
  title,
  content,
  name,
}: {
  title: string;
  content: string;
  name: string;
}) {
  const myRef = useRef<SVGSVGElement>(null);
  return (
    <div className="px-">
      <div className=" border-b border-b-slate-200 pb-9 ">
        <div className="flex flex-row p-2">
          <div className=" flex items-center">
            <div className="relative inline-flex items-center justify-center w-8 h-8 overflow-hidden  rounded-full bg-gray-600 ">
              <span className="font-medium text-gray-300">
                {name.slice(0, 2).toUpperCase()}
              </span>
            </div>
            <p className="ml-1 text-slate-400 text-xl">&middot;</p>
            <div className=" ml-1 text-lg">
              {name[0].toUpperCase() + name.slice(1)}
            </div>
            <div className="ml-3 text-md text-slate-500 font-thin">
              23 Aug 2024
            </div>
          </div>
        </div>
        <div className="pl-3 mt-1 subpixel-antialiased font-bold text-pretty text-black text-4xl">
          {title}
        </div>
        <div className="pl-3 mt-1 font-serif text-pretty text-slate-700 text-lg">
          {content}
        </div>
        <div className="flex justify-between items-center mt-5 pl-3">
          <div className=" inline-flex justify-center w-28 h-6 bottom-1 shadow-sm border-slate-500 text-slate-600 font-thin rounded-full bg-slate-200">
            {Math.ceil(content.length / 100)} mins
          </div>
          <div className="flex items-center">
            <button
              onClick={() => {
                if (myRef.current) {
                  myRef.current.setAttribute("fill", "	#c0c0c0");
                }
              }}
              className="text-3xl  text-slate-400 mr-2">
              <svg
                ref={myRef}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
                />
              </svg>
            </button>
            <button className="text-3xl text-slate-400 mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6 ">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
