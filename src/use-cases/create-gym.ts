import { Gym } from '@prisma/client'
import { GymsRepository } from '@/repositories/gyms-repository'

interface GymUseCaseProps {
  title: string
  description?: string | null
  phone?: string | null
  latitude: number
  longitude: number
}

interface GymUseCaseResponse {
  gym: Gym
}

export class GymUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    title,
    description,
    phone,
    latitude,
    longitude,
  }: GymUseCaseProps): Promise<GymUseCaseResponse> {
    const gym = await this.gymsRepository.create({
      title,
      description,
      phone,
      latitude,
      longitude,
    })

    return { gym }
  }
}
