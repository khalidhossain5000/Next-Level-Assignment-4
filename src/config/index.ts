import dotenv from "dotenv"
import path from "path"
dotenv.config({
path:path.join(process.cwd(),'.env')
})

const configuration={
port:process.env.PORT,
database_url:process.env.DATABASE_URL,
app_url:process.env.frontend_url,
bcrypt_salt_round:process.env.BCRYPT_SALT_ROUNT
}

export default configuration