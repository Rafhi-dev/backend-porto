import Express from "express";
import project from "./project.controller.js";
import auth from "../../middleware/auth.middleware.js";

const projectRoute = Express.Router()

projectRoute.get('/', project.index)
projectRoute.get('/:id',auth.attemp, project.show)
projectRoute.post('/',auth.attemp, project.create)
projectRoute.patch('/:id',auth.attemp, project.update)
projectRoute.delete('/',auth.attemp, project.remove)

export default projectRoute