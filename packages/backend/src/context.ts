import { D1Database } from "@cloudflare/workers-types"
import { Context } from "hono"

type Bindings = {
  DB: D1Database
}

type GraphQLEndPointPath = "/graphql"

type GraphQLContextEnv = { Bindings: Bindings }

type GraphQLContext = Context<GraphQLContextEnv, GraphQLEndPointPath, {}>

export type { Bindings, GraphQLContextEnv, GraphQLContext }
