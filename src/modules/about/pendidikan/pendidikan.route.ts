import Express  from "express";
import pendidikan from "./pendidikan.controller.js";
import auth from "../../../middleware/auth.middleware.js";

const pendidikanRoute = Express.Router()

pendidikanRoute.get('/', pendidikan.index)
pendidikanRoute.get('/:id',auth.attemp, pendidikan.show)
pendidikanRoute.post('/',auth.attemp, pendidikan.add)
pendidikanRoute.patch('/:id',auth.attemp, pendidikan.update)

export default pendidikanRoute