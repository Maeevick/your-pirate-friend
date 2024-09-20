import { AuthAdapter, AuthResponse, User } from "../ports/auth";

export class AuthFakeAdapter implements AuthAdapter {
  private users: User[] = [
    {
      id: "0",
      username: "existinguser",
      email: "existing@example.com",
    },
  ];

  async signup(
    username: string,
    email: string,
    // password: string
  ): Promise<AuthResponse> {
    if (this.users.some((u) => u.username === username || u.email === email)) {
      throw new Error("Signup failed");
    }

    const newUser: User = {
      id: this.users.length.toString(),
      username,
      email,
    };

    this.users.push(newUser);

    return {
      user: newUser,
      token: "fake-token-" + newUser.id,
    };
  }

  async signin(
    username: string,
    // password: string
  ): Promise<AuthResponse> {
    const user = this.users.find((u) => u.username === username);

    if (!user) {
      throw new Error("Signin failed");
    }

    return {
      user,
      token: "fake-token-" + user.id,
    };
  }
}
