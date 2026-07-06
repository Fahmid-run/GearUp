import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import httpStatus from "http-status"
const registerUser = catchAsync(async (req, res, next) => {



  sendResponse(res, {
    success: true,
    statusCode:httpStatus.CREATED,
    message: "User Created Successfully",
    data: {
      
    }
  })
});

const loginUser = catchAsync(async (req, res, next) => {
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'User Created Successfully',
    data: {},
  });
});


export const authController = {
  registerUser,loginUser
}
