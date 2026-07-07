import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import httpStatus from "http-status"
import { authService } from './auth.service';
import { verfiyToken } from '../../utils/jwrUtils';
import constants from '../../config';
import AppError from '../../utils/appError';
import { ref } from 'node:process';
const registerUser = catchAsync(async (req, res, next) => {


  const payload = req?.body;
  const user = await authService.registerUserInDB(payload)


  sendResponse(res, {
    success: true,
    statusCode:httpStatus.CREATED,
    message: "User Created Successfully",
    data: user
  })
});

const loginUser = catchAsync(async (req, res, next) => {
  const payload = req.body
  
  const {accessToken,refreshToken} = await authService.loginUser(payload)

  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: false,
    sameSite: 'none',
    maxAge: 1000 * 60 * 60 * 24,
  });
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: false,
    sameSite: 'none',
    maxAge: 1000 * 60 * 60 * 24 * 7,
  });
  
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User Loginned Successfully',
    data: {
accessToken,refreshToken    },
  });
});


export const authController = {
  registerUser,loginUser
}
