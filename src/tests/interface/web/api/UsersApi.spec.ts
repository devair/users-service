import request from 'supertest'
import { app } from '../../../../application/index'
import { UserRole } from '../../../../core/entities/User'

let userCreated: any

describe('UsersApi', () => {

  it('should be able to create a new user', async () => {
    const response = await request(await app)
      .post('/api/v1/users/register')
      .send({
        name: 'Nome do usuario', cpf: '1111', 
        email: 'dummy@test.com', password: '123', role: UserRole.DOCTOR, crm: '111'
      })
        
    userCreated = response.body

    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty('id')        
  })

  it('should be able to create a new patient user', async () => {
    const response = await request(await app)
      .post('/api/v1/users/register')
      .send({
        name: 'Nome do usuario', cpf: '2222', 
        email: 'paciente@test.com', password: '123', role: UserRole.PATIENT, crm: ''
      })
        
    const patient = response.body

    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty('id')        
  })

  it('should not be able to create a new user', async () => {
    const response = await request(await app)
      .post('/api/v1/users/register')
      .send({
        name: 'Nome do usuario', cpf: '1111', 
        email: 'dummy@test.com', password: '123', role: UserRole.DOCTOR, crm: '111'
      })
    
    expect(response.status).toBe(400)       
  })

  it('should be able to login', async () => {
    const response = await request(await app)
      .post('/api/v1/users/login')
      .send({        
        email: userCreated.email, password: '123'
      })
        
    expect(response.status).toBe(200)            
  })

  it('should not be able to login', async () => {
    const response = await request(await app)
      .post('/api/v1/users/login')
      .send({        
        email: userCreated.email, password: 'errada'
      })
        
    expect(response.status).toBe(400)            
  })

  it('should not be able to login with user not found', async () => {
    const response = await request(await app)
      .post('/api/v1/users/login')
      .send({        
        email: 'usuario@naoencontrado.com', password: 'errada'
      })
        
    expect(response.status).toBe(400)            
  })

})