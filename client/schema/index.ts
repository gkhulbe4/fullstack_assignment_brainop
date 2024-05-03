import { z } from "zod"
 
export const signupSchema = z.object({
  name: z.string().min(0).max(50).optional(),
  username: z.string().min(1 ,"Username is required").max(50),
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z.string().min(1, "Password is required")
})

export const signinSchema = z.object({
  username: z.string().min(1,"Username is required").max(50),
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z.string().min(1, "Password is required")
})

export const resetPassSchema = z.object({
  oldPass: z.string().min(1, "This field is required"),
  newPass: z.string().min(1, "This field is required")
})