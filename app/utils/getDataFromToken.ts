import { jwtDecode } from "jwt-decode";

export type TokenDecoded = {
  email: string;
  app_metadata: { provider: string };
  user_metadata: { default_user_id: string };
  role: string;
  aud: string;
  exp: number;
  sub: string;
};

const getDataFromToken = (token: string | null): string | null => {
  if (!token) return null;

  const user = jwtDecode(token) as TokenDecoded;

  if (!user?.email) return null;

  return user?.sub;
};

export default getDataFromToken;
