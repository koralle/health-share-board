import { GraphQLContext, GraphQLContextEnv } from "@/context"
import { RootResolver } from "@hono/graphql-server"

type AppRootResolver = RootResolver<GraphQLContextEnv, "/graphql", {}>

const rootResolver: AppRootResolver = (ctx?: GraphQLContext) => (ctx)

export { rootResolver }
