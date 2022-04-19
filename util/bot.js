import TelegramBot from "node-telegram-bot-api";
import { cfg } from "../config/index.js";

export const bot = new TelegramBot(cfg.BOT.TOKEN);
