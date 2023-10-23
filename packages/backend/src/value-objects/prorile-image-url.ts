import { CreateValueObjectPayload, ValueObject } from "@/value-objects/value-objects"

class ProfileImageUrlError extends Error {
  constructor(readonly message: string) {
    super(message)
    this.name = "ProfileImageUrlError"
  }
}

class ProfileImageUrl extends ValueObject<"ProfileImageUrl", URL, ProfileImageUrlError> {
  private static readonly MAX_LENGTH = 255

  private constructor(_value: URL) {
    super(_value)
  }

  protected validate(_value: URL): ProfileImageUrlError | null {
    return null
  }

  public isEqual(rhs: ProfileImageUrl): boolean {
    return this.value === rhs.value
  }

  static create(_value: URL): CreateValueObjectPayload<ProfileImageUrl, ProfileImageUrlError> {
    try {
      const profileImageUrl = new ProfileImageUrl(_value)
      return [profileImageUrl, null]
    } catch (err) {
      return [null, err as ProfileImageUrlError]
    }
  }

  static createFromString(_value: string): CreateValueObjectPayload<ProfileImageUrl, ProfileImageUrlError> {
    try {
      const profileImageUrl = new ProfileImageUrl(new URL(_value))
      return [profileImageUrl, null]
    } catch (err: unknown) {
      if (err instanceof TypeError) {
        return [null, new ProfileImageUrlError("Invalid URL.")]
      }

      if (err instanceof ProfileImageUrlError) {
        return [null, err]
      }

      if (err instanceof Error) {
        return [null, new ProfileImageUrlError(err.message)]
      }

      return [null, new ProfileImageUrlError("Something went wrong")]
    }
  }
}

export { ProfileImageUrl, ProfileImageUrlError }
