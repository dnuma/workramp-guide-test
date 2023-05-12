import { config } from 'dotenv';

config();

export const USER_INFO = {
  EMAIL: process.env.EMAIL,
  PASSWORD: process.env.PASSWORD,
};