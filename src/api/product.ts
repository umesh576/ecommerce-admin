/* eslint-disable @typescript-eslint/no-explicit-any */

import api from "@/axios/api.axios";


export const getAllProducts = async() =>{
    try{
        const response = await api.get('/product')
        return response?.data

    }catch(error:any){
        throw error?.response?.data; 
    }
}

export const getAllTendingProduct = async() =>{
    try{
        const response = await api.get('/product')
        return response?.data

    }catch(error:any){
        throw error?.response?.data; 
    }
}

export const getAllSummerSale = async() =>{
    try{
        const response = await api.get('/product')
        return response?.data

    }catch(error:any){
        throw error?.response?.data; 
    }
}

export const getProductById = async(id:string) =>{
    try{
        const response = await api.get(`/product/${id}`)
        return response?.data

    }catch(error:any){
        throw error?.response?.data; 
    }
}

export const updateProductById = async (id: string, data: any, formData?: FormData) => {
    try {

      if (data) {
        await api.patch(`/product/${id}`, data);
      }
      
      if (formData) {
        const response = await api.put(`/product/${id}/images`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        return response?.data;
      }
    } catch (error: any) {
      throw error?.response?.data;
    }
  };
  
export const deleteProductById = async (id: string) => {
    try {
      const response = await api.delete(`/product/${id}`);
      return response?.data;
    } catch (error: any) {
      throw error?.response?.data;
    }
  };

  
export const createProduct = async(data:any) =>{
  try{
      const response = await api.post(`/product`,data)
      return response?.data

  }catch(error:any){
      throw error?.response?.data; 
  }
}