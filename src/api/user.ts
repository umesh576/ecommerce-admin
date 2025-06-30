/* eslint-disable @typescript-eslint/no-explicit-any */

// import api from "@/axios/api.axios";
// import { UserApiResponse, UserFilters } from "@/interface/auth/user.interface";
import api from "@/axios/api.axios";
import { UserApiResponse, UserFilters } from "@/interface/auth/user.interface";
import axios from "axios";

export const getAllUsers = async (
  filters?: UserFilters
): Promise<UserApiResponse> => {
  try {
    const response = await api.get<UserApiResponse>("/user", {
      params: filters,
    });
    return response.data;
  } catch (error: any) {
    throw error?.response?.data || { message: "Something went wrong" };
  }
};

export const getAdmin = async (
  filters: UserFilters
): Promise<UserApiResponse> => {
  const res = await axios.get("/users", {
    params: {
      ...filters,
      role: "admin",
    },
  });
  return res.data;
};
