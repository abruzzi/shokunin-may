import _ from "lodash";
import { SENSOR_TYPES } from "./constants";

const fields = SENSOR_TYPES.map(f => f.toLowerCase());

class RoundRobinArchive {
  constructor(size = 1) {
    this.size = size;
    this.data = [];
  }

  put(value) {
    if (this.data.length === this.size) {
      this.data.shift();
    }
    this.data.push(value);
  }

  average() {
    return fields.reduce(
      (previous, current) => ({
        ...previous,
        [current]: _.sumBy(this.data, current) / this.data.length
      }),
      { temperature: 0, humidity: 0, light: 0, radiation: 0 }
    );
  }
}

export default RoundRobinArchive;
