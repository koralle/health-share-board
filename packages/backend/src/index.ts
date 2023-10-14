import { Hono } from "hono"
import { userFindHandlers, userSaveHandlers } from "./features/users/handlers"
import { D1Database } from "@cloudflare/workers-types"
import { bodyTemperatureFindByUserIdHandlers, bodyTemperatureSaveHandlers } from "./features/body_temperatures/handlers"

type Bindings = {
  DB: D1Database
}

const app = new Hono<{ Bindings: Bindings }>()

app.get("/", (c) => c.text("Hello Cloudflare Workers!"))
app.post("/users", userSaveHandlers)
app.get("/users", userFindHandlers)
app.post("/body_temperatures", bodyTemperatureSaveHandlers)
app.get("/body_temperatures", bodyTemperatureFindByUserIdHandlers)

export default app
