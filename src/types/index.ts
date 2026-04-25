export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AppError {
  statusCode: number;
  status: string;
  message: string;
  isOperational: boolean;
}

export interface ResponseBody {
  status: string;
  data?: any;
  message?: string;
  error?: string;
}
