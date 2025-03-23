import { Validator } from "./validator";

export type EventMap = Record<string, any>;

export type RouteOptions<P> = {
  once?: boolean;
  schema?: Validator<P>;
};

export interface ExtendedContext<
  T extends keyof Events,
  Events extends EventMap,
  Outgoing extends EventMap,
> {
  type: T;
  payload: Events[T];
  reply: <K extends keyof Outgoing>(e: {
    type: K;
    payload: Outgoing[K];
  }) => void;
  broadcast: <K extends keyof Outgoing>(e: {
    type: K;
    payload: Outgoing[K];
  }) => void;
  send: <K extends keyof Outgoing>(
    id: string | number,
    e: { type: K; payload: Outgoing[K] },
  ) => void;
}

export type EventInput<Events extends EventMap> = {
  [K in keyof Events]: { type: K; payload: Events[K] };
}[keyof Events];
