import express, { Router }  from "express";
import pageIndex from "./pageIndex.controller.js";
import auth from "../../middleware/auth.middleware.js";

const pageIndexRoute = Router()

pageIndexRoute.get('/aktif', pageIndex.index)
pageIndexRoute.get('/',auth.attemp, pageIndex.allData)
pageIndexRoute.get('/:id', auth.attemp, pageIndex.show)

pageIndexRoute.post('/', auth.attemp, pageIndex.add)
pageIndexRoute.patch('/:id', auth.attemp, pageIndex.update)
pageIndexRoute.delete('/:id', auth.attemp, pageIndex.delete)


export default pageIndexRoute