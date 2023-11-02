import { Email, EmailError } from "@/value-objects/email";
import { describe, expect, test } from "vitest";

describe("UnitTest for `Email`", () => {
  describe.each([
    { name: "koralle@example.com", expected: "koralle@example.com" },
  ])("Tests that input value is a valid email", ({ name, expected }) => {
    test(`Email.create("${name}") returns [Email("${name}"), null)])`, () => {
      const [email, error] = Email.create(name)

      expect(error).toBeNull()
      expect(email).not.toBeNull()

      expect(email?.value).equal(expected)
    })
  })

  describe.each([
    { name: "", expected: "Email must not be empty." },
    { name: "testtest", expected: "Email must be valid." },
  ])("Tests that input value is a invalid email", ({ name, expected }) => {
    test(`Email.create("${name}") returns [null, EmailError("${expected})"]`, () => {
      const [email, error] = Email.create(name)

      expect(error).toBeInstanceOf(EmailError)
      expect(email).toBeNull()

      expect(error?.message).toBe(expected)
    })
  })
})
