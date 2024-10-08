// /utils/ApiError.ts

class ApiError extends Error {
    public statusCode: number;
  
    constructor(message: string, statusCode: number) {
      super(message);
      this.statusCode = statusCode;
      this.name = 'ApiError';
    }
  }
  
  export default ApiError;
  