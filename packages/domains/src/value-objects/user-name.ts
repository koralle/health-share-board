import { CreateValueObjectPayload, ValueObject, ValueObjectError } from "@/value-objects/value-object"

class UserNameError extends ValueObjectError<string> {
  constructor(readonly message: string, value: string) {
    super(message, value)
    this.name = "UserNameError"
  }
}

class UserName extends ValueObject<"UserName", string, UserNameError> {
  private static readonly MIN_LENGTH = 3
  private static readonly MAX_LENGTH = 32

  protected validate(_value: string): UserNameError | null {
    if (!_value) {
      return new UserNameError("UserName must not be empty.", _value)
    }

    if (_value.length < UserName.MIN_LENGTH) {
      return new UserNameError(`UserName must be longer than ${UserName.MIN_LENGTH} characters.: ${_value}`, _value)
    }

    if (_value.length > UserName.MAX_LENGTH) {
      return new UserNameError(`UserName must be shorter than ${UserName.MAX_LENGTH} characters.: ${_value}`, _value)
    }

    // TODO: ユーザー名として使用できる文字種の制限を追加する

    return null
  }

  protected isEqual(other: UserName): boolean {
    return this.value === other.value
  }

  public static create(_value: string): CreateValueObjectPayload<UserName, UserNameError> {
    try {
      const userName = new UserName(_value)
      return [userName, null]
    } catch (err) {
      if (err instanceof UserNameError) {
        return [null, err]
      }

      if (err instanceof Error) {
        return [null, new UserNameError(`${err.message}: ${_value}`, _value)]
      }

      return [null, new UserNameError(`Unexpected error.: ${_value}`, _value)]
    }
  }
}

export { UserName, UserNameError }
