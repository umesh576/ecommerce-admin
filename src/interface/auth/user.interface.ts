export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  role: string;
  gender?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface UserApiResponse {
  success: boolean;
  status: string;
  data: {
    data: User[];
    pagination: Pagination;
  };
  message: string;
}

export interface UserFilters {
  page?: number;
  limit?: number;
  query?: string;
  role?: string;
  gender?: string; // Optional for future use
}
