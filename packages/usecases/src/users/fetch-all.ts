import { UserEntity } from 'domains/src/entities/user';
import { UserRepository } from "domains/src/repositories/user-repository"

class FetchAllEndUserUseCase {
  private readonly userRepository: UserRepository

  constructor(protected readonly _userRepository: UserRepository) {
    this.userRepository = _userRepository
  }

  async execute(): Promise<UserEntity[]> {
    try {
      return await this.userRepository.fetchAll()
    } catch (e: unknown) {
      if (e instanceof Error) {
        throw new Error(e.message)
      }
      return [] as UserEntity[]
    }
  }
}

export { FetchAllEndUserUseCase }
