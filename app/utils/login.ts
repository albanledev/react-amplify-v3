import { z } from "zod";

export const LoginTypeResZod = z.object({
  session: z.object({
    access_token: z.string(),
    refresh_token: z.string(),
    errorCode: z.string(),
  }),
});

export type LoginTypeRes = z.infer<typeof LoginTypeResZod>;

const loginFn = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<LoginTypeRes> => {
  try {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    const res = await response.json();

    return res.status === 200 ? res : null;
  } catch (e) {
    console.warn({ e });
    throw new Error("Error while login");
  }
};

export default loginFn;
