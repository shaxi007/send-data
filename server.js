import express from "express";
import cors from "cors";
import { cfg } from "./config/index.js";
import { bot } from "./util/bot.js";
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(errorHandler);

app.post("/", async (req, res, next) => {
  try {
    if (!req.body.name || !req.body.phone_number || !req.body.message) {
      return res.status(400).json({
        message: "name or phone_number or message is required",
      });
    } else {
      const sendText = `
<b>Name:</b> ${req.body.name}
<b>Phone Number:</b> ${req.body.phone_number}
<b>Message:</b> ${req.body.message}
            `;
      const botInfo = await bot.getMe();
      const chatInfo = await bot.getChatMember(cfg.BOT.ADMIN, botInfo.id);
      if (chatInfo.status !== "member") {
        return new Error("You are not a member of this chat");
      } else {
        await bot.sendMessage(cfg.BOT.ADMIN, sendText, { parse_mode: "HTML" });
        return res.status(200).json({
          message: "success",
        });
      }
    }
  } catch (error) {
    return next(error);
  }
});

function errorHandler(err, req, res, next) {
  return res.status(500).render("error", { error: err });
}

app.listen(cfg.PORT, () => console.log("Server started on port " + cfg.PORT));
