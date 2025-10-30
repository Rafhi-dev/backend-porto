import { Router } from "express";
import exp from "./exp.controller.js";
import auth from "../../../middleware/auth.middleware.js";

const expRoute = Router()

expRoute.get('/', exp.index)
expRoute.get('/:id',auth.attemp, exp.show)
expRoute.post('/',auth.attemp, exp.add)
expRoute.patch('/:id',auth.attemp, exp.update)
expRoute.delete('/:id',auth.attemp, exp.delete)

export default expRoute