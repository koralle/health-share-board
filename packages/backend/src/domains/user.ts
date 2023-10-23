import { ID } from "@/value-objects/id";
import { ProfileImageUrl } from "@/value-objects/prorile-image-url";
import { UserName } from "@/value-objects/user-name";
import { CreateEntityPayload, Entity } from "./entity";

class UserEntityError extends Error {
  constructor(readonly message: string) {
    super(message)
    this.name = "UserEntityError"
  }
}

type CreateUserEntityPayload = [UserEntity, null] | [null, UserEntityError]

class UserEntity extends Entity<"User"> {
  readonly name: UserName
  readonly profileImageUrl?: ProfileImageUrl

  constructor(protected readonly _id: ID, protected readonly _name: UserName, _profileImageUrl?: ProfileImageUrl) {
    super(_id)
    this.name = _name
    if (_profileImageUrl) {
      this.profileImageUrl = _profileImageUrl
    }
  }

  public isEqual(other: UserEntity): boolean {
    if (this.profileImageUrl && other.profileImageUrl) {
      return this.id.isEqual(other.id) && this.name.isEqual(other.name) && this.profileImageUrl.isEqual(other.profileImageUrl)
    }

    if (!this.profileImageUrl && !other.profileImageUrl) {
      return this.id.isEqual(other.id) && this.name.isEqual(other.name)
    }

    return false
  }

  static create(name: string, profileImageUrl?: string): CreateEntityPayload<UserEntity, UserEntityError> {
    const [_id, idErr] = ID.create()
    if (idErr) {
      return [null, new UserEntityError(idErr.message)]
    }

    const [_name, nameErr] = UserName.create(name)
    if (nameErr) {
      return [null, new UserEntityError(nameErr.message)]
    }

    if (!profileImageUrl) {
      return [new UserEntity(_id, _name), null]
    }

    const [_profileImageUrl, profileImageUrlErr] = ProfileImageUrl.createFromString(profileImageUrl)
    if (profileImageUrlErr) {
      return [null, new UserEntityError(profileImageUrlErr.message)]
    }

    return [new UserEntity(_id, _name, _profileImageUrl), null]
  }

  static createWithId(id: string, name: string, profileImageUrl?: string): CreateUserEntityPayload {
    const [_id, idErr] = ID.createFromString(id)
    if (idErr) {
      return [null, new UserEntityError(idErr.message)]
    }

    const [_name, nameErr] = UserName.create(name)
    if (nameErr) {
      return [null, new UserEntityError(nameErr.message)]
    }

    if (!profileImageUrl) {
      return [new UserEntity(_id, _name), null]
    }

    const [_profileImageUrl, profileImageUrlErr] = ProfileImageUrl.createFromString(profileImageUrl)
    if (profileImageUrlErr) {
      return [null, new UserEntityError(profileImageUrlErr.message)]
    }

    return [new UserEntity(_id, _name, _profileImageUrl), null]
  }
}

export { UserEntity, UserEntityError }
