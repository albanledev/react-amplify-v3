const isUserAdmin = async (token: string | null): Promise<boolean> => {
  if (!token) return false;

  try {
    const response = await fetch("/api/auth/me", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const res = await response.json();

    if (res.status !== 200) return false;

    return res.data.role === "ADMIN";
  } catch (e) {
    console.warn({ e });
    throw new Error("Error while login");
  }
};

export default isUserAdmin;
