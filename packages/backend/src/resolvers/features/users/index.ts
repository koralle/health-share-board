import { GraphQLContext } from "@/context"
import { User, users } from "@/schema"
import { drizzle } from "drizzle-orm/d1"
import { EndUserError } from "shared/src/utils/errors"

const fetchEndAllUsers = async (ctx?: GraphQLContext) => {
  const db = drizzle(ctx!.env.DB)

  let endUsers: User[] = []
  const errors: EndUserError[] = []

  try {
    const result = await db.select().from(users).all()
    endUsers = [...result]
  } catch (e) {
    if (e instanceof Error) {
      errors.push()
    }
  }

  return {
    errors,
    endUsers,
  }
}

export { fetchEndAllUsers }
