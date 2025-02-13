export type AuthResponse = {
  tokens: Tokens;
  user: User;
};

export type Tokens = {
  accessToken: string;
  refreshToken: string;
};
export type User = {
  full_name: string;
  email: string;
  role: string;
};
