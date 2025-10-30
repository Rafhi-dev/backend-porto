import { Router } from "express";
import jobdesk from "./jobdesk.controller.js";
import auth from "../../../middleware/auth.middleware.js";

const jobdeskRoute = Router()

jobdeskRoute.get('/', jobdesk.index)
jobdeskRoute.get('/:id', auth.attemp, jobdesk.show)
jobdeskRoute.post('/', auth.attemp, jobdesk.add)
jobdeskRoute.patch('/:id', auth.attemp, jobdesk.update)
jobdeskRoute.delete('/:id', auth.attemp, jobdesk.delete)

export default jobdeskRoute