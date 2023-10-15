import { sql } from "drizzle-orm"
import { sqliteTable, text, real, index } from "drizzle-orm/sqlite-core"

const users = sqliteTable("users", {
  id: text("id").notNull().primaryKey(),
  name: text("name").notNull(),
  profileImageUrl: text("profile_image_url"),
  createdAt: text("_created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("_updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
})

const bodyTemperatures = sqliteTable(
  "body_temperatures",
  {
    id: text("id").notNull().primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id),
    temperatureDegreeCelsius: real("temperature_degree_celsius").notNull(),
    measuredAt: text("measured_at").notNull(),
    createdAt: text("_created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
    updatedAt: text("_updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => {
    return {
      measuredAtIndex: index("measured_at_index").on(table.userId, table.measuredAt),
    }
  },
)

type User = typeof users.$inferSelect
type InsertUser = typeof users.$inferInsert

type BodyTemperatures = typeof bodyTemperatures.$inferSelect
type InsertBodyTemperatures = typeof bodyTemperatures.$inferInsert

export type { User, InsertUser, BodyTemperatures, InsertBodyTemperatures }

export { users, bodyTemperatures }
