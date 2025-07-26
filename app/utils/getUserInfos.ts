import { UserType } from "../types";

const getUserInfos = async (
  token: string | undefined
): Promise<UserType | null> => {
  if (!token) return null;

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000/";

  try {
    const response = await fetch(`${baseUrl}api/auth/me`, {
      method: "GET",
      headers: {
        Authorization: token,
        "X-Middleware-Request": "true",
      },
      credentials: "include",
    });
    if (!response.ok) return null;

    const res = await response.json();
    return res.data;
  } catch (e) {
    console.warn(e);
    return null;
  }
};

export default getUserInfos;
