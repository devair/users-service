import 'reflect-metadata'
import express from "express"
import "express-async-errors"
import * as dotenv from 'dotenv'
import { AppDataSource } from '../infra/datasource/typeorm'
import { router } from '../interface/web/routers'
import RabbitMQDoctorAdapterOUT from '../infra/messaging/RabbitMQDoctorAdapterOUT'
import RabbitMQDoctorAdapterOUTMock from '../tests/infra/messaging/mocks/RabbitMQDoctorAdapterOUTMock'

dotenv.config()

export const app = express()
app.disable("x-powered-by")
app.use(express.json())

if (process.env.NODE_ENV !== 'test') {
    AppDataSource.initialize().then(async (datasource) => {

        const doctorAdapterOUT = new RabbitMQDoctorAdapterOUT()
        await doctorAdapterOUT.connect()

        app.use('/api/v1', router(datasource, doctorAdapterOUT))

        app.listen(3333, '0.0.0.0', () => {
            console.log(`User Service listening  on port 3333`)
        })

    }).catch(error => console.log(error))
}
else {
    const instance = new RabbitMQDoctorAdapterOUTMock('param1', 'param2');
    app.use('/api/v1', router(AppDataSource, instance))
}
