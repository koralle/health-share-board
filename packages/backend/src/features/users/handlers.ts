import { Context, Handler } from "hono";
import { inMemoryUserRepository } from "../../repositories/users";
import { ID } from "shared/src/value-objects/id";
import { UserEntity } from "shared/src/domains/user";
import { UserName } from "shared/src/value-objects/user-name";
import { D1Database } from "@cloudflare/workers-types";

const userSaveHandlers = async (c: Context<{ Bindings: {DB: D1Database}}>): Promise<Response> => {

  const data = await c.req.json()

  try {
    await c.env.DB
      .prepare("INSERT INTO users (id, name, profile_image_url) VALUES (?, ?, ?)")
      .bind(data.id, data.name, data.profile_image_url)
      .run()
  } catch(e: unknown) {
    console.error(e)
  }

  return c.json({ message: "Success" })
}

const userFindHandlers = async (c: Context<{ Bindings: { DB: D1Database }}>): Promise<Response> =>  {

  const id = c.req.query("id")

  if(!id) {
    return c.text("Not found")
  }

  try {
    const user = await c.env.DB.prepare("SELECT * FROM users WHERE id = ?").bind(id).first()
    console.log(user)

    return c.text("User found!")
  } catch {
    return c.text("User not found")
  }

  // const requestUserId = ID.create(id)

  // if(!requestUserId) {
  //   return c.text("Not found")
  // }

  // const userRepository = inMemoryUserRepository
  // const user = await userRepository.findById(requestUserId)

  // return c.json({ user })
}
export { userSaveHandlers, userFindHandlers }
