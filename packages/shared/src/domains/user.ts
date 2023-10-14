import { ID } from "../value-objects/id"
import { UserName } from "../value-objects/user-name"

type UserEntity = {
  id: ID
  name: UserName
  profileImageUrl: URL
}

export type { UserEntity }
