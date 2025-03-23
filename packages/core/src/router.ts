import type {
  EventMap,
  RouteOptions,
  ExtendedContext,
  EventInput,
} from "./types";

export class EventRouter<
  Events extends EventMap = {},
  Prefix extends string = "",
> {
  private routes = new Map<
    string,
    {
      handler: (ctx: any) => any;
      options?: RouteOptions<any>;
    }[]
  >();

  private prefix: string;

  constructor(options?: { prefix?: Prefix }) {
    this.prefix = options?.prefix ?? "";
  }

  private addPrefix<T extends string>(type: T): `${Prefix}${T}` {
    return (this.prefix + type) as `${Prefix}${T}`;
  }

  on<K extends string, P>(
    type: K,
    handler: (ctx: any) => any,
    options?: RouteOptions<P>,
  ): EventRouter<Events & Record<`${Prefix}${K}`, P>, Prefix> {
    const fullType = this.addPrefix(type);
    const existing = this.routes.get(fullType) || [];
    existing.push({ handler, options });
    this.routes.set(fullType, existing);
    return this as any;
  }

  handleMessage(event: EventInput<Events>) {
    const handlers = this.routes.get(event.type as string);
    if (!handlers) return;

    const remaining: typeof handlers = [];

    for (const route of handlers) {
      const { handler, options } = route;

      const handle = (payload: any) => {
        const ctx = {
          type: event.type,
          payload,
        };
        handler(ctx);
      };

      if (options?.schema) {
        const result = options.schema.validate(event.payload);
        if (!result.success) {
          console.warn(
            `Validation failed for event "${event.type.toString()}"`,
            result.error,
          );
          continue;
        }
        handle(result.data);
      } else {
        handle(event.payload);
      }

      if (!options?.once) remaining.push(route);
    }

    if (remaining.length) {
      this.routes.set(event.type as string, remaining);
    } else {
      this.routes.delete(event.type as string);
    }
  }

  use<OtherEvents extends EventMap>(
    other: EventRouter<OtherEvents, any>,
  ): EventRouter<Events & OtherEvents, Prefix> {
    for (const [type, routes] of other.routes.entries()) {
      const existing = this.routes.get(type) || [];
      this.routes.set(type, [...existing, ...routes]);
    }
    return this as any;
  }

  outgoingEvents<Outgoing extends EventMap>() {
    type RouterWithOutgoing = EventRouterWithOutgoing<Events, Prefix, Outgoing>;
    return this as unknown as RouterWithOutgoing;
  }
}

export type EventRouterWithOutgoing<
  Events extends EventMap,
  Prefix extends string,
  Outgoing extends EventMap,
> = Omit<EventRouter<Events, Prefix>, "on"> & {
  on<K extends string, P>(
    type: K,
    handler: (
      ctx: ExtendedContext<
        `${Prefix}${K}`,
        Events & Record<`${Prefix}${K}`, P>,
        Outgoing
      >,
    ) => any,
    options?: RouteOptions<P>,
  ): EventRouterWithOutgoing<
    Events & Record<`${Prefix}${K}`, P>,
    Prefix,
    Outgoing
  >;
};
