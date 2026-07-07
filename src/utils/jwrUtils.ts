import jwt, { JwtPayload, SignOptions } from "jsonwebtoken"
import AppError from "./appError"
import httpStatus from "http-status"

export const createJwt = (
  jwtPayload: JwtPayload,
  jwtSecret: string,
  expiresIn: SignOptions,
) => {
  const token = jwt.sign(jwtPayload, jwtSecret, {
    expiresIn,
  } as SignOptions);

  return token;
};


export const verfiyToken = (token:string, jwtSecret:string) => {


 


   try {
     const verfiyToken = jwt.verify(token, jwtSecret);
     if (!verfiyToken) {
       throw new AppError('Token Not verified', httpStatus.NOT_FOUND);
     }

     return {
       success: true,
       payload: verfiyToken,
     };
   } catch (error: any) {
     return {
       success: false,
       error: error.message,
     };
   }


  
}