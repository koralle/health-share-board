import { NIL, v4 as uuidv4, validate as validateAsUuid } from "uuid"
import { CreateValueObjectPayload, ValueObject } from "./value-object"

class IDError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "IDError"
  }
}

class ID extends ValueObject<"ID", string, IDError> {

  static readonly EMPTY = new ID(NIL)

  private constructor(_value: string) {
    super(_value)
  }

  protected validate(_value: string): IDError | null {
    if(!_value) {
      return new IDError("ID must not be empty.")
    }

    if (!validateAsUuid(_value)) {
      return new IDError(`Invalid ID: ${_value}`)
    }

    return null
  }

  public isEqual(rhs: ID): boolean {
    return this.value === rhs.value
  }

  static create(): CreateValueObjectPayload<ID, IDError> {
    try {
      const id = new ID(uuidv4())
      return [id, null]
    } catch (err) {
      return [null, err as IDError]
    }
  }

  static createFromString(_id: string): CreateValueObjectPayload<ID, IDError> {
    try {
      const id = new ID(_id)
      return [id, null]
    } catch (err) {
      return [null, err as IDError]
    }
  }
}

export { ID, IDError }
