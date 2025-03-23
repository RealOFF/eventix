import { describe, it, expect, vi } from "vitest";
import { EventRouter } from "../src/router";
import { Validator } from "../src";

describe("EventRouter", () => {
  it("should handle basic event routing", () => {
    const handler = vi.fn();
    const router = new EventRouter().on("test", handler);

    router.handleMessage({ type: "test", payload: { data: "hello" } });

    expect(handler).toHaveBeenCalledWith({
      type: "test",
      payload: { data: "hello" },
    });
  });

  it("should handle prefixed routes", () => {
    const handler = vi.fn();
    const router = new EventRouter({ prefix: "prefix." }).on("test", handler);

    router.on("test", handler);
    router.handleMessage({ type: "prefix.test", payload: { data: "hello" } });

    expect(handler).toHaveBeenCalledWith({
      type: "prefix.test",
      payload: { data: "hello" },
    });
  });

  it("should validate payload with schema", () => {
    const schema: Validator<{}> = {
      validate: (data: unknown) => {
        if (
          typeof data === "object" &&
          data !== null &&
          "data" in data &&
          typeof (data as any).data === "string"
        ) {
          return { success: true, data };
        }
        return { success: false, error: "Invalid data" };
      },
    };
    const handler = vi.fn();
    const router = new EventRouter().on("test", handler, { schema });

    // Valid payload
    router.handleMessage({ type: "test", payload: { data: "valid" } });
    expect(handler).toHaveBeenCalledWith({
      type: "test",
      payload: { data: "valid" },
    });

    // Invalid payload
    const consoleSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
    router.handleMessage({ type: "test", payload: { data: 123 } });
    expect(handler).not.toHaveBeenCalledWith({
      type: "test",
      payload: { data: 123 },
    });
    expect(consoleSpy).toHaveBeenCalled();
  });

  it("should handle once option", () => {
    const handler = vi.fn();
    const router = new EventRouter().on("test", handler, { once: true });

    // First call
    router.handleMessage({ type: "test", payload: { data: "first" } });
    expect(handler).toHaveBeenCalledTimes(1);

    // Second call should not trigger handler
    router.handleMessage({ type: "test", payload: { data: "second" } });
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it("should combine routers using use()", () => {
    const handler1 = vi.fn();
    const handler2 = vi.fn();
    const router2 = new EventRouter().on("test2", handler2);
    const router1 = new EventRouter().on("test1", handler1).use(router2);

    router1.handleMessage({ type: "test1", payload: {} });
    router1.handleMessage({ type: "test2", payload: {} });

    expect(handler1).toHaveBeenCalled();
    expect(handler2).toHaveBeenCalled();
  });

  it("should handle multiple handlers for same event", () => {
    const handler1 = vi.fn();
    const handler2 = vi.fn();
    const router = new EventRouter().on("test", handler1).on("test", handler2);

    router.handleMessage({ type: "test", payload: {} });

    expect(handler1).toHaveBeenCalled();
    expect(handler2).toHaveBeenCalled();
  });
});
