import { CreateValueObjectPayload, ValueObject } from "@/value-objects/value-objects"

class UserNameError extends Error {
  constructor(readonly message: string) {
    super(message)
    this.name = "UserNameError"
  }
}

class UserName extends ValueObject<"UserName", string, UserNameError> {
  private static readonly MIN_LENGTH = 3
  private static readonly MAX_LENGTH = 32

  private constructor(_value: string) {
    super(_value)
  }

  protected validate(_value: string): UserNameError | null {
    if (!_value) {
      return new UserNameError("UserName must not be empty.")
    }

    if (_value.length < UserName.MIN_LENGTH) {
      return new UserNameError(`UserName must be longer than ${UserName.MIN_LENGTH} characters.`)
    }

    if (_value.length > UserName.MAX_LENGTH) {
      return new UserNameError(`UserName must be shorter than ${UserName.MAX_LENGTH} characters.`)
    }

    return null
  }

  public isEqual(rhs: UserName): boolean {
    return this.value === rhs.value
  }

  static create(_value: string): CreateValueObjectPayload<UserName, UserNameError> {
    try {
      const userName = new UserName(_value)
      return [userName, null]
    } catch (err) {
      return [null, err as UserNameError]
    }
  }
}

export { UserName, UserNameError }
