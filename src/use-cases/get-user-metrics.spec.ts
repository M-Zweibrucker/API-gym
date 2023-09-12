import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { GetUserMetricsUseCase } from './get-user-metrics'

let checkInsRepository: InMemoryCheckInsRepository
let sut: GetUserMetricsUseCase

describe('Get User metrics Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new GetUserMetricsUseCase(checkInsRepository)
  })

  it('should be able to get check-ins count from metrics', async () => {
    await checkInsRepository.create({
      user_id: 'any_user_id',
      gymId: 'any_gym_id',
    })

    await checkInsRepository.create({
      user_id: 'any_user_id',
      gymId: 'any_gym_id2',
    })

    const { checkInsCount } = await sut.execute({
      userId: 'any_user_id',
    })
    expect(checkInsCount).toEqual(2)
  })
})
