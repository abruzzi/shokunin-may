class Averager {
  constructor(size = 1) {
    this.size = size;
    this.data = [];
  }

  put (value) {
    if(this.data.length === this.size) {
      this.data.shift();
    }
    this.data.push(Number(value))
  } 

  average () {
    const sum = this.data.reduce((previous, current) => current += previous)
    return sum / this.data.length;
  }
}

export default Averager;