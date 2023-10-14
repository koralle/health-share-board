import { GraphQLContext } from "../context"
import { hello } from "./features/hello"

const rootResolver = (ctx?: GraphQLContext) => {
  return {
    hello: hello(),
  }
}

export { rootResolver }
