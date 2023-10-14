import { Hono } from "hono"
import { graphqlServer } from "@hono/graphql-server"
import { schema } from "./graphql/schema"

import { GraphQLContextEnv, GraphQLContext } from "./context"
import { rootResolver } from "./resolvers"

const app = new Hono<GraphQLContextEnv>()

app.use(
  "/graphql",
  graphqlServer({
    schema,
    rootResolver,
  }),
)

app.fire()

app.get("/", (c) => c.text("Hello Cloudflare Workers!"))

export default app
