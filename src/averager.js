class Averager {
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
      photo: previous.photo + current.photo,
      radiation: previous.radiation + current.radiation
    }));
  
    return {
      temperature: sum.temperature / this.data.length,
      humidity: sum.humidity / this.data.length,
      photo: sum.photo / this.data.length,
      radiation: sum.radiation / this.data.length
    }
  }
}

export default Averager;