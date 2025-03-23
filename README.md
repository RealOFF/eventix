# Eventix

A lightweight, type-safe event routing library for TypeScript applications with built-in validation support.

[![cov](https://RealOFF.github.io/eventix/badges/coverage.svg)](https://github.com/RealOFF/eventix/actions)

## Features

- 🎯 **Type-safe event routing** - Full TypeScript support with type inference
- 🔍 **Validation support** - Built-in integration with TypeBox and Zod
- 🎨 **Flexible API** - Intuitive builder pattern for configuration
- 🔌 **Modular design** - Use only what you need with separate validation packages
- 🌳 **Tree-shakeable** - Import only the features you use
- 📦 **Zero dependencies** - Core package has no external dependencies

## Installation

```bash
# Using npm
npm install @eventix/core

# Optional validation packages
npm install @eventix/validation @sinclair/typebox
# or
npm install @eventix/validation zod
```

## Quick Start

### Basic Usage

```typescript
import { EventRouter } from '@eventix/core';

const router = new EventRouter()
  .on('message', (ctx) => {
    console.log(`Received message: ${ctx.payload.text}`);
  });

router.handleMessage({
  type: 'message',
  payload: { text: 'Hello, World!' }
});
```

### With Validation (TypeBox)

```typescript
import { EventRouter } from '@eventix/core';
import { fromTypebox } from '@eventix/validation/typebox';
import { Type } from '@sinclair/typebox';

const messageSchema = Type.Object({
  text: Type.String(),
  userId: Type.String(),
  timestamp: Type.Number()
});

const router = new EventRouter()
  .on('message', (ctx) => {
    console.log(`[${ctx.payload.userId}]: ${ctx.payload.text}`);
  }, {
    schema: fromTypebox(messageSchema)
  });
```

### With Validation (Zod)

```typescript
import { EventRouter } from '@eventix/core';
import { fromZod } from '@eventix/validation/zod';
import { z } from 'zod';

const messageSchema = z.object({
  text: z.string(),
  userId: z.string(),
  timestamp: z.number()
});

const router = new EventRouter()
  .on('message', (ctx) => {
    console.log(`[${ctx.payload.userId}]: ${ctx.payload.text}`);
  }, {
    schema: fromZod(messageSchema)
  });
```

## Advanced Features

### Prefixed Routes

```typescript
const chatRouter = new EventRouter({ prefix: 'chat:' })
  .on('message', handler)  // Will handle 'chat:message'
  .on('typing', handler);  // Will handle 'chat:typing'
```

### One-time Events

```typescript
router.on('connect', handler, { once: true });
```

### Router Composition

```typescript
const mainRouter = new EventRouter()
  .use(chatRouter)
  .use(userRouter);
```

### Type-safe Event Definitions

```typescript
interface Events {
  'user:login': { userId: string };
  'user:logout': { userId: string };
}

const router = new EventRouter()
  .outgoingEvents<Events>()
  .on('user:login', (ctx) => {
    // ctx.payload is typed as { userId: string }
  });
```

## Packages

| Package | Description |
|---------|------------|
| `@eventix/core` | Core event routing functionality |
| `@eventix/validation` | Validation adapters for TypeBox and Zod |

## API Reference

### EventRouter

#### Constructor Options
```typescript
new EventRouter({
  prefix?: string;  // Optional prefix for all routes
})
```

#### Methods

- `.on(event, handler, options?)` - Register an event handler
- `.use(router)` - Compose with another router
- `.handleMessage(message)` - Handle an incoming message
- `.outgoingEvents<T>()` - Define outgoing event types

### Validation

#### TypeBox
```typescript
fromTypebox(schema: TSchema): Validator
```

#### Zod
```typescript
fromZod(schema: ZodType): Validator
```

## Examples

Check out the examples folder for more detailed usage:
- [Basic TypeBox Example](examples/core-typebox)
- [Basic Zod Example](examples/core-zod)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT
