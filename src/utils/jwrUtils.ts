import jwt, { JwtPayload, SignOptions } from "jsonwebtoken"
import AppError from "./appError"
import httpStatus from "http-status"

export const createJwt = (jwtSecret:string, jwtPayload:JwtPayload,expiresIn:SignOptions) => {


  const token = jwt.sign(jwtPayload, jwtSecret, {
    expiresIn
  } as SignOptions)

  return token

  
}


export const verfiyToken = (token:string, jwtSecret:string) => {


  const verfiyToken = jwt.verify(token,jwtSecret)
  if (!verfiyToken) {
    throw new AppError("Token Not verified",httpStatus.NOT_FOUND)
  }

  return {
    success: true,
    payload:verfiyToken
  }


  
}