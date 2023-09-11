import { CheckInsRepository } from '@/repositories/check-ins-repository'
import { CheckIn } from '@prisma/client'

interface FetchUserCheckInsHistoryUseCaseRequest {
  userId: string
}

interface FetchUserCheckInsHistoryUseCaseResponse {
  checkIns: CheckIn[]
}

export class FetchUserCheckInsHistoryUseCase {
  constructor(private CheckInsRepository: CheckInsRepository) {}

  async execute({
    userId,
  }: FetchUserCheckInsHistoryUseCaseRequest): Promise<FetchUserCheckInsHistoryUseCaseResponse> {
    const checkIns = await this.CheckInsRepository.findManyByUserId(userId)

    return {
      checkIns,
    }
  }
}
