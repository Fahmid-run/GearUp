import { role } from "../../../prisma/generated/prisma/enums";

export interface IRegisterPaylaod {
  name: string;
  email: string;
  password: string;
  phone:string;
  address:string;
  role: role;
}

export interface ILoginPaylaod{
  email: string;
  password: string;
}