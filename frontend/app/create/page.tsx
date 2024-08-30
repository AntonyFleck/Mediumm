'use client'
import Create from "@/components/Create";
import { Toolbar } from "@/subcomponents/Appbar";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Home() {
  const [login, setLogin] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      setLogin(false);
      router.push("/signup");
    } else {
      setLogin(true);
    }
  }, [router]);
  return (
    <div>
      {login ? (
        <div className="flex flex-col h-screen">
          <Toolbar />
          <Create />
        </div>
      ) : null}
    </div>
  );
}
