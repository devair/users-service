import { Repository } from "typeorm"
import { User } from "../../../../core/entities/User"
import { IUserRepository } from "../../../../ports/repository/IUsersRepository"

export class UsersRepositoryPostgres implements IUserRepository {

    constructor(
        private readonly repository: Repository<User>
    ) { }

    async create(user:User): Promise<User> {
        const newUser = this.repository.create(user)
        const userCreated = await this.repository.save(newUser)
        return userCreated
    }    

    async findByEmail(email: string): Promise<User> {
        const user = this.repository.findOne({ where: { email } })
        return user
    }

    async findByCpf(cpf: string): Promise<User> {
        const user = this.repository.findOne({ where: { cpf } })
        return user
    }

}