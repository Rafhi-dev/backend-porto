import { Router } from "express";
import skillSet from "./skillset.controller.js";
import auth from "../../middleware/auth.middleware.js";

const skillRoute = Router()

skillRoute.get('/', skillSet.index)
skillRoute.get('/:id',auth.attemp, skillSet.show)
skillRoute.post('/',auth.attemp, skillSet.create)
skillRoute.patch('/:id',auth.attemp, skillSet.update)
skillRoute.delete('/',auth.attemp, skillSet.remove)

export default skillRoute