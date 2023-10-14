import { D1Database } from "@cloudflare/workers-types";
import { Context } from "hono";



const bodyTemperatureSaveHandlers = async (c: Context<{ Bindings: { DB: D1Database }}>): Promise<Response> => {
  const data = await c.req.json()

  try {
    await c.env.DB
      .prepare("INSERT INTO body_temperatures (id, user_id, temperature_degree_celsius, measured_at) VALUES (?, ?, ?, ?)")
      .bind(data.id, data.user_id, data.temperature_degree_celsius, data.measured_at)
      .run()
    return c.json({ message: "Success"})
  } catch (e: unknown) {
    console.error(e)

    return c.json({ message: "Failed"})
  }
}

const bodyTemperatureFindByUserIdHandlers = async (c: Context<{ Bindings: { DB: D1Database } }>): Promise<Response> => {
  const userId = await c.req.query("user_id")

  try {
    const { results } = await c.env.DB
      .prepare("SELECT * FROM body_temperatures WHERE user_id = ?")
      .bind(userId)
      .all()

    return c.json(results)
  } catch {
    return c.text("Not found.")
  }
}

export { bodyTemperatureSaveHandlers, bodyTemperatureFindByUserIdHandlers }
