import { Router } from "express"
import { UsersApi } from "../api/UsersApi"

export const usersRouter = (api: UsersApi)=> {
    const router = Router()
    router.post('/register', (req,res)=>api.create(req,res))    

    router.post('/login', (req,res)=>api.login(req,res))    

    return router
}