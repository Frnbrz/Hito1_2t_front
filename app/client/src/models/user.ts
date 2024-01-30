import { ZodStringCheck } from "zod"
import { Roles } from "."

export interface User {
  id?: number
  name: string
  email: string
  role: Roles
  deletedAt?: ZodStringCheck
}
