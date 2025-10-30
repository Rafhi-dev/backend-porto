import Express from "express";
import login from "./login.controller.js";
import auth from "../../middleware/auth.middleware.js";

const loginRoute = Express.Router()

loginRoute.get('/test', auth.attemp,auth.roles("rafhi"), login.revoke)
loginRoute.post('/', login.auth)

export default loginRoute