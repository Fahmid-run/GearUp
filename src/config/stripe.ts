import Stripe from 'stripe';
import constants from '.';

export const stripe = new Stripe(constants.STRIPE_SECRET_KEY as string);
