import { Opaque } from "type-fest"

type UserName = Opaque<string, "UserName">

const UserName = {
  create: (value: string): UserName | null => {
    if (value === "") {
      return null
    }

    if (value.length < 3) {
      return null
    }

    if (value.length > 30) {
      return null
    }

    return value as UserName
  },
}

export { UserName }
