import { ILoginUserPayload } from "./auth.interface";
import { prisma } from "../../lib/prisma";
import bcrypt from "bcryptjs";

const loginUser = async (payload: ILoginUserPayload) => {
  const { email, password } = payload;

  const user = await prisma.user.findUniqueOrThrow({
    where: {
      email,
    },
  });

  const isPasswordMatched = await bcrypt.compare(password, user.password);

  if (!isPasswordMatched) {
    throw new Error("Password does not match");
  }

  return user;  
};

export const authService = {
  loginUser,
};
