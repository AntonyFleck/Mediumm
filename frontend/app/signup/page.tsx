"use client";
import Signup from "@/components/Signup";
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
    <div className="flex flex-col h-screen">{login ? <Signup /> : null}</div>
    // <div className="flex flex-col h-screen"><Signup /></div>
  );
}
