import zod from "zod"
// tsc -b // to compile the code and generate .js
//npm login
//npm publish --access public
export const signup=zod.object({
    email:zod.string().email(),
    name:zod.string().optional(),
    password:zod.string().min(7)
})

export type Signup=zod.infer<typeof signup>

export const signin=zod.object({
    email:zod.string().email(),
    password:zod.string().min(7)
})

export type Signin=zod.infer<typeof signin>

export const createbloginput=zod.object({
    title:zod.string(),
    content:zod.string(),
    published: zod.boolean().optional(),
})

export type Createbloginput=zod.infer<typeof createbloginput>

export const updateblog=zod.object({
    title:zod.string(),
    content:zod.string(),
    id:zod.string()
})

export type UpdateBlog=zod.infer<typeof updateblog>