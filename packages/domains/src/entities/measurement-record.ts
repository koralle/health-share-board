import { CreateEntityPayload, Entity } from "@/entities/entity"
import { BodyTemperature } from "@/value-objects"
import { DateTime } from "@/value-objects"
import { ID } from "@/value-objects"

class MeasurementRecordError extends Error {
  constructor(readonly message: string) {
    super(message)
    this.name = "MeasurementRecordError"
  }
}

class MeasurementRecordEntity extends Entity<"MeasurementRecord"> {
  readonly bodyTemperature: BodyTemperature
  readonly userId: ID
  readonly measuredAt: DateTime

  constructor(
    protected readonly _id: ID,
    protected readonly _userId: ID,
    protected readonly _bodyTemperature: BodyTemperature,
    protected readonly _measuredAt: DateTime,
  ) {
    super(_id)
    this.userId = _userId
    this.bodyTemperature = _bodyTemperature
    this.measuredAt = _measuredAt
  }

  public isEqual(other: MeasurementRecordEntity): boolean {
    return this.id.isEqual(other.id) && this.bodyTemperature === other.bodyTemperature
  }

  public isIdentical(other: MeasurementRecordEntity): boolean {
    return this.id.isEqual(other.id)
  }

  static create(
    userId: string,
    bodyTemperature: number,
    measuredAt: string,
  ): CreateEntityPayload<MeasurementRecordEntity, MeasurementRecordError> {
    const [_id, idErr] = ID.create()
    if (idErr) {
      return [null, new MeasurementRecordError(idErr.message)]
    }

    const [_userId, userIdErr] = ID.createFromString(userId)
    if (userIdErr) {
      return [null, new MeasurementRecordError(userIdErr.message)]
    }

    const [_bodyTemperature, bodyTemperatureErr] = BodyTemperature.create(bodyTemperature)
    if (bodyTemperatureErr) {
      return [null, new MeasurementRecordError(bodyTemperatureErr.message)]
    }

    const [_measuredAt, measuredAtErr] = DateTime.create(measuredAt)
    if (measuredAtErr) {
      return [null, new MeasurementRecordError(measuredAtErr.message)]
    }

    return [new MeasurementRecordEntity(_id, _userId, _bodyTemperature, _measuredAt), null]
  }

  static createWithId(
    id: string,
    userId: string,
    bodyTemperature: number,
    measuredAt: string,
  ): CreateEntityPayload<MeasurementRecordEntity, MeasurementRecordError> {
    const [_id, idErr] = ID.createFromString(id)
    if (idErr) {
      return [null, new MeasurementRecordError(idErr.message)]
    }

    const [_userId, userIdErr] = ID.createFromString(userId)
    if (userIdErr) {
      return [null, new MeasurementRecordError(userIdErr.message)]
    }

    const [_bodyTemperature, bodyTemperatureErr] = BodyTemperature.create(bodyTemperature)
    if (bodyTemperatureErr) {
      return [null, new MeasurementRecordError(bodyTemperatureErr.message)]
    }

    const [_measuredAt, measuredAtErr] = DateTime.create(measuredAt)
    if (measuredAtErr) {
      return [null, new MeasurementRecordError(measuredAtErr.message)]
    }

    return [new MeasurementRecordEntity(_id, _userId, _bodyTemperature, _measuredAt), null]
  }
}

export { MeasurementRecordEntity, MeasurementRecordError }
