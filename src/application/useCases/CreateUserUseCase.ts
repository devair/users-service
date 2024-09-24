import { DataSource } from "typeorm"
import { IUserRepository } from "../../ports/repository/IUsersRepository"
import { ICreateUserUseCase } from "../../core/usesCase/ICreateUserUseCase"
import { User, UserRole } from "../../core/entities/User"
import { InputCreatedUserDto, OutputCreatedUserDto } from "../../core/usesCase/dots/ICreatedUserDto"
import * as bcrypt from 'bcrypt'
import { UsersRepositoryPostgres } from "../../infra/datasource/typeorm/postgres/UsersRepositoryPostgres"
import { UserEntity } from "../../infra/datasource/typeorm/entities/UserEntity"
import { IUserQueueAdapterOUT } from "../../core/messaging/IUserQueueAdapterOUT"
import { QueueNames } from "../../core/messaging/QueueNames"

export class CreateUserUseCase implements ICreateUserUseCase {

    private userRepository: IUserRepository

    constructor(
        private dataSource: DataSource,
        private userQueueOut: IUserQueueAdapterOUT
    ) {
        
    }

    async execute(userInput: InputCreatedUserDto): Promise<OutputCreatedUserDto> {
        const { name, cpf, email, password, role, crm } = userInput

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = new User(name, cpf, email, hashedPassword, role, crm)

        const queryRunner = this.dataSource.createQueryRunner()
        await queryRunner.startTransaction()    
        //const repoTransaction = queryRunner.manager.getRepository(UserEntity)
        this.userRepository = new UsersRepositoryPostgres(queryRunner.manager.getRepository(UserEntity))

        try {
            const userFound = await this.userRepository.findByCpf(cpf) || await this.userRepository.findByEmail(email)
            if (userFound) {
                throw new Error(`User already exists with these parameters: cpf or email`)
            }
        
            const userCreated = await this.userRepository.create(user)
            
            // Doctor message
            if (userCreated.role == UserRole.DOCTOR) {
                const doctorMessage = { name: userCreated.name, email: user.email, crm: user.crm }
                await this.userQueueOut.publish(QueueNames.DOCTOR_REGISTRATION, JSON.stringify(doctorMessage))
            }

            // Patient message
            if (userCreated.role == UserRole.PATIENT) {
                const patientMessage = { name: userCreated.name, email: user.email, cpf: user.cpf }
                await this.userQueueOut.publish(QueueNames.PATIENT_REGISTRATION, JSON.stringify(patientMessage))
            }

            // Confirma a transação
            await queryRunner.commitTransaction()

            return {
                id: userCreated.id,
                name: userCreated.name,
                email: userCreated.email
            }
            
        } catch (error) {
            await queryRunner.rollbackTransaction()
            throw error
        }
        finally{
            await queryRunner.release()
        }


        
    }
}