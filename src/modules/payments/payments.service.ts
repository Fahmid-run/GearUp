import Stripe from 'stripe';
import {
  PaymentProvider,
  PaymentStatus,
  Rental_Status,
} from '../../../prisma/generated/prisma/enums';
import { stripe } from '../../config/stripe';
import { prisma } from '../../lib/prisma';
import AppError from '../../utils/appError';

const getMyPayments = async (customerId: string) => {
  return prisma.payment.findMany({
    where: {
      rentalOrder: {
        customerId,
      },
    },

    include: {
      rentalOrder: true,
    },
  });
};

const createCheckoutSession = async (rentalOrderId: string) => {
  const rental = await prisma.rentalOrder.findUniqueOrThrow({
    where: {
      id: rentalOrderId,
    },
  });

  if (rental.rentalStatus !== Rental_Status.CONFIRMED) {
    throw new AppError('Rental is not confirmed', 400);
  }

  const existingPayment = await prisma.payment.findUnique({
    where: {
      rentalOrderId,
    },
  });

  if (existingPayment) {
    throw new AppError('Payment already initiated', 400);
  }

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: [
  {
    price_data: {
      currency: "usd",
      product_data: {
        name: "Gear Rental",
      },
      unit_amount: Math.round(rental.totalAmount * 100),
    },
    quantity: 1,
  },
],
    metadata: {
      rentalOrderId,
    },

    success_url: `${process.env.CLIENT_URL}/payment-success`,

    cancel_url: `${process.env.CLIENT_URL}/payment-cancel`,
  });

  const payment = await prisma.payment.create({
    data: {
      rentalOrderId,
      amount: rental.totalAmount,
      currency: 'usd',
      provider: PaymentProvider.STRIPE,
      status: PaymentStatus.PENDING,
    },
  });

  return {
    payment,
    checkoutUrl: session.url,
  };
};

const getSinglePayment = async (id: string) => {
  return prisma.payment.findUniqueOrThrow({
    where: {
      id,
    },

    include: {
      rentalOrder: true,
    },
  });
};

const handleCheckoutSuccess = async (session: Stripe.Checkout.Session) => {
  const rentalOrderId = session.metadata?.rentalOrderId;

  if (!rentalOrderId) {
    throw new AppError('Rental Order ID missing', 400);
  }

  const payment = await prisma.payment.findUnique({
    where: {
      rentalOrderId,
    },
  });

  if (!payment) {
    throw new AppError('Payment not found', 404);
  }

  if (payment.status === PaymentStatus.SUCCESS) {
    return payment;
  }

  const result = await prisma.$transaction(async tx => {
    const updatedPayment = await tx.payment.update({
      where: {
        id: payment.id,
      },

      data: {
        status: PaymentStatus.SUCCESS,

        transactionId: session.id,

        paidAt: new Date(),
      },
    });

    await tx.rentalOrder.update({
      where: {
        id: rentalOrderId,
      },

      data: {
        rentalStatus: Rental_Status.PAID,
      },
    });

    return updatedPayment;
  });

  return result;
};

export const paymentService = {
  createCheckoutSession,
  getMyPayments,
  getSinglePayment,
  handleCheckoutSuccess,
};
