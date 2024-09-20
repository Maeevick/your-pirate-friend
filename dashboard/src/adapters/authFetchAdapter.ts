import { AuthAdapter, AuthResponse } from "../ports/auth";

export class AuthFetchAdapter implements AuthAdapter {
  private apiUrl: string;

  constructor(apiUrl: string) {
    this.apiUrl = apiUrl;
  }

  async signup(
    username: string,
    email: string,
    password: string,
  ): Promise<AuthResponse> {
    const response = await fetch(`${this.apiUrl}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });

    if (!response.ok) {
      throw new Error("Signup failed");
    }

    return response.json();
  }

  async signin(username: string, password: string): Promise<AuthResponse> {
    const response = await fetch(`${this.apiUrl}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error("Signin failed");
    }

    return response.json();
  }
}
