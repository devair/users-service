import { User } from "../../core/entities/User"

export interface IUserRepository{

    create(user: User):Promise<User>

    findByEmail(email: string): Promise<User>
    
    findByCpf(cpf: string): Promise<User>
}