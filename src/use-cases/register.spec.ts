import { expect, describe, it } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists'

describe('Register Use Case', () => {
  it('should be able to register', async () => {
    const UsersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(UsersRepository)

    const { user } = await registerUseCase.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })
    expect(user).toHaveProperty('id')
  })

  it('should hash user password upon registration', async () => {
    const UsersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(UsersRepository)

    const { user } = await registerUseCase.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    const is_password_hash_valid = await compare('123456', user.password_hash)

    expect(is_password_hash_valid).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const UsersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(UsersRepository)

    const email = 'johndoe@example.com'

    await registerUseCase.execute({
      name: 'John Doe',
      email,
      password: '123456',
    })

    await expect(() =>
      registerUseCase.execute({
        name: 'John Doe',
        email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
