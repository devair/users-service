import { Request, Response } from 'express'
import { DataSource } from "typeorm"
import { CreateUserUseCase } from "../../../application/useCases/CreateUserUseCase"
import { CreateUserController } from "../../../communication/controller/CreateUserController"
import { LoginUseCase } from '../../../application/useCases/LoginUseCase'
import { LoginController } from '../../../communication/controller/LoginController'
import { IDoctorQueueAdapterOUT } from '../../../core/messaging/IDoctorQueueAdapterOUT'

export class UsersApi {
    constructor(
        private readonly dataSource: DataSource,
        private publisher: IDoctorQueueAdapterOUT
    ) { }

    async create(req: Request, resp: Response): Promise<Response> {
        const { name, email, password, role, cpf, crm } = req.body        
        const createUseUserCase = new CreateUserUseCase(this.dataSource, this.publisher)
        const createUseController = new CreateUserController(createUseUserCase)

        try {
            const data = await createUseController.handler({name, email, password, role, cpf, crm})
            resp.contentType('application/json')
            return resp.status(201).send(data)
        }
        catch (ex) {
            return resp.status(400).json({ message: ex.message })
        }
    }

    async login(req: Request, res: Response):Promise<Response>{
        const { email, password } = req.body;
        const loginUseCase = new LoginUseCase(this.dataSource)
        const loginController = new LoginController(loginUseCase)

        try {
            const data = await loginController.handler(email, password)
            res.contentType('text/plain')
            return res.status(200).send(data)
        }
        catch (ex) {
            return res.status(400).json({ message: ex.message })
        }
    }
}