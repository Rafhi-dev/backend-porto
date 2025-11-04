import Express from "express";
import user from "../controller/user.controller.js";
import auth from "../../../middleware/auth.middleware.js";

const routerUser = Express.Router()

routerUser.get('/',auth.attemp, user.index)

routerUser.get('/:id',auth.attemp, user.show)

routerUser.post('/', user.create)

routerUser.patch('/:id',auth.attemp, user.edit)

export default routerUser