import { z } from "zod";

export const LoginTypeResZod = z.object({
  session: z.object({
    access_token: z.string(),
    refresh_token: z.string(),
    errorCode: z.string(),
  }),
});

export type LoginTypeRes = z.infer<typeof LoginTypeResZod>;

const resgisterFn = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<LoginTypeRes> => {
  try {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    const res = await response.json();

    if (response.status === 201) {
      return res;
    } else {
      throw new Error("Invalid resgister response");
    }
  } catch (e) {
    console.warn({ e });
    throw new Error("Error while resgister");
  }
};

export default resgisterFn;
