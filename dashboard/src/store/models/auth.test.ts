import { describe, it, expect } from "vitest";
import { storeFactory } from "..";
import { AuthFakeAdapter } from "../../adapters/authFakeAdapter";

describe("Authentication", () => {
  it("should set user and token on successful signup", async () => {
    const store = storeFactory(new AuthFakeAdapter());

    const expectedUser = {
      id: "1",
      username: "testuser",
      email: "test@example.com",
    };
    const expectedToken = "fake-token-1";

    await store.dispatch.auth.signup({
      username: "testuser",
      email: "test@example.com",
      password: "Password123!",
    });

    expect(store.getState().auth.user).toEqual(expectedUser);
    expect(store.getState().auth.token).toEqual(expectedToken);
    expect(store.getState().auth.isAuthenticated).toBe(true);
  });

  it("should set user and token on successful signin", async () => {
    const store = storeFactory(new AuthFakeAdapter());

    const expectedExistingUser = {
      id: "0",
      username: "existinguser",
      email: "existing@example.com",
    };
    const expectedToken = "fake-token-0";

    await store.dispatch.auth.signin({
      username: "existinguser",
      password: "Password123!",
    });

    expect(store.getState().auth.user).toEqual(expectedExistingUser);
    expect(store.getState().auth.token).toEqual(expectedToken);
    expect(store.getState().auth.isAuthenticated).toBe(true);
  });

  it("should throw an error on failed signup (duplicate username)", async () => {
    const store = storeFactory(new AuthFakeAdapter());

    await expect(
      store.dispatch.auth.signup({
        username: "existinguser",
        email: "test@example.com",
        password: "Password123!",
      }),
    ).rejects.toThrow("Signup failed");

    expect(store.getState().auth.user).toBeNull();
    expect(store.getState().auth.token).toBeNull();
    expect(store.getState().auth.isAuthenticated).toBe(false);
  });

  it("should throw an error on failed signup (duplicate email)", async () => {
    const store = storeFactory(new AuthFakeAdapter());

    await expect(
      store.dispatch.auth.signup({
        username: "testuser",
        email: "existing@example.com",
        password: "Password123!",
      }),
    ).rejects.toThrow("Signup failed");

    expect(store.getState().auth.user).toBeNull();
    expect(store.getState().auth.token).toBeNull();
    expect(store.getState().auth.isAuthenticated).toBe(false);
  });

  it("should throw an error on failed signin", async () => {
    const store = storeFactory(new AuthFakeAdapter());

    await expect(
      store.dispatch.auth.signin({
        username: "testuser",
        password: "Password123!",
      }),
    ).rejects.toThrow("Signin failed");

    expect(store.getState().auth.user).toBeNull();
    expect(store.getState().auth.token).toBeNull();
    expect(store.getState().auth.isAuthenticated).toBe(false);
  });
});
