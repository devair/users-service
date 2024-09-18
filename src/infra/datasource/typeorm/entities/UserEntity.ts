import { EntitySchema } from "typeorm";
import { BaseColumnSchemaPart } from "./BaseColumnSchemaPart ";
import { User } from "../../../../core/entities/User"


export const UserEntity = new EntitySchema<User>({
    name: "users",
    columns: {
        ...BaseColumnSchemaPart,
        name: {
            type: 'varchar',
            unique: false
        },
        cpf: {
            type: 'varchar',
            unique: true
        },
        email: {
            type: 'varchar',
            unique: true
        },
        password: {
            type: 'varchar',
            unique: false
        },
        role: {
            type: 'varchar',
            unique: false
        },
        crm: {
            type: 'varchar',
            unique: false
        },
    },    
})