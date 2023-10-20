import { GraphQLContext, GraphQLContextEnv } from "@/context"
import { hello } from "@/resolvers/features/hello"
import { fetchEndAllUsers, fetchEndUserById, registerEndUserResolver } from "@/resolvers/features/users"
import { RootResolver } from "@hono/graphql-server"

type AppRootResolver = RootResolver<GraphQLContextEnv, "/graphql", {}>

const rootResolver: AppRootResolver = (ctx?: GraphQLContext) => (ctx)

export { rootResolver }
