export type User = {
  id: string;
  username: string;
  email: string;
  password: string;
  token: string | null;
};

export interface IUserRepository {
  findByUsername(username: string): Promise<User | null>;
  create(user: Omit<User, 'id' | 'token'>): Promise<User>;
  updateToken(userId: string, token: string | null): Promise<void>;
  findByToken(token: string): Promise<User | null>;
}
