import { ID } from "@/value-objects/id"

type CreateEntityPayload<T extends Entity, E extends Error = Error> = [T, null] | [null, E]

abstract class Entity<TSymbol extends string = string> {
  readonly [opaqueSymbol: symbol]: TSymbol
  readonly id: ID

  protected constructor(protected readonly _id: ID) {
    this.id = _id
  }

  abstract isIdentical(other: Entity<TSymbol>): boolean
  abstract isEqual(other: Entity<TSymbol>): boolean
}

export { Entity }
export type { CreateEntityPayload }
