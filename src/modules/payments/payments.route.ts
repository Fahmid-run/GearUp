import { Router } from 'express';
import { role } from '../../../prisma/generated/prisma/enums';
import { auth } from '../../middlewares/auth.middleware';
import { paymentController } from './payments.controller';

const router = Router();

router.post(
  '/checkout-session/:rentalOrderId',
  auth(role.Customer),
  paymentController.createCheckoutSession,
);

router.post('/webhook', paymentController.webhook);

router.get('/', auth(role.Customer), paymentController.getMyPayments);

router.get('/:id', auth(role.Customer), paymentController.getSinglePayment);

export const paymentRoute = router;
