import { KeyboardEvent } from "react";

export const enterKeyDown = (handler: () => void) => (e: KeyboardEvent) => {
  const { key } = e;
  if (key.endsWith("Enter")) {
    handler();
  }
};
