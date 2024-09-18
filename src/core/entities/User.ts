export class User{

    id?: number
    constructor(
        public name: string, 
        public cpf: string, 
        public email: string, 
        public password: string, 
        public role: string,
        public crm?: string,
    ){
    }    
}

export enum UserRole {
    PATIENT = 'Patient',
    DOCTOR = 'Doctor'
}