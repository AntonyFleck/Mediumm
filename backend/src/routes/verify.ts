import { sign, verify } from "hono/jwt";
import { Hono } from "hono";
export const check = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    token: String;
  };
}>();

check.get("/check", async (c) => {
  const token = c.req.header("token") || "";
  const success = await verify(token, c.env.JWT_SECRET);
  if (success) return c.json({ check: true });
  else return c.json({ check: false });
});
