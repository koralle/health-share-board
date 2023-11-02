import { DateTime, DateTimeError } from "@/value-objects/date-time";
import { describe, expect, test } from "vitest";

describe("UnitTest for `DateTime`", () => {
  describe.each([
    { dateTime: "2023-11-03 21:00:00", expected: "2023-11-03 21:00:00" },
  ])("Tests that input value is a valid email", ({ dateTime: name, expected }) => {
    test(`DateTime.create("${name}") returns [DateTime("${name}"), null)])`, () => {
      const [dateTime, error] = DateTime.create(name)

      expect(error).toBeNull()
      expect(dateTime).not.toBeNull()

      expect(dateTime?.value).equal(expected)
    })
  })

  describe.each([
    { dateTime: "", expected: "DateTime must not be empty." },
    { dateTime: "testtest", expected: "DateTime must be valid." },
  ])("Tests that input value is a invalid email", ({ dateTime: name, expected }) => {
    test(`DateTime.create("${name}") returns [null, DateTimeError("${expected})"]`, () => {
      const [dateTime, error] = DateTime.create(name)

      expect(error).toBeInstanceOf(DateTimeError)
      expect(dateTime).toBeNull()

      expect(error?.message).toBe(expected)
    })
  })
})
