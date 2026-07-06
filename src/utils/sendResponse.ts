import { Response } from "express";
interface IsendResponseData{
  success: boolean;
  statusCode: number;
  message: string;
  data:any
}
export  const sendResponse = (res:Response, payload:IsendResponseData) => {
  
  return res.status(payload.statusCode).json({
    ...payload

  })
}