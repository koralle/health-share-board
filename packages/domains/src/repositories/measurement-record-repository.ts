import { MeasurementRecordEntity, MeasurementRecordError, UserEntity } from "@/entities"
import { ID } from "@/value-objects"

type MeasurementRecordRepository = {
  fetchAll(): [MeasurementRecordEntity[], MeasurementRecordError | null]
  findByUser(user: UserEntity): [MeasurementRecordEntity[], MeasurementRecordError | null]
  save(record: MeasurementRecordEntity): MeasurementRecordError | null
}

export { MeasurementRecordRepository }
