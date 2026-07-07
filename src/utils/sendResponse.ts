import { Response } from "express";
interface IsendResponseData{
  success: boolean;
  statusCode: number;
  message: string;
  data:any
}
export const sendResponse = (res: Response, {
  success, statusCode,message,data
}:IsendResponseData) => {
  
  return res.status(statusCode).json({
    success,statusCode,message,data

  })
}