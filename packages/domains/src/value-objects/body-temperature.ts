import { CreateValueObjectPayload, ValueObject, ValueObjectError } from "@/value-objects/value-object"

class BodyTemperatureError extends ValueObjectError<number> {
  constructor(readonly message: string, value: number) {
    super(message, value)
    this.name = "BodyTemperatureError"
  }
}

class BodyTemperature extends ValueObject<"BodyTemperature", number, BodyTemperatureError> {
  private static readonly MIN = 30.0
  private static readonly MAX = 50.0

  protected validate(_value: number): BodyTemperatureError | null {
    if (_value < BodyTemperature.MIN) {
      return new BodyTemperatureError(`BodyTemperature must be greater than ${BodyTemperature.MIN}.: ${_value}`, _value)
    }

    if (_value > BodyTemperature.MAX) {
      return new BodyTemperatureError(`BodyTemperature must be less than ${BodyTemperature.MAX}.: ${_value}`, _value)
    }

    return null
  }

  protected isEqual(other: BodyTemperature): boolean {
    return this.value === other.value
  }

  public static create(_value: number): CreateValueObjectPayload<BodyTemperature, BodyTemperatureError> {
    try {
      const bodyTemperature = new BodyTemperature(_value)
      return [bodyTemperature, null]
    } catch (err) {
      if (err instanceof BodyTemperatureError) {
        return [null, err]
      }

      if (err instanceof Error) {
        return [null, new BodyTemperatureError(`${err.message}: ${_value}`, _value)]
      }

      return [null, new BodyTemperatureError(`Unexpected error.: ${_value}`, _value)]
    }
  }
}

export { BodyTemperature, BodyTemperatureError }
