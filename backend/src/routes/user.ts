import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { env } from "hono/adapter";
import { withAccelerate } from "@prisma/extension-accelerate";
import { decode, sign, verify } from "hono/jwt";
import { signin, signup } from "@antonyfleck/medium-blog-zod-common";
export const user = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

user.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const { success } = signup.safeParse(body);

  if (!success) return c.json({ success: false });

  try {
    const user = await prisma.user.create({
      data: {
        email: body.email,
        name: body.name,
        password: body.password,
      },
    });
    console.log(user)
    const token = await sign(
      { id: user.id, name: body.name },
      c.env.JWT_SECRET
    );
    return c.json({ token, success: true });
  } catch (e) {
    c.status(403);
    c.json({ error: "Some problwm while signing Up", success: false });
  }
});

user.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const { success } = signin.safeParse(body);
  console.log(body)
  if (!success)
    return c.json({ error: "wrong inputs while sigingin", success: false });

  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
  });
  console.log(user)
  if (!user) {
    c.status(403);
    return c.json({ error: "User NOT FOUND", success: false });
  }

  const token = await sign({ id: user.id, name: user.name }, c.env.JWT_SECRET);
  return c.json({ token, success: true });
});
