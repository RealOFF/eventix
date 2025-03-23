# Custom Validators

Eventix allows you to create custom validators to ensure your event payloads match your expected schema.

## Creating a Custom Validator

```typescript
import { EventRouter, Validator } from 'eventix';

// Create a custom validator
const customValidator: Validator<YourPayloadType> = (payload) => {
  if (!isValid(payload)) {
    throw new Error('Invalid payload');
  }
  return payload;
};

// Use the custom validator
const router = new EventRouter()
  .on('event:name', customValidator, (payload) => {
    // Handle the validated payload
  });
```