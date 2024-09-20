import { DataSource } from "typeorm"
import { IUserRepository } from "../../ports/repository/IUsersRepository"
import { ILoginUseCase } from "../../core/usesCase/ILoginUseCase"
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import { UserEntity } from "../../infra/datasource/typeorm/entities/UserEntity"
import { UsersRepositoryPostgres } from "../../infra/datasource/typeorm/postgres/UsersRepositoryPostgres"

export class LoginUseCase implements ILoginUseCase{

    private userRepository: IUserRepository

    //TODO ver onde colocar isso
    static JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey'

    constructor(
        private dataSource: DataSource
    ){    
        this.userRepository = new UsersRepositoryPostgres(this.dataSource.getRepository(UserEntity))    
    }

    async execute (email: string, password: string ):Promise<string>{                
        const userFound = await this.userRepository.findByEmail(email)
        if(!userFound){
            throw new Error(`User not found`)
        }

        const isMatch = await bcrypt.compare(password, userFound.password)

        if (!isMatch) {
            throw new Error(`Invalid Email or Password`)
        }

        // Gerar o token JWT
        const token = jwt.sign({ email: userFound.email, role: userFound.role, id: userFound.id }, LoginUseCase.JWT_SECRET, { expiresIn: '1h' })

        return token
    }
}