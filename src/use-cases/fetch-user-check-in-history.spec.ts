import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { FetchUserCheckInsHistoryUseCase } from './fetch-user-check-in-history'

let checkInsRepository: InMemoryCheckInsRepository
let sut: FetchUserCheckInsHistoryUseCase

describe('Fetch check -in history Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new FetchUserCheckInsHistoryUseCase(checkInsRepository)
  })

  it('should be able to fetch check-in history', async () => {
    await checkInsRepository.create({
      user_id: 'any_user_id',
      gymId: 'any_gym_id',
    })

    await checkInsRepository.create({
      user_id: 'any_user_id',
      gymId: 'any_gym_id2',
    })

    const { checkIns } = await sut.execute({
      userId: 'any_user_id',
      page: 1,
    })
    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gymId: 'any_gym_id' }),
      expect.objectContaining({ gymId: 'any_gym_id2' }),
    ])
  })

  it('should be able to fetch paginated check-in history', async () => {
    for (let i = 1; i <= 22; i++) {
      await checkInsRepository.create({
        user_id: 'any_user_id',
        gymId: `any_gym_id${i}`,
      })
    }

    const { checkIns } = await sut.execute({
      userId: 'any_user_id',
      page: 2,
    })
    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gymId: 'any_gym_id21' }),
      expect.objectContaining({ gymId: 'any_gym_id22' }),
    ])
  })
})
