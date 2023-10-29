import { UserName, UserNameError } from "@/value-objects/user-name"
import { describe, expect, test } from "vitest"

describe("UnitTest for `UserName`", () => {
  describe.each([
    { name: "testtest", expected: "testtest" },
    { name: new Array(3).fill("a").join(""), expected: "aaa" },
    { name: new Array(32).fill("a").join(""), expected: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" },
  ])("Tests that input value is a valid user name", ({ name, expected }) => {
    test(`UserName.create("${name}") returns [UserName("${name}"), null)])`, () => {
      const [primeNumber, error] = UserName.create(name)

      expect(error).toBeNull()
      expect(primeNumber).not.toBeNull()

      expect(primeNumber?.value).equal(expected)
    })
  })

  describe.each([
    { name: "", expected: "UserName must not be empty." },
    { name: new Array(2).fill("a").join(""), expected: "UserName must be longer than 3 characters.: aa" },
    {
      name: new Array(33).fill("a").join(""),
      expected: "UserName must be shorter than 32 characters.: aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    },
  ])("Tests that input value is a invalid user name", ({ name, expected }) => {
    test(`UserName.create("${name}") returns [null, UserNameError("${expected})"]`, () => {
      const [primeNumber, error] = UserName.create(name)

      expect(error).toBeInstanceOf(UserNameError)
      expect(primeNumber).toBeNull()

      expect(error?.message).toBe(expected)
    })
  })
})
