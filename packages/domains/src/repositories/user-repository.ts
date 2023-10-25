import { UserEntity, UserEntityError } from "@/entities"
import { ID } from "@/value-objects"

type UserRepository = {
  fetchAll(): Promise<UserEntity[]>
  findById(id: ID): Promise<UserEntity>
  save(user: UserEntity): Promise<void>
  update(user: UserEntity): Promise<void>
  remove(id: ID): Promise<void>
}

export { UserRepository }
