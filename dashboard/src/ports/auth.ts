export interface User {
  id: string;
  username: string;
  email: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface AuthAdapter {
  signup(
    username: string,
    email: string,
    password: string,
  ): Promise<AuthResponse>;
  signin(username: string, password: string): Promise<AuthResponse>;
}
