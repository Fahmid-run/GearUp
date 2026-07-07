import { prisma } from '../../lib/prisma';
import AppError from '../../utils/appError';
import { ILoginPaylaod, IRegisterPaylaod } from './auth.interface';
import bcrypt from 'bcrypt';
import constants from '../../config';

import jwt, { JwtPayload, SignOptions } from "jsonwebtoken"
import { createJwt, verfiyToken } from '../../utils/jwrUtils';

const registerUserInDB = async (payload: IRegisterPaylaod) => {
  const { name, email, password, phone, address, role = 'Customer' } = payload;

  const isUserExists = await prisma.user.findUnique({
    where: {
      email
    }
  })

  if (isUserExists) {
    throw new AppError('User already exists', 400);
  }

  const hashedPassword = await bcrypt.hash(
    password,
    Number(constants.BCRYPT_SALT_ROUNDS),
  );
  const result = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      phone,
      address,
      role,
      Customer: role === 'Customer' ? { create: {} } : undefined,
      Provider: role === 'Provider' ? { create: {} } : undefined,
    },
    include: {
      Customer: true,
      Provider: true,
      
    }, omit: {
      password:true
    }
  });

  return result;
};

const getUserFromdDb = () => {};

const loginUser = async ({
  email,password
}: ILoginPaylaod) => {

  const isUserExists = await prisma.user.findUnique({
    where: {
      email
    },
  });

  if (!isUserExists) {
    throw new AppError('User Does not exists', 404);
  }

  const matchPassword=await bcrypt.compare(password,isUserExists.password)

  if (!matchPassword) {
    throw new AppError('Password Does not matched', 404);
    
  }


  const JwtPayload = {
    id: isUserExists.id,
    name: isUserExists.name,
    email: isUserExists.email,
    password: isUserExists.password,
    role:isUserExists.role
  }

  const accessToken = createJwt(
    JwtPayload,
    constants.JWT_ACCESS_SECRET,
    constants.JWT_ACCESS_EXPIRES_IN as SignOptions,
  );

  const refreshToken = createJwt(
    JwtPayload,
    constants.JWT_REFRESH_SECRET,

    constants.JWT_REFRESH_EXPIRES_IN as SignOptions,
  );

  
  return {
    accessToken, refreshToken
  }


  

};



const refreshToken = async (refreshToken: string) => {
  const jwtVerify = verfiyToken(refreshToken, constants.JWT_REFRESH_SECRET);

  if (!jwtVerify.success) {
    throw new AppError('Jwt Verified Failed', 500);
  }

  const { id } = jwtVerify.payload as JwtPayload;

  const user = await prisma.user.findUniqueOrThrow({
    where: {
      id,
    },
  });

  const jwtPayload = {
    id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  const generated_accessToken = createJwt(
    jwtPayload ,
    constants.JWT_ACCESS_SECRET,
    constants.JWT_ACCESS_EXPIRES_IN as SignOptions,
  );

  return { generated_accessToken };
};



export const authService = {
  registerUserInDB,
  getUserFromdDb,
  loginUser,
};
