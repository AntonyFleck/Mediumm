"use client";
import React from "react";

export default function Button({
  type,
  sendreq,
}: {
  type: "signup" | "signin";
  sendreq: () => void;
}) {
  return (
    <button
      type="button"
      onClick={sendreq}
      className=" w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-2 me-2 mb-2">
      {type == "signup" ? "signup" : "signin"}
    </button>
  );
}
