import { Composer } from "grammy";

// SCAFFOLD — generated from the bot blueprint BEFORE the agent runs.
// Keep a LIVE registration (.command / .callbackQuery / …) so this feature is
// never an empty stub. Replace the reply body with real logic + copy; if you
// change the user-facing text, update tests/specs to match EXACTLY.
// Do NOT rewrite src/bot.ts — buildBot() already auto-loads this module.
// Menu: wire this into /start via registerMainMenuItem({ label: "Open in Telegram", data: "telegram_open" }) if the toolkit exposes it.

const composer = new Composer();

composer.callbackQuery("telegram_open", async (ctx) => {
  await ctx.answerCallbackQuery();
  await ctx.reply("Convert web landing page view to Telegram message delivery");
});

export default composer;
