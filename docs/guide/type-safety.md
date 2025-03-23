# 🧠 Type Safety

Eventix offers full type safety for your event handlers.

## 🔸 Event Types

```ts
import { z } from 'zod';
import { fromZod } from '@eventix/validation/zod';

const messageSchema = z.object({
  userId: z.string(),
})

const router = new EventRouter()
  .outgoingEvents<Events>()
  .on('user:login', (ctx) => {
    // ctx.payload is typed as { userId: string }
  }, { schema: fromZod(messageSchema) });
```

## 🔸 Type Inference

The router automatically infers types from validation schemas (TypeBox or Zod).
