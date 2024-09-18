import { Router } from "express"
import { DataSource } from "typeorm"
import { UsersApi } from "../api/UsersApi"
import { usersRouter } from "./users.router"
import { IDoctorQueueAdapterOUT } from "../../../core/messaging/IDoctorQueueAdapterOUT"

export const router = (dataSource: DataSource, publisher: IDoctorQueueAdapterOUT) => {
        
    const router = Router()

    const usersApi = new UsersApi(dataSource, publisher)
    
    router.use('/users', usersRouter(usersApi))

    return router
}