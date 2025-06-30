/* eslint-disable @typescript-eslint/no-explicit-any */

import api from "@/axios/api.axios";

export const addToWishList = async(productId:string) =>{
    try{
        const response = await api.post(`/wishlist`,{productId})
        return response?.data

    }catch(error:any){
        throw error?.response?.data; 
    }
}

export const getWishList = async() =>{
    try{
        const response = await api.get(`/wishlist`)
        return response?.data

    }catch(error:any){
        throw error?.response?.data; 
    }
}