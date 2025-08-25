import "better-auth/types";
import type { Role } from "@prisma/client";

declare module "better-auth/types" {
  interface User {
    role: Role;
  }
}