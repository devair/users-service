export interface OutputCreatedUserDto {
    id: number
    name: string
    email: string
}

export interface InputCreatedUserDto {
    name: string
    cpf: string 
    email: string
    password: string
    role: string
    crm?: string
}