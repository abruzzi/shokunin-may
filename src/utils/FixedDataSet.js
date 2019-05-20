class FixedDataSet {
  constructor(size = 1) {
    this.size = size;
    this.data = [];
  }

  put (value) {
    if(this.data.length === this.size) {
      this.data.shift();
    }
    this.data.push(value)
  } 

  average () {
    const sum = this.data.reduce((previous, current) => ({
      temperature: previous.temperature + current.temperature,
      humidity: previous.humidity + current.humidity,
      light: previous.light + current.light,
      radiation: previous.radiation + current.radiation
    }), {temperature: 0, humidity: 0, light: 0, radiation: 0});
  
    return {
      temperature: sum.temperature / this.data.length,
      humidity: sum.humidity / this.data.length,
      light: sum.light / this.data.length,
      radiation: sum.radiation / this.data.length
    }
  }
}

export default FixedDataSet;