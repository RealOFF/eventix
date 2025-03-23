# ✅ Validation

Eventix supports payload validation using popular schema libraries.

## 📘 TypeBox Validation

```ts
import { EventRouter } from '@eventix/core';
import { fromTypebox } from '@eventix/validation/typebox';
import { Type } from '@sinclair/typebox';

const messageSchema = Type.Object({
  text: Type.String(),
  userId: Type.String()
});

const router = new EventRouter()
  .on('message', handler, {
    schema: fromTypebox(messageSchema)
  });
```

## 📙 Zod Validation

```ts
import { fromZod } from '@eventix/validation/zod';
import { z } from 'zod';

const messageSchema = z.object({
  text: z.string(),
  userId: z.string()
});

const router = new EventRouter()
 .on('message', handler, {
    schema: fromZod(messageSchema)
  });
```