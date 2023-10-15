import { buildSchema } from "graphql"

const schema = buildSchema(`
  interface Node {
    id: ID!
  }

  interface AppError {
    message: String!
    field: [String!]
  }

  type EndUserError implements AppError {
    message: String!
    field: [String!]
  }

  type Query {
    hello: String

    fetchAllEndUsers: FetchEndUsersPayload
    saveEndUser: EndUser
  }

  type EndUser implements Node {
    id: ID!
    name: String!
    profile_image_url: String
  }

  type FetchEndUsersPayload {
    errors: [EndUserError!]!
    endUsers: [EndUser!]!
  }
`)

export { schema }
