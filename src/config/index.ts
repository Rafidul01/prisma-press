import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import path from "path";


dotenv.config({path: path.join(process.cwd(), ".env") });

export default {
    port : process.env.PORT || 3000,
    database_url : process.env.DATABASE_URL,
    app_url : process.env.APP_URL,
    bcrypt_salt_rounds : process.env.BCRYPT_SALT_ROUNDS,
    jwt : {
        secret : process.env.JWT_SECRET!,
        refresh_secret : process.env.JWT_REFRESH_SECRET!,
        expires_in : process.env.JWT_EXPIRES_IN! as string,
        refresh_expires_in : process.env.JWT_REFRESH_EXPIRES_IN! as string
    }
}