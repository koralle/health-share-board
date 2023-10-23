import { CreateValueObjectPayload, ValueObject } from "@/value-objects/value-object"
import dayjs from "dayjs"

class DateTimeError extends Error {
  constructor(readonly message: string) {
    super(message)
    this.name = "DateTimeError"
  }
}

class DateTime extends ValueObject<"DateTime", string, DateTimeError> {
  private static readonly FORMAT = "yyyy-MM-dd HH:mm:ss"

  private constructor(protected readonly _value: string) {
    super(_value)
  }

  protected validate(_value: string): DateTimeError | null {
    if (!dayjs(_value).isValid()) {
      return new DateTimeError(`Invalid DateTime: ${_value}`)
    }

    return null
  }

  public now(): DateTime {
    const now = dayjs().format(DateTime.FORMAT)
    return new DateTime(now)
  }

  public isEqual(other: ValueObject<"DateTime", string, DateTimeError>): boolean {
    return this.value == other.value
  }

  static create(_value: string): CreateValueObjectPayload<DateTime, DateTimeError> {
    try {
      const dateTime = new DateTime(_value)
      return [dateTime, null]
    } catch (err) {
      return [null, err as DateTimeError]
    }
  }
}

export { DateTime, DateTimeError }
