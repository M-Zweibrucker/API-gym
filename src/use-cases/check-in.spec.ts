import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInUseCase } from './check-in'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'
import { MaxNumberOfCheckInError } from './errors/max-number-of-check-in'
import { MaxDistanceError } from './errors/max-distance'

let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase

describe('Check-in Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInUseCase(checkInsRepository, gymsRepository)

    await gymsRepository.create({
      id: 'any_gym_id',
      title: 'any_gym_name',
      description: 'any_gym_description',
      latitude: -27.5998783,
      longitude: -48.5487406,
      phone: 'any_gym_phone',
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'any_gym_id',
      userId: 'any_user_id',
      userLatitude: -27.5998783,
      userLongitude: -48.5487406,
    })
    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in twice on the same day', async () => {
    vi.setSystemTime(new Date(2021, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: 'any_gym_id',
      userId: 'any_user_id',
      userLatitude: -27.5998783,
      userLongitude: -48.5487406,
    })
    await expect(() =>
      sut.execute({
        gymId: 'any_gym_id',
        userId: 'any_user_id',
        userLatitude: -27.5998783,
        userLongitude: -48.5487406,
      }),
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInError)
  })

  it('should be able to check in twice but in different days', async () => {
    vi.setSystemTime(new Date(2021, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: 'any_gym_id',
      userId: 'any_user_id',
      userLatitude: -27.5998783,
      userLongitude: -48.5487406,
    })

    vi.setSystemTime(new Date(2021, 0, 21, 8, 0, 0))

    const { checkIn } = await sut.execute({
      gymId: 'any_gym_id',
      userId: 'any_user_id',
      userLatitude: -27.5998783,
      userLongitude: -48.5487406,
    })
    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in on distant gym', async () => {
    gymsRepository.items.push({
      id: 'any_gym_id2',
      title: 'any_gym_name',
      description: 'any_gym_description',
      latitude: new Decimal(-27.5958849),
      longitude: new Decimal(-48.4869855),
      phone: 'any_gym_phone',
    })

    await expect(() =>
      sut.execute({
        gymId: 'any_gym_id2',
        userId: 'any_user_id',
        userLatitude: -27.5998783,
        userLongitude: -48.5487406,
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError)
  })
})
