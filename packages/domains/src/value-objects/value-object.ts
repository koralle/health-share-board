type CreateValueObjectPayload<T = any, E extends Error = Error> = [T, null] | [null, E]

abstract class ValueObject<TSymbol extends string, TValue, E extends Error = Error> {
  readonly [opaqueSymbol: symbol]: TSymbol

  readonly value: TValue

  constructor(protected readonly _value: TValue) {
    const error = this.validate(_value)
    if (error) {
      throw error
    }

    this.value = _value
  }

  protected abstract validate(_value: TValue): E | null
  protected abstract isEqual(other: ValueObject<TSymbol, TValue, E>): boolean

  toJSON(): TValue {
    return this.value
  }
}

export { ValueObject }
export type { CreateValueObjectPayload }
