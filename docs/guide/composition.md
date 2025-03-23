# Router Composition

Router composition is a powerful feature in Eventix that allows you to combine multiple routers into a single, unified routing system.

## Basic Composition

```typescript
import { EventRouter } from 'eventix';

const userRouter = new EventRouter()
  .on('user:create', (payload) => { /* ... */ })
  .on('user:update', (payload) => { /* ... */ });

const orderRouter = new EventRouter()
  .on('order:create', (payload) => { /* ... */ })
  .on('order:update', (payload) => { /* ... */ });

// Compose routers
const appRouter = new EventRouter()
  .use(userRouter)
  .use(orderRouter);
```

## Benefits of Router Composition
- Modularity : Break down your event handling logic into smaller, focused routers
- Reusability : Reuse routers across different parts of your application
- Organization : Better organize your event handling code by domain or feature
