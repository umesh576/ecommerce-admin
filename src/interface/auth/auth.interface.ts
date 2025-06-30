export interface ILogin {
  email: string;
  password: string;
}

export interface IRegister {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  gender?: {
    label?: string;
    value?: string;
  };
  confirm_password: string;
}
