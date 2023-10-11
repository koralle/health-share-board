import { Opaque } from "type-fest"

type ID = Opaque<string, "ID">

const ID = {
  create: (value: string): ID | null => {
    if (value === "") {
      return null
    }

    return value as ID
  },
}

export { ID }
