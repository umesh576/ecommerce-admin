/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IProduct {
  _id: string;
  name: string;
  coverImage: string;
  images?: string[];
  averageRating?: number;
  createdBy?: any;
  price: string;
  description?: string;
}

export interface IProductInput {
  name: string;
  description?: string;
  category: string;
  price: number;
  coverImage: File[];
  images: File[];
}
