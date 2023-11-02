import { CreateValueObjectPayload, ValueObject, ValueObjectError } from "@/value-objects/value-object"
import dayjs from "dayjs"
import customParseFormat from "dayjs/plugin/customParseFormat"
dayjs.extend(customParseFormat)

class DateTimeError extends ValueObjectError<string> {
  constructor(readonly message: string, value: string) {
    super(message, value)
    this.name = "DateTimeError"
  }
}

class DateTime extends ValueObject<"DateTime", string, DateTimeError> {
  protected validate(_value: string): DateTimeError | null {
    if (!_value) {
      return new DateTimeError("DateTime must not be empty.", _value)
    }

    if (!dayjs(_value, "YYYY-MM-DD HH:mm:ss", true).isValid()) {
      return new DateTimeError("DateTime must be valid.", _value)
    }

    return null
  }

  protected isEqual(other: DateTime): boolean {
    return this.value === other.value
  }

  public static create(_value: string): CreateValueObjectPayload<DateTime, DateTimeError> {
    try {
      const dateTime = new DateTime(_value)
      return [dateTime, null]
    } catch (err) {
      if (err instanceof DateTimeError) {
        return [null, err]
      }

      if (err instanceof Error) {
        return [null, new DateTimeError(`${err.message}: ${_value}`, _value)]
      }

      return [null, new DateTimeError(`Unexpected error.: ${_value}`, _value)]
    }
  }
}

export { DateTime, DateTimeError }
