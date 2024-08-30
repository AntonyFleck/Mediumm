import { Hono } from "hono";
import { Prisma, PrismaClient } from "@prisma/client/edge";
import { env } from "hono/adapter";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";
import {
  createbloginput,
  updateblog,
} from "@antonyfleck/medium-blog-zod-common";

export const blog = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    authorId: any;
    prisma: any;
    name:any
  };
}>();

blog.use("*", async (c, next) => {
  const token = c.req.header("token") || "";
  const jwt = token.split(" ")[1];
  const success = await verify(jwt, c.env.JWT_SECRET);
  if (success.id) {
    c.set("authorId", success.id);
    c.set("name",success.name)
    await next();
  } else {
    c.status(404);
    return c.json({ error: "UnAuthorized Token" });
  }
});

blog.use("*", async (c, next) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  c.set("prisma", prisma);
  await next();
});

blog.post("/blog", async (c) => {
  const prisma = c.get("prisma");
  const body = await c.req.json();
  const { success } = createbloginput.safeParse(body);
  if (!success)
    return c.json({
      error: "wrong inputs while creating the blog",
      success: false,
    });
  try {
    const response = await prisma.post.create({
      data: {
        name:c.get("name"),
        authorId: c.get("authorId"),
        title: body.title,
        content: body.content,
      },
    });
  } catch (e) {
    console.log(e);
    c.status(404);
    c.json({ error: "Some Error in Database call1", success: false });
  }
  return c.json({ id: c.get("authorId"), success: true });
});

blog.put("/update", async (c) => {
  const prisma = c.get("prisma");
  const body = await c.req.json();
  const { success } = updateblog.safeParse(body);
  if (!success)
    return c.json({ error: "wrong inputs while updating the blog" });
  try {
    await prisma.post.update({
      where: {
        id: body.id,
        authorId: c.get("authorId"),
      },
      data: {
        title: body.title,
        content: body.content,
      },
    });
  } catch (e) {
    c.status(404);
    c.json({ Error: "Error while doing the database call2" });
  }
  return c.json({ message: "updated" });
});

//add pagination and return only titles
blog.get("/bulk", async (c) => {
  const prisma = c.get("prisma");
  const data = await prisma.post.findMany({});
  if (data) return c.json({ data,success: true});
  else return c.json({ success: false });
});

blog.get("/:id", async (c) => {
  const id = c.req.param("id");
  console.log(id);
  const prisma = c.get("prisma");
  try {
    const datablog = await prisma.post.findUnique({
      where: {
        id: id,
        authorId: c.get("authorId"),
      },
    });
    return c.json({ datablog });
  } catch (e) {
    c.status(404);
    return c.json({ error: "Something went wrong with th DB call3" });
  }
});

/*
npx wrangler login 
npwx wrangler whoami
npm run deploy
*/
