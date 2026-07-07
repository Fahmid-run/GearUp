import AppError from "../utils/appError";
import { catchAsync } from "../utils/catchAsync";
import httpStatus from 'http-status';
import { verfiyToken } from "../utils/jwrUtils";
import constants from "../config";
import { JwtPayload } from "jsonwebtoken";
import { prisma } from "../lib/prisma";



declare global {
  namespace Express {
    interface Request {
      user?: {
        name: string;
        email: string;
        id: string;
        role: 'role';
      };
    }
  }
}



const auth = (...requiredRoles: any[])=> {
  return catchAsync(async (req, res, next) => {


    const token = req.cookies.accessToken?req.cookies.accessToken: req.headers.authorization?.startsWith('Bearer') ? req.headers.authorization?.split(' ')[1] : req.headers.authorization

    if (!token) {
      throw new AppError(
        'You r not logged in. Please login to Acess this resource',httpStatus.NOT_FOUND
      );
    }
    

    const verifyTOken= verfiyToken(token, constants.JWT_ACCESS_SECRET)


       if (!verifyTOken.success) {
         throw new AppError("Failed", httpStatus.NOT_FOUND);
       }
    
    const { email, name, id, role } = verifyTOken.payload as JwtPayload;

    if (requiredRoles.length && !requiredRoles.includes(role)) {
      throw new AppError("Forbidden access ", httpStatus.FORBIDDEN)
    }


    const user = await prisma.user.findUnique({
      where: {
        id,
        name,
        email,
        role,
      },
    });

    if (!user) {
      throw new AppError('User Not Found',404);
    }

    req.user = {
      name,
      email,
      id,
      role,
    };


    next()

  });
  
}