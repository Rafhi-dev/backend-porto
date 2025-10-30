import express from "express"
import hero from "./hero.controller.js"
import auth from "../../middleware/auth.middleware.js"

const heroRoute = express.Router()

heroRoute.get('/', hero.index)
heroRoute.get('/:id',auth.attemp, hero.show)
heroRoute.post('/',auth.attemp, hero.create)
heroRoute.patch('/:id',auth.attemp, hero.edit)

export default heroRoute