import { BodyTemperature, BodyTemperatureError } from "@/value-objects/body-temperature"
import { describe, expect, test } from "vitest"

describe("UnitTest for `BodyTemperature`", () => {
  describe.each([
    { value: 36.5, expected: 36.5 },
    { value: 30.0, expected: 30.0 },
    { value: 50.0, expected: 50.0 },
  ])("Tests that input value is a valid body temperature", ({ value, expected }) => {
    test(`BodyTemperature.create("${value}") returns [BodyTemperature("${value}"), null)])`, () => {
      const [bodyTemperature, error] = BodyTemperature.create(value)

      expect(error).toBeNull()
      expect(bodyTemperature).not.toBeNull()

      expect(bodyTemperature?.value).equal(expected)
    })
  })

  describe.each([
    { value: 29.9, expected: "BodyTemperature must be greater than 30.: 29.9" },
    {
      value: 50.1,
      expected: "BodyTemperature must be less than 50.: 50.1",
    },
  ])("Tests that input value is a invalid body temperature", ({ value, expected }) => {
    test(`BodyTemperature.create("${value}") returns [null, BodyTemperatureError("${expected})"]`, () => {
      const [bodyTemperature, error] = BodyTemperature.create(value)

      expect(error).toBeInstanceOf(BodyTemperatureError)
      expect(bodyTemperature).toBeNull()

      expect(error?.message).toBe(expected)
    })
  })
})
