import { ID } from "../value-objects/id"
import { TemperatureDegreeCelsius } from "../value-objects/temperature-degree-celsius"

type BodyTemperatureEntity = {
  id: ID
  userId: ID
  temperatureDegreeCelsius: TemperatureDegreeCelsius
  measuredAt: string
}

export type { BodyTemperatureEntity }
