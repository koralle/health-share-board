import { GraphQLContext, GraphQLContextEnv } from "@/context"
import { User, users } from "@/schema"
import { eq } from "drizzle-orm"
import { drizzle } from "drizzle-orm/d1"
import { Context } from "hono"
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

const fetchEndUserById = async (ctx?: GraphQLContext) => {
  const db = drizzle(ctx!.env.DB)
  const errors: EndUserError[] = []

  let endUsers: User[] = []
  try {
    const result = await db.select().from(users).where(eq(users.id, "0001"))
    endUsers = [...result]
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.error(e)
      errors.push()
    }
  }

  return {
    errors,
    endUsers,
  }
}

const registerEndUserResolver = async (ctx?: GraphQLContext) => {
  const db = drizzle(ctx!.env.DB)

  const errors: EndUserError[] = []

  return {
    errors,
    endUser: {
      id: "test",
      name: "test",
      profile_image_url: "https://example.com/profile/test",
    },
  }
}

export { fetchEndAllUsers, fetchEndUserById, registerEndUserResolver }
