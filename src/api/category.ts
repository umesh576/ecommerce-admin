/* eslint-disable @typescript-eslint/no-explicit-any */

import api from "@/axios/api.axios";
import { ICategoryInput } from "@/interface/auth/category.interface";

export const getAllCategories = async () => {
  try {
    const response = await api.get("/category");
    return response?.data;
  } catch (error: any) {
    throw error?.response?.data;
  }
};

export const deleteCategory = async (id: string) => {
  try {
    const response = await api.delete(`/category/${id}`);
    return response?.data;
  } catch (error: any) {
    throw error?.response?.data;
  }
};

export const createCategory = async (data: ICategoryInput) => {
  try {
    const response = await api.post(`/category`, data);
    return response?.data;
  } catch (error: any) {
    throw error?.response?.data;
  }
};
