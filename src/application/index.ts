import 'reflect-metadata'
import express from "express"
import "express-async-errors"
import * as dotenv from 'dotenv'
import { AppDataSource } from '../infra/datasource/typeorm'
import { router } from '../interface/web/routers'
import RabbitMQDoctorAdapterOUT from '../infra/messaging/RabbitMQDoctorAdapterOUT'

dotenv.config()

const app = express()
app.disable("x-powered-by")
app.use(express.json())

AppDataSource.initialize().then(async (datasource) => {

    const doctorAdapterOUT = new RabbitMQDoctorAdapterOUT()
    await doctorAdapterOUT.connect()

    app.use('/api/v1', router(datasource, doctorAdapterOUT))

    app.listen(3333,'0.0.0.0', () => {
        console.log(`User Service listening  on port 3333`)
    })

}).catch(error => console.log(error))
