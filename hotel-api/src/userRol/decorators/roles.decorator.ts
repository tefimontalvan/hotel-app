import { SetMetadata } from "@nestjs/common";
import { UserRole } from "src/user/user.interface";

export const hasRoles = (...hasRoles: UserRole[]) => SetMetadata('roles', hasRoles);