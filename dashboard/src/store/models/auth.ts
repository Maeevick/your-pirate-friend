import { createModel } from "@rematch/core";
import { RootModel } from "./index";
import { AuthAdapter } from "@/ports/auth";

interface User {
  id: string;
  username: string;
  email: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

export const authFactory = (adapter: AuthAdapter) => {
  return createModel<RootModel>()({
    state: {
      user: null,
      token: null,
      isAuthenticated: false,
    } as AuthState,
    reducers: {
      setUser(state, payload: User) {
        return { ...state, user: payload, isAuthenticated: true };
      },
      setToken(state, payload: string) {
        return { ...state, token: payload };
      },
      logout(state) {
        return { ...state, user: null, token: null, isAuthenticated: false };
      },
    },
    effects: (dispatch) => ({
      async signup({
        username,
        email,
        password,
      }: {
        username: string;
        email: string;
        password: string;
      }) {
        try {
          const { user, token } = await adapter.signup(
            username,
            email,
            password,
          );

          dispatch.auth.setUser(user);
          dispatch.auth.setToken(token);
        } catch (error) {
          throw error;
        }
      },
      async signin({
        username,
        password,
      }: {
        username: string;
        password: string;
      }) {
        try {
          const { user, token } = await adapter.signin(username, password);

          dispatch.auth.setUser(user);
          dispatch.auth.setToken(token);
        } catch (error) {
          throw error;
        }
      },
    }),
  });
};
