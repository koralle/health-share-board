import { GraphQLContext } from "../../../context";
import { drizzle } from "drizzle-orm/d1"
import { User, users } from "../../../schema";
import { EndUserError } from "@shared/utils/errors";

const fetchEndAllUsers = async (ctx?: GraphQLContext) => {

  const db = drizzle(ctx!.env.DB)

  let endUsers: User[] = []
  let errors: EndUserError[] = []

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
    endUsers
  }
}

export { fetchEndAllUsers }
