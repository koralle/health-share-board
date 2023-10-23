import { CreateValueObjectPayload, ValueObject } from "@/value-objects/value-objects"

class BodyTemperatureError extends Error {
  constructor(readonly message: string) {
    super(message)
    this.name = "BodyTemperatureError"
  }
}

class BodyTemperature extends ValueObject<"BodyTemperature", number, BodyTemperatureError> {
  private static readonly MIN = 30.0
  private static readonly MAX = 50.0

  private constructor(_value: number) {
    super(_value)
  }

  protected validate(_value: number): BodyTemperatureError | null {
    if (_value < BodyTemperature.MIN) {
      return new BodyTemperatureError(`BodyTemperature must be greater than ${BodyTemperature.MIN}.`)
    }

    if (_value > BodyTemperature.MAX) {
      return new BodyTemperatureError(`BodyTemperature must be less than ${BodyTemperature.MAX}.`)
    }

    return null
  }

  public isEqual(other: ValueObject<"BodyTemperature", number, BodyTemperatureError>): boolean {
    return this.value === other.value
  }

  static create(_value: number): CreateValueObjectPayload<BodyTemperature, BodyTemperatureError> {
    try {
      const bodyTemperature = new BodyTemperature(_value)
      return [bodyTemperature, null]
    } catch (err) {
      return [null, err as BodyTemperatureError]
    }
  }
}

export { BodyTemperature, BodyTemperatureError }
