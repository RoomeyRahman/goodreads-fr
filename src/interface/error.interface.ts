export interface IError {
    data: string;
    message: string;
    status: "ERROR" | "SUCCESS";
    statusCode: number;
  }