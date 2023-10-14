import { UserName } from "../value-objects/user-name"

type IUserRepository = {
  save: (user: User) => Promise<void>
  findById: (id: ID) => Promise<User>
  findByName: (name: UserName) => Promise<User>
}

export type { IUserRepository }
