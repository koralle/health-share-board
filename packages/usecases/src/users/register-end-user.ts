import { UserEntity } from 'domains/src/entities/user';
import { UserRepository } from "domains/src/repositories/user-repository"

class RegisterEndUserUseCase {
  private readonly userRepository: UserRepository

  constructor(protected readonly _userRepository: UserRepository) {
    this.userRepository = _userRepository
  }

  async execute(userName: string, profileImageUrl?: string) {
    const [user, error] = UserEntity.create(userName, profileImageUrl)
    if (error) {
      throw new Error(error.message)
    }

    return this.userRepository.save(user)
  }
}

export { RegisterEndUserUseCase }
