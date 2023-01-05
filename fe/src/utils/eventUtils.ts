import { KeyboardEvent } from "react";

export const enterKeyDown =
  (handler: () => void, shiftedHandler?: () => void) =>
  ({ key, shiftKey }: KeyboardEvent) => {
    if (key.endsWith("Enter")) {
      if (shiftKey && shiftedHandler) {
        shiftedHandler();
      } else {
        handler();
      }
    }
  };
