import { CheckInsRepository } from '@/repositories/check-ins-repository'
import { Prisma, CheckIn } from '@prisma/client'
import dayjs from 'dayjs'
import { randomUUID } from 'node:crypto'

export class InMemoryCheckInsRepository implements CheckInsRepository {
  public items: CheckIn[] = []

  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf('date')
    const endOfTheDay = dayjs(date).endOf('date')

    const checkInOnSameDate = this.items.find((checkIn) => {
      const checkInDate = dayjs(checkIn.createdAt)
      const isOnSameDay =
        checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay)

      return checkIn.user_id === userId && isOnSameDay
    })

    if (!checkInOnSameDate) {
      return null
    }

    return checkInOnSameDate
  }

  async findManyByUserId(userId: string) {
    return this.items.filter((item) => item.user_id === userId)
  }

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = {
      id: randomUUID(),
      user_id: data.user_id,
      gymId: data.gymId,
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
      createdAt: new Date(),
    }

    this.items.push(checkIn)

    return checkIn
  }
}
