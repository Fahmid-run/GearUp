import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { adminServices } from "./admin.service";

import httpstatus from "http-status"

const getAllUser = catchAsync(async (req, res, next) => {
  const result = await adminServices.getAllUserFromDb()

  sendResponse(res, {
    success: true,
    statusCode: httpstatus.OK,
    message: "User Retrieved Successfully",
    data:result

  })

})


const getAllRentalOrder = catchAsync(async (req, res, next) => {

  const result = await adminServices.getAllRentalOrderFromDb();

  sendResponse(res, {
    success: true,
    statusCode: httpstatus.OK,
    message: 'Rental Orders Retrieved Successfully',
    data: result,
  });
});

const getAllGear = catchAsync(async (req, res, next) => {

  const result = await adminServices.getAllGearFromDb();

  sendResponse(res, {
    success: true,
    statusCode: httpstatus.OK,
    message: 'Gear Retrieved Successfully',
    data: result,
  });
});




const userAccountStatus = catchAsync(async (req, res, next) => {
  const { status } = req.body;
  const id= req.params.id as string

  const result = await adminServices.userAccountStatus(id, status);


  sendResponse(res, {
    success: true,
    statusCode: httpstatus.OK,
    message: 'User Status Updated Successfully',
    data: result,
  });
});

export const adminController = {
  
  getAllGear,getAllRentalOrder,getAllUser, userAccountStatus
}