
export interface IRegisterPaylaod {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  role?: "Customer" | "Provider";
}

export interface ILoginPaylaod{
  email: string;
  password: string;
}