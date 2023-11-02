import { CreateValueObjectPayload, ValueObject, ValueObjectError } from "@/value-objects/value-object"

class ProfileImageURLError extends ValueObjectError<string> {
  constructor(readonly message: string, value: string) {
    super(message, value)
    this.name = "ProfileImageURLError"
  }
}

class ProfileImageURL extends ValueObject<"ProfileImageURL", string, ProfileImageURLError> {
  protected validate(_value: string): ProfileImageURLError | null {
    if (!_value) {
      return new ProfileImageURLError("ProfileImageURL must not be empty.", _value)
    }

    try {
      const _ = new URL(_value)
      return null
    } catch (err: unknown) {
      if (err instanceof TypeError) {
        return new ProfileImageURLError("ProfileImageURL must be valid.", _value)
      }

      return new ProfileImageURLError("Something wrong.", _value)
    }
  }

  protected isEqual(other: ProfileImageURL): boolean {
    return this.value === other.value
  }

  public static create(_value: string): CreateValueObjectPayload<ProfileImageURL, ProfileImageURLError> {
    try {
      const email = new ProfileImageURL(_value)
      return [email, null]
    } catch (err) {
      if (err instanceof ProfileImageURLError) {
        return [null, err]
      }

      if (err instanceof Error) {
        return [null, new ProfileImageURLError(`${err.message}: ${_value}`, _value)]
      }

      return [null, new ProfileImageURLError(`Unexpected error.: ${_value}`, _value)]
    }
  }
}

export { ProfileImageURL, ProfileImageURLError }
