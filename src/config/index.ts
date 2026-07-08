import dotenv from "dotenv"
import path from "path"
dotenv.config({
path:path.join(process.cwd(),'.env')
})

const configuration={
port:process.env.PORT,
database_url:process.env.DATABASE_URL,
app_url:process.env.app_url,
front_end_Url:process.env.frontend_url,
bcrypt_salt_round:process.env.BCRYPT_SALT_ROUNT,
jwt_access_secret:process.env.JWT_ACCESS_SECRET!,
jwt_access_expires_in:process.env.JWT_EXPIRES_IN!,
jwt_refresh_access_secret:process.env.JWT_REFRESH_SECRET!,
jwt_refresh_expires_in:process.env.JWT_REFRESH_EXPIRES_IN!,
//payment related 
ssl_commerz_store_id:process.env.SSL_COMMERZ_STORE_ID,
ssl_commerz_store_password:process.env.SSL_COMMERZ_STORE_PASSWORD,
}

export default configuration