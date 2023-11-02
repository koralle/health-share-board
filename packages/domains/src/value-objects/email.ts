import { CreateValueObjectPayload, ValueObject, ValueObjectError } from "@/value-objects/value-object"
import { validate } from "email-validator"

class EmailError extends ValueObjectError<string> {
  constructor(readonly message: string, value: string) {
    super(message, value)
    this.name = "EmailError"
  }
}

class Email extends ValueObject<"Email", string, EmailError> {
  protected validate(_value: string): EmailError | null {
    if (!_value) {
      return new EmailError("Email must not be empty.", _value)
    }

    if (!validate(_value)) {
      return new EmailError("Email must be valid.", _value)
    }

    return null
  }

  protected isEqual(other: Email): boolean {
    return this.value === other.value
  }

  public static create(_value: string): CreateValueObjectPayload<Email, EmailError> {
    try {
      const email = new Email(_value)
      return [email, null]
    } catch (err) {
      if (err instanceof EmailError) {
        return [null, err]
      }

      if (err instanceof Error) {
        return [null, new EmailError(`${err.message}: ${_value}`, _value)]
      }

      return [null, new EmailError(`Unexpected error.: ${_value}`, _value)]
    }
  }
}

export { Email, EmailError }
