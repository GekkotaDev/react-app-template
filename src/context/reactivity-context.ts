import type { Context } from "react";
import { createContext, use } from "react";

type ReactivityContext = {};

export const ReactivityContext = createContext<ReactivityContext>({
  stack: [],
});

export const useReactivityContext = (context: Context<ReactivityContext>) => {
  const reactivityContext = use(context);

  return [reactivityContext, {}] as const;
};
