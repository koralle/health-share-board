import { CreateValueObjectPayload, ValueObject, ValueObjectError } from "@/value-objects/value-object"
import { v4 as uuidv4, validate as uuidValidate } from "uuid"

class IDError extends ValueObjectError<string> {
  constructor(readonly message: string, value: string) {
    super(message, value)
    this.name = "IDError"
  }
}

class ID extends ValueObject<"ID", string, IDError> {
  protected validate(_value: string): IDError | null {
    if (!_value) {
      return new IDError("ID must not be empty.", _value)
    }

    if (!uuidValidate(_value)) {
      return new IDError("ID must be valid.", _value)
    }

    return null
  }

  protected isEqual(other: ID): boolean {
    return this.value === other.value
  }

  public static create(): CreateValueObjectPayload<ID, IDError> {
    return [new ID(uuidv4()), null]
  }

  public static createWith(_value: string): CreateValueObjectPayload<ID, IDError> {
    try {
      return [new ID(_value), null]
    } catch (err: unknown) {
      if (err instanceof IDError) {
        return [null, err]
      }

      if (err instanceof Error) {
        return [null, new IDError(`${err.message}: ${_value}`, _value)]
      }

      return [null, new IDError(`Unexpected error.: ${_value}`, _value)]
    }
  }
}

export { ID, IDError }
