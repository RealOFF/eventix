# Event Router

The `EventRouter` is the core class responsible for routing events in your application.

---

## 📦 Basic Usage

```ts
import { EventRouter } from '@eventix/core';

const router = new EventRouter()
  .on('message', (ctx) => {
    console.log(`Received: ${ctx.payload.text}`);
  });
```

---

## ⚙️ Router Options

### 🔹 Prefix

Add a prefix to all events handled by this router:

```ts
const chatRouter = new EventRouter({ prefix: 'chat:' });
```

### 🔹 One-time Events

Register a handler that runs only once:

```ts
router.on('connect', handler, { once: true });
```
