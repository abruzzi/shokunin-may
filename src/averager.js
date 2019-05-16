class Averager {
  constructor(size = 1) {
    this.size = size;
    this.data = [];
  }

  put (value) {
    this.data.push(Number(value))
  } 

  average () {
    const sum = this.data.reduce((previous, current) => current += previous)
    return sum / this.data.length;
  }
}

export default Averager;