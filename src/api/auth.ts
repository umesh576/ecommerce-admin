/* eslint-disable @typescript-eslint/no-explicit-any */

import api from "@/axios/api.axios";
import { ILogin } from "@/interface/auth/auth.interface";

export const login = async (data: ILogin) => {
  try {
    const response = await api.post("/user/admin/login", data);
    console.log(response);
    return response.data;
  } catch (error: any) {
    throw error?.response?.data;
  }
};

export const register = async (data: any) => {
  try {
    const response = await api.post("/user", data);
    console.log(response);
    return response.data;
  } catch (error: any) {
    console.log("auth err", error);
    throw error?.response?.data;
  }
};
