import { EventRouter } from "@eventix/core";
import { fromZod } from "@eventix/validation";
import { z } from "zod";

const chatSchema = z.object({
  message: z.string(),
  userId: z.string(),
});

const chatRouter = new EventRouter({ prefix: "chat:" }).on(
  "message",
  (ctx) => {
    console.log(`[${ctx.payload.userId}]: ${ctx.payload.message}`);

    // Reply to the sender
    ctx.reply({
      type: "message",
      payload: { message: "Message received!", userId: "system" },
    });
  },
  {
    schema: fromZod(chatSchema),
  },
);

// Valid message
chatRouter.handleMessage({
  type: "chat:message",
  payload: {
    message: "Hello!",
    userId: "user1",
  },
});

// Invalid message - will show validation error
chatRouter.handleMessage({
  type: "chat:message",
  payload: {
    message: 123, // wrong type
    userId: "user1",
  },
});
