import { GraphQLContext } from "@/context"
import { hello } from "@/resolvers/features/hello"
import { fetchEndAllUsers } from "@/resolvers/features/users"

const rootResolver = (ctx?: GraphQLContext) => {
  return {
    hello: hello(),
    fetchAllEndUsers: fetchEndAllUsers(ctx),
  }
}

export { rootResolver }
