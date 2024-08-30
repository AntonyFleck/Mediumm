"use client";
import Signin from "@/components/Signin";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
    const [login, setLogin] = useState(false);

    const router = useRouter();

    useEffect(() => {
      if (localStorage.getItem("token")) {
        setLogin(false);
        router.push("/create");
      } else {
        setLogin(true);
      }
    }, [router]);
  return (
    <div className="h-screen ">
      {login? <Signin /> :null}
    </div>
  );
}
