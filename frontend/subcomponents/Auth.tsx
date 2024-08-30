"use client";
import { Signin, Signup } from "@antonyfleck/medium-blog-zod-common";
import { useState } from "react";
import Button from "./Button";
import { useRouter } from "next/navigation";

export const Auth = ({ type }: { type: "signin" | "signup" }) => {
  const [sigupInputs, setSignupInputs] = useState<Signup>({
    name:"",
    password: "",
    email: ""
  });
  const router = useRouter();

  const usesendreq = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/user/${type}`,
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
      if (jwt.success) {
        localStorage.setItem("token",`${jwt.token}`);
        router.push("/create");
      } else {
        alert(`Problem while ${type}`);
      }
    } catch (e) {
      console.log(e);
      alert("something went wrong2");
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
        {type == "signup" ? (
          <Label
            label="Username"
            placeholder="Enter your username"
            type="text"
            onChange={(e) =>
              setSignupInputs((c: any) => ({ ...c, name: e.target.value }))
            }></Label>
        ) : null}
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
      <Button type={type} sendreq={usesendreq} />
    </div>
  );
};

interface LabelInputsType {
  label: string;
  placeholder: string;
  type: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export const Label = ({
  label,
  placeholder,
  type,
  onChange,
}: LabelInputsType) => {
  return (
    <>
      <div>
        <div className="pb-1">
          <label className="text-md font-medium  text-gray-900 ">{label}</label>
        </div>
        <div className="pb-1">
          <input
            onChange={onChange}
            type={type}
            id="first_name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 "
            placeholder={placeholder}
            required
          />
        </div>
      </div>
    </>
  );
};
