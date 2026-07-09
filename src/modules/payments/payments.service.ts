import { PaymentProvider, PaymentStatus, Rental_Status, role } from "../../../prisma/generated/prisma/enums";
import { stripe } from "../../config/stripe";
import { prisma } from "../../lib/prisma";
import AppError from "../../utils/appError";
import { checkExists } from "../../utils/checkExist";


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
        quantity: 1,

        price_data: {
          currency: 'usd',

          product_data: {
            name: 'Gear Rental',
          },

          unit_amount: Math.round(rental.totalAmount * 100),
        },
      },
    ],

    success_url: `${process.env.CLIENT_URL}/payment-success`,

    cancel_url: `${process.env.CLIENT_URL}/payment-cancel`,
     metadata:{
    rentalOrderId
 },

    payment_intent_data: {
      metadata: {
        rentalOrderId,
      },
    },
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



const handleWebhook = async (event: any) => {
  if (event.type !== 'checkout.session.completed') {
    return;
  }

  const session = event.data.object;

  const rentalOrderId = session.metadata.rentalOrderId;

  const payment = await prisma.payment.findUnique({
    where: {
      rentalOrderId,
    },
  });

  if (!payment) {
    throw new Error('Payment not found');
  }

  await prisma.$transaction(async tx => {
    await tx.payment.update({
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
  });
};

export const paymentService = {
  createCheckoutSession,
  getMyPayments,
  getSinglePayment,
  handleWebhook,
};