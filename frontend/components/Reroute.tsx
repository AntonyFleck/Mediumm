'use client'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function Reroute() {
const router=useRouter()
async function check(){
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
            router.push("/create");
          }
}
return(<>{check}</>)
}
