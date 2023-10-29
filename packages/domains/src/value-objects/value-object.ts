type CreateValueObjectPayload<T = unknown, E extends Error = Error> = [T, null] | [null, E]

/**
 * @see https://qiita.com/maKunugi/items/42966217c9dfb20105fb
 */
class ValueObjectError<T> extends Error {
  private readonly _internalValue: T

  constructor(readonly message: string, readonly _value: T) {
    super(message)
    this.name = "ValueObjectError"
    this._internalValue = _value
  }

  public get value() {
    return this._internalValue
  }
}

/**
 * @see https://qiita.com/maKunugi/items/42966217c9dfb20105fb
 */
abstract class ValueObject<T extends string, TValue, E extends Error = Error> {
  private readonly valueObjectType: T | undefined

  private readonly _internalValue: TValue

  protected constructor(protected readonly _value: TValue) {
    const error = this.validate(_value)
    if (error) {
      throw error
    }

    this._internalValue = _value
  }

  protected abstract validate(_value: TValue): E | null
  protected abstract isEqual(other: ValueObject<T, TValue, E>): boolean

  public get value() {
    return this._internalValue
  }

  toJSON(): TValue {
    return this._value
  }
}

export { ValueObject, ValueObjectError }
export type { CreateValueObjectPayload }
