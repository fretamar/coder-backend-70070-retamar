import { dirname } from 'path'
import { fileURLToPath } from "url"
import bcrypt from 'bcrypt'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default __dirname

//Hash de contraseña
export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10))

//Validacion de contraseña
export const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password)