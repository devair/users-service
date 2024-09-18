import { ICreateUserUseCase } from "../../core/usesCase/ICreateUserUseCase"
import { InputCreatedUserDto, OutputCreatedUserDto } from "../../core/usesCase/dots/ICreatedUserDto"

export class CreateUserController {
    
    constructor(private createUserUseCase: ICreateUserUseCase){}

    async handler(userInput: InputCreatedUserDto): Promise<OutputCreatedUserDto> {

        return await this.createUserUseCase.execute(userInput)
    }
}
