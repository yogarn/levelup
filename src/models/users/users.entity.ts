import { Diaries } from "../diaries/diaries.entity";
import { Roles } from "../roles/roles.entity";

export class Users {
    id: string;
    name: string;
    username: string;
    password: string;
    birthDate: Date;
    roleId: number;
    role: Roles;
    diary: Diaries[];
    createdAt: Date;
    updatedAt: Date;
}
