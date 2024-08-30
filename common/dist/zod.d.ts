import zod from "zod";
export declare const signup: zod.ZodObject<{
    email: zod.ZodString;
    name: zod.ZodOptional<zod.ZodString>;
    password: zod.ZodString;
}, "strip", zod.ZodTypeAny, {
    email: string;
    password: string;
    name?: string | undefined;
}, {
    email: string;
    password: string;
    name?: string | undefined;
}>;
export type Signup = zod.infer<typeof signup>;
export declare const signin: zod.ZodObject<{
    email: zod.ZodString;
    password: zod.ZodString;
}, "strip", zod.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export type Signin = zod.infer<typeof signin>;
export declare const createbloginput: zod.ZodObject<{
    title: zod.ZodString;
    content: zod.ZodString;
    published: zod.ZodOptional<zod.ZodBoolean>;
}, "strip", zod.ZodTypeAny, {
    title: string;
    content: string;
    published?: boolean | undefined;
}, {
    title: string;
    content: string;
    published?: boolean | undefined;
}>;
export type Createbloginput = zod.infer<typeof createbloginput>;
export declare const updateblog: zod.ZodObject<{
    title: zod.ZodString;
    content: zod.ZodString;
    id: zod.ZodString;
}, "strip", zod.ZodTypeAny, {
    title: string;
    content: string;
    id: string;
}, {
    title: string;
    content: string;
    id: string;
}>;
export type UpdateBlog = zod.infer<typeof updateblog>;
