import supabase from "../supabase";

export const verifyJwtToken = async (
  token: string | null | undefined
): Promise<boolean> => {
  if (!token) {
    console.warn("No access token provided");
    return false;
  }

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser(token.slice(7));

  return Boolean(user?.id);
};
