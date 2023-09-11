import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { GymUseCase } from './create-gym'

let gymsRepository: InMemoryGymsRepository
let sut: GymUseCase

describe('Create Gym Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new GymUseCase(gymsRepository)
  })

  it('should be able to create gym', async () => {
    const { gym } = await sut.execute({
      title: 'any_title',
      latitude: 0,
      longitude: 0,
    })
    expect(gym.id).toEqual(expect.any(String))
  })
})
