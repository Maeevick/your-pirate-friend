import { Models } from "@rematch/core";
import { authFactory } from "./auth";
import { AuthAdapter } from "@/ports/auth";

export interface RootModel extends Models<RootModel> {
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  auth: any;
}

export const modelsFactory = (adapter: AuthAdapter): RootModel => {
  return { auth: authFactory(adapter) };
};
