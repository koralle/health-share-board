import { ValueObject, ValueObjectError } from "@/value-objects/value-object"
import { describe, expect, test } from "vitest"

type InternalValue = number

class PrimeNumberError extends ValueObjectError<InternalValue> {
  constructor(readonly message: string, readonly _value: InternalValue) {
    super(message, _value)
    this.name = "PrimeNumberError"
  }
}

class PrimeNumber extends ValueObject<"PrimeNumber", InternalValue, PrimeNumberError> {
  protected validate(_value: InternalValue): PrimeNumberError | null {
    if (_value < 2) {
      return new PrimeNumberError(`PrimeNumber must be greater than 1.: ${_value}`, _value)
    }

    for (let num = 2; num * num <= _value; num++) {
      if (_value % num === 0) {
        return new PrimeNumberError(`PrimeNumber must be a prime number.: ${_value}`, _value)
      }
    }

    return null
  }

  protected isEqual(other: PrimeNumber): boolean {
    return this.value === other.value
  }

  public static create(_value: number): [PrimeNumber, null] | [null, Error] {
    try {
      const primeNumber = new PrimeNumber(_value)
      return [primeNumber, null]
    } catch (err) {
      if (err instanceof PrimeNumberError) {
        return [null, err]
      }

      if (err instanceof Error) {
        return [null, err]
      }

      return [null, new PrimeNumberError(`Unexpected error.: ${_value}`, _value)]
    }
  }
}

describe("Test ValueObject with PrimeNumber class", () => {
  describe.each([
    { num: 2, expected: 2 },
    { num: 3, expected: 3 },
    { num: 5, expected: 5 },
    { num: 7, expected: 7 },
    { num: 11, expected: 11 },
    { num: 13, expected: 13 },
    { num: 97, expected: 97 },
  ])("Tests that input values are prime numbers", ({ num, expected }) => {
    test(`PrimeNumber.create(${num}) returns [PrimeNumber(${expected}), null]`, () => {
      const [primeNumber, error] = PrimeNumber.create(num)

      expect(error).toBeNull()
      expect(primeNumber).not.toBeNull()

      expect(primeNumber?.value).equal(expected)
    })
  })

  describe.each([
    { num: -5, expected: "PrimeNumber must be greater than 1.: -5" },
    { num: -1, expected: "PrimeNumber must be greater than 1.: -1" },
    { num: 0, expected: "PrimeNumber must be greater than 1.: 0" },
    { num: 4, expected: "PrimeNumber must be a prime number.: 4" },
    { num: 6, expected: "PrimeNumber must be a prime number.: 6" },
    { num: 8, expected: "PrimeNumber must be a prime number.: 8" },
    { num: 25, expected: "PrimeNumber must be a prime number.: 25" },
  ])("Tests that input values are not prime numbers", ({ num, expected }) => {
    test(`PrimeNumber.create(${num}) returns [null, PrimeNumberError("${expected})"]`, () => {
      const [primeNumber, error] = PrimeNumber.create(num)

      expect(error).toBeInstanceOf(PrimeNumberError)
      expect(primeNumber).toBeNull()

      expect(error?.message).toBe(expected)
    })
  })
})
