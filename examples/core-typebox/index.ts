import { EventRouter } from "@eventix/core";
import { fromTypebox } from "@eventix/validation";
import { Type } from "@sinclair/typebox";

const messageSchema = Type.Object({
  message: Type.String(),
  userId: Type.String(),
  timestamp: Type.Number(),
});

const chatRouter = new EventRouter({ prefix: "chat:" })
  .outgoingEvents<{
    notification: { text: string };
  }>()
  .on(
    "message",
    (ctx) => {
      console.log(`[${ctx.payload.userId}]: ${ctx.payload.message}`);

      // Broadcast notification to all users
      ctx.broadcast({
        type: "notification",
        payload: { text: `New message from ${ctx.payload.userId}!` },
      });
    },
    {
      schema: fromTypebox(messageSchema),
    },
  );

// Valid message
chatRouter.handleMessage({
  type: "chat:message",
  payload: {
    message: "Hello!",
    userId: "user1",
    timestamp: Date.now(),
  },
});

// Invalid message - will show validation error
chatRouter.handleMessage({
  type: "chat:message",
  payload: {
    message: "Hello!",
    userId: "user1",
    // missing timestamp field
  },
});
