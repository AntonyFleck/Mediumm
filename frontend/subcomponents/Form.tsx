import React, { useState } from "react";
import { Signup } from "@antonyfleck/medium-blog-zod-common";
import { Label } from "./Auth";
import Button from "./Button";

export default function Form({
  type,
  sigupInputs,
  setSignupInputs,
}: {
  type: "signup" | "signin";
  sigupInputs: any;
  setSignupInputs: any;
}) {
  const sendreq = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/user/signup`,
        {
          headers: {
            mode: "cors",
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(sigupInputs),
        }
      );
      const jwt = await response.json();
      localStorage.setItem("token", jwt);
    } catch (e) {
      console.log(e);
      alert("something went wrong");
    }
  };

  return (
    <div className="flex flex-col flex-shrink justify-center h-full pb-24">
      <div className=" text-black font-bold text-3xl px-8 text-center">
        {type === "signup" ? "Create an Account" : "Login into your Account"}
      </div>
      <div className=" text-slate-500 font-sans text-md px-10 text-center py-1">
        {type === "signup"
          ? "Already have an account?"
          : "Don't have an account?"}
        <a
          className=" underline pl-1 text-md"
          href={
            type === "signup"
              ? "http://localhost:3000/signin"
              : "http://localhost:3000/signup"
          }>
          Link
        </a>
      </div>
      <div className="pt-1">
        <Label
          label="Username"
          placeholder="Enter your username"
          type="text"
          onChange={(e) =>
            setSignupInputs((c: any) => ({ ...c, name: e.target.value }))
          }></Label>
        <Label
          label="Email"
          placeholder="Jhonathan@gmail.com"
          type="text"
          onChange={(e) =>
            setSignupInputs((c: any) => ({ ...c, email: e.target.value }))
          }></Label>
        <Label
          label="Password"
          placeholder="**********"
          type="password"
          onChange={(e) =>
            setSignupInputs((c: any) => ({ ...c, password: e.target.value }))
          }></Label>
      </div>
      <Button type={type} sendreq={sendreq} />
    </div>
  );
}
