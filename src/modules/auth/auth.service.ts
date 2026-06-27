import { ILoginUserPayload } from "./auth.interface";
import { prisma } from "../../lib/prisma";
import bcrypt from "bcryptjs";
import jwt, { SignOptions } from "jsonwebtoken";
import config from "../../config";
import { jwtUtils } from "../../utils/jwt";



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

  const jwtPayload = {
    userId: user.id,
    email: user.email,
    name: user.name,
    role: user.role
  };
  

//   const accessToken = jwt.sign(jwtPayload,config.jwt.secret,{
//     expiresIn: config.jwt.expires_in
//   } as SignOptions);

  const accessToken = jwtUtils.createToken(jwtPayload,config.jwt.secret, config.jwt.expires_in as SignOptions);

  const refreshToken = jwtUtils.createToken(jwtPayload,config.jwt.refresh_secret, config.jwt.refresh_expires_in as SignOptions);
  
  return {
    accessToken,
    refreshToken
  };  
};

export const authService = {
  loginUser,
};
