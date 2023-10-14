import type { IUserRepository } from "shared/src/repositories/user"
import type { UserEntity } from "shared/src/domains/user"
import { UserName } from "shared/src/value-objects/user-name"
import { ID } from "shared/src/value-objects/id"

const inMemoryUserRepository = {
  save: async (user: UserEntity): Promise<void> => {

  },
  findById: async (id: ID): Promise<UserEntity> => {
    const name = UserName.create("test")

    if (!name) {
      return Promise.reject()
    }

    const user = {
      id,
      name,
      profileImageUrl: new URL("https://example.com")
    } satisfies UserEntity

    return Promise.resolve(user)
  },
  findByName: async (name: UserName): Promise<UserEntity> => {
    const id = ID.create("test")

    if(!id) {
      return Promise.reject()
    }

    const user = {
      id,
      name,
      profileImageUrl: new URL("https://example.com")
    } satisfies UserEntity

    return Promise.resolve(user)
  }
} satisfies IUserRepository

export { inMemoryUserRepository }
