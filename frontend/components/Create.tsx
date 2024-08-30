"use client";
import { useRouter } from "next/navigation";
import React, { use, useEffect, useState } from "react";

export default function Create() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");


  async function publish() {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/blog/blog`,
      {
        headers: {
          token: `Bearer ${localStorage.getItem("token")}`,
          mode: "cors",
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ title: title, content: content }),
      }
    );

    const status = await response.json();
    if (status.success) {
      setContent("");

      setTitle("");
      alert("blog created succesfully");
    } else {
      alert("failed while creation of blog");
    }
  }

  const changetitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const changecontent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  return (
        <div className="h-full">
          <div className="flex flex-row h-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="0.7"
              stroke="currentColor"
              className="size-10  text-slate-500 pr-0 mt-6 ml-64">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            <input
              value={title}
              onChange={changetitle}
              type="text"
              className="focus:outline-none font-mono text-slate-800 pt-4  placeholder:italic placeholder:font-serif placeholder:text-4xl ml-2 mt-6"
              placeholder="Title"></input>
          </div>
          <textarea
            value={content}
            onChange={changecontent}
            placeholder="Body of the blog"
            autoComplete="on"
            className="mt-9 w-1/2  row-span-9 flex-grow-0 h-1/4 focus:outline-none ml-72 pl-4 resize-none placeholder:text-2xl placeholder:font-mono  placeholder:italic"></textarea>
          <button
            onClick={publish}
            type="button"
            className="text-white bg-[#2557D6] hover:bg-[#2557D6]/90 ml-72 focus:ring-4 focus:ring-[#2557D6]/50 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#2557D6]/50 me-2 mb-2">
            Publish Blog
          </button>
        </div>
  );
}
