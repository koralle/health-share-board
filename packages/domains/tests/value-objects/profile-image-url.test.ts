import { ProfileImageURL, ProfileImageURLError } from "@/value-objects/profile-image-url";
import { describe, expect, test } from "vitest";

describe("UnitTest for `ProfileImageURL`", () => {
  describe.each([
    { name: "https://example.com", expected: "https://example.com" },
  ])("Tests that input value is a valid email", ({ name, expected }) => {
    test(`ProfileImageURL.create("${name}") returns [ProfileImageURL("${name}"), null)])`, () => {
      const [email, error] = ProfileImageURL.create(name)

      expect(error).toBeNull()
      expect(email).not.toBeNull()

      expect(email?.value).equal(expected)
    })
  })

  describe.each([
    { name: "", expected: "ProfileImageURL must not be empty." },
    { name: "testtest", expected: "ProfileImageURL must be valid." },
  ])("Tests that input value is a invalid email", ({ name, expected }) => {
    test(`ProfileImageURL.create("${name}") returns [null, ProfileImageURLError("${expected})"]`, () => {
      const [email, error] = ProfileImageURL.create(name)

      expect(error).toBeInstanceOf(ProfileImageURLError)
      expect(email).toBeNull()

      expect(error?.message).toBe(expected)
    })
  })
})
