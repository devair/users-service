import { InputCreatedUserDto, OutputCreatedUserDto } from "./dots/ICreatedUserDto"

export interface ICreateUserUseCase{
    
    execute (userInput: InputCreatedUserDto ):Promise<OutputCreatedUserDto>
}