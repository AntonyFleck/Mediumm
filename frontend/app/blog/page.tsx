"use client";
import Blog from "@/components/Blog";
import { Toolbar } from "@/subcomponents/Appbar";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

interface bluktype {
  id: string;
  title: string;
  content: string;
  published: Boolean;
  authorId: string;
  name: string;
}

export default function Home() {
  const [blogs, setBlogs] = useState([]);
  const [login, setLogin] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      setLogin(false);
      router.push("/signup");
      return;
    } else {
      setLogin(true);
    }
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/blog/bulk`, {
      headers: {
        token: `Bearer ${localStorage.getItem("token")}`,
        mode: "cors",
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((response) => {
      response.json().then((status) => {
        if (status.success) {
          setBlogs(status.data);
        }
      });
    });
  }, [router]);

  return (
    <div>
      {login ? (
        <div>
          <Toolbar />
          {blogs.map((e: bluktype) => (
            <Blog
              title={e.title}
              content={e.content}
              name={e.name}
              key={e.id}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
