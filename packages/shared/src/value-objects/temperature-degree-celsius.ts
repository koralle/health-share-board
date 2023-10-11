import { Opaque } from "type-fest"

type TemperatureDegreeCelsius = Opaque<number, "TemperatureDegreeCelsius">

const TemperatureDegreeCelsius = {
  create: (value: number): TemperatureDegreeCelsius | null => {
    if (value < 0) {
      return null
    }

    if (value > 100) {
      return null
    }
    return value as TemperatureDegreeCelsius
  },
}

export { TemperatureDegreeCelsius }
