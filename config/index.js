import dotenv from "dotenv";
dotenv.config();

export const cfg = {
  PORT: process.env.PORT || 3000,
  BOT: {
    ADMIN: process.env.BOT_ADMIN,
    TOKEN: process.env.BOT_TOKEN,
  },
};
