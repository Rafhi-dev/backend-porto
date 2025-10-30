import express from "express"
import about from "./about.controller.js"
import auth from "../../../middleware/auth.middleware.js"

const aboutRoute = express.Router()

aboutRoute.get('/', about.index)
aboutRoute.get('/:id',auth.attemp, about.show)
aboutRoute.post('/',auth.attemp, about.save)
aboutRoute.patch('/:id',auth.attemp, about.edit)
aboutRoute.delete('/:id',auth.attemp, about.delete)

export default aboutRoute