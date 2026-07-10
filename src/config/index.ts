import { config } from 'dotenv';
import path from 'node:path';

config({
  path: path.join(process.cwd(), '.env'),
});

const constants = {
  Port: process.env.PORT,
  Base_Url: process.env.APP_URL,
  DB_Url: process.env.DATABASE_URL,

  CLIENT_URL: process.env.CLIENT_URL,
  BCRYPT_SALT_ROUNDS: process.env.BCRYPT_SALT_ROUNDS,
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET!,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET!,
  JWT_ACCESS_EXPIRES_IN: process.env.JWT_ACCESS_EXPIRES_IN!,
  JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN!,
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
  STRIPE_PRODUCT_PRICE_ID: process.env.STRIPE_PRODUCT_PRICE_ID,
};

export default constants;
