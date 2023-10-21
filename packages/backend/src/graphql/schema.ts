import { GraphQLContext } from "@/context"
import { users } from "@/schema"
import { drizzle } from "drizzle-orm/d1"
import {
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLInterfaceType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from "graphql"
import type { GraphQLFieldResolver } from "graphql"
import { EndUserError } from "shared/src/utils/errors"

type User = {
  id: string
  name: string
  profileImageUrl?: string | null
}

const NodeInterface = new GraphQLInterfaceType({
  name: "Node",
  fields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
})

const AppErrorInterface = new GraphQLInterfaceType({
  name: "AppError",
  fields: {
    message: { type: new GraphQLNonNull(GraphQLString) },
    field: { type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLString))) },
  },
})

const EndUserErrorType = new GraphQLObjectType({
  name: "EndUserError",
  interfaces: [AppErrorInterface],
  fields: {
    message: { type: new GraphQLNonNull(GraphQLString) },
    field: { type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLString))) },
  },
})

const UserType = new GraphQLObjectType<User>({
  name: "EndUser",
  interfaces: [NodeInterface],
  fields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    profile_image_url: { type: GraphQLString },
  },
})

const FetchAllEndUsersPayload = new GraphQLObjectType({
  name: "FetchAllEndUsersPayload",
  fields: {
    errors: { type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(EndUserErrorType))) },
    endUsers: { type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(UserType))) },
  },
})

type BaseInput<T extends {} = {}> = {
  input: T
}

type RegisterEndUserInput = BaseInput<{ id: string, name: string, profileImageUrl: string | null }>

type RegisterEndUserPayload = Promise<{
  errors: EndUserError[]
  endUser: User
}>

const RegisterEndUserInput = new GraphQLInputObjectType({
  name: "RegisterEndUserInput",
  fields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    profileImageUrl: { type: GraphQLString },
  },
})

const RegisterEndUserPayload = new GraphQLObjectType({
  name: "RegisterEndUserPayload",
  fields: {
    errors: { type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(EndUserErrorType))) },
    endUser: { type: UserType },
  },
})

const registerEndUserResolver: GraphQLFieldResolver<GraphQLContext, {}, RegisterEndUserInput, RegisterEndUserPayload> =
  async (ctx, { input }, {}, info) => {
    console.log(input)
    const db = drizzle(ctx!.env.DB)

    let user: User | null = null
    const errors: EndUserError[] = []

    try {
      const result = await db
        .insert(users)
        .values({ id: input.id, name: input.name })
        .returning({ id: users.id, name: users.name, profileImageUrl: users.profileImageUrl })
      user = result.find((user) => user.id === input.id)!
    } catch (e) {
      if (e instanceof Error) {
        errors.push()
      }
    }

    return {
      errors,
      endUser: {
        id: user?.id ?? "test",
        name: user?.name ?? "test",
        profile_image_url: user?.profileImageUrl ?? null,
      },
    }
  }

const schema = new GraphQLSchema({
  query: new GraphQLObjectType<GraphQLContext, {}>({
    name: "Query",
    fields: {
      hello: {
        type: GraphQLString,
        args: {
          name: { type: GraphQLString },
        },
        resolve: async (root, { name }: { name: string }) => {
          return `hello, ${name}`
        },
      },
      fetchAllEndUsers: {
        type: FetchAllEndUsersPayload,
        args: {
          input: { type: RegisterEndUserInput },
        },
        resolve: async (ctx, {}) => {
          const db = drizzle(ctx!.env.DB)

          let endUsers: User[] = []
          const errors: EndUserError[] = []

          try {
            const result = await db
              .select({
                id: users.id,
                name: users.name,
                profileImageUrl: users.profileImageUrl,
              })
              .from(users)
              .all()
            endUsers = [...result]
          } catch (e) {
            if (e instanceof Error) {
              errors.push()
            }
          }

          return {
            errors,
            endUsers,
          }
        },
      },
    },
  }),
  mutation: new GraphQLObjectType<GraphQLContext, {}>({
    name: "Mutation",
    fields: {
      registerEndUser: {
        type: RegisterEndUserPayload,
        args: {
          input: { type: RegisterEndUserInput },
        },
        resolve: registerEndUserResolver,
      },
    },
  }),
})

export { schema }
