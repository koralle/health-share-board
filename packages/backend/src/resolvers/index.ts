import { GraphQLContext } from "../context"
import { hello } from "./features/hello"
import { fetchEndAllUsers } from "./features/users"

const rootResolver = (ctx?: GraphQLContext) => {
  return {
    hello: hello(),
    fetchAllEndUsers: fetchEndAllUsers(ctx)
  }
}

export { rootResolver }
