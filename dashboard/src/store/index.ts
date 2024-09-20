import { init, RematchDispatch, RematchRootState } from "@rematch/core";
import { modelsFactory, RootModel } from "./models";
import { AuthAdapter } from "@/ports/auth";

export const storeFactory = (adapter: AuthAdapter) => {
  return init({
    models: modelsFactory(adapter),
  });
};

export type Dispatch = RematchDispatch<RootModel>;
export type RootState = RematchRootState<RootModel>;
