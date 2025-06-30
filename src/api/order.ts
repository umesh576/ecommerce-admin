/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "@/axios/api.axios";

export const getAllOrders = async () => {
  try {
    const response = await api.get("/order");
    return response?.data;
  } catch (error: any) {
    throw error?.response?.data;
  }
};
