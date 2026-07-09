import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status"
import { catchAsync } from "../../utils/catchAsync";
import { paymentService } from "./payments.service";
import { stripe } from "../../config/stripe";
import { PaymentStatus, Rental_Status } from "../../../prisma/generated/prisma/enums";
import { prisma } from "../../lib/prisma";
import Stripe from "stripe";


const createCheckoutSession = catchAsync(async (req, res) => {
  const rentalOrderId = req.params.rentalOrderId as string;
  const result = await paymentService.createCheckoutSession(rentalOrderId,
  );

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'Checkout Session Created',
    data: result,
  });
});




const getSinglePayment = catchAsync(async (req, res) => {

const id=req.params.id as string
  const result = await paymentService.getSinglePayment(id);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Payment Retrieved',
    data: result,
  });
});

const getMyPayments = catchAsync(async (req, res) => {
  const id = req.user?.authorId as string
  const result = await paymentService.getMyPayments(id);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Payments Retrieved',
    data: result,
  });
});

const webhook = catchAsync(async (req, res) => {
  const signature = req.headers['stripe-signature'] as string;

  const event = stripe.webhooks.constructEvent(
    req.body,
    signature,
    process.env.STRIPE_WEBHOOK_SECRET as string,
  );

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    await paymentService.handleCheckoutSuccess(session);
  }

  res.status(200).json({
    received: true,
  });
});
export const paymentController = {
  getSinglePayment,
  getMyPayments,
  createCheckoutSession,webhook
};
