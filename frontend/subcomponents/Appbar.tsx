"use client";
import React from "react";
import { useRouter, usePathname } from "next/navigation";

export default function Appbar() {
  return (
    <div className=" grid grid-rows-1 h-16 bg-black bg-opacity-[94] text-5xl bottom-0 text-white w-screen">
      <div className="pl-2 pt-4 text-slate-100 font-sans">Medium</div>
    </div>
  );
}

export const Toolbar: React.FC = () => {
  const router = usePathname();
  const router1 = useRouter();

  const usesendreq = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/verify/check`,
        {
          headers: {
            token: `${localStorage.getItem("token")}`,
            mode: "cors",
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      const reply = await response.json();
      if (reply.check) {
        router1.push(router == "/blog" ? "/create" : "/blog");
      }
    } catch (e) {
      alert("wrong token");
      router1.push("/signup");
    }
  };

  const nikal = () => {
    localStorage.removeItem("token");
    router1.push("/signup");
  };

  return (
    <div className="  flex flex-row h-16 bg-slate-950 bg-opacity-[94] justify-between bottom-0 text-white w-screen">
      <div className="pl-2 pt-4 text-slate-100 font-sans text-5xl ">Medium</div>
      <div>
        <button onClick={nikal} className="bg-black text-md mt-7 mr-5">
          Signout
        </button>
        <button onClick={usesendreq} className="bg-black text-md mt-7 mr-5">
          {router == "/blog" ? "Create+" : "ReadAll"}
        </button>
      </div>
    </div>
  );
};
