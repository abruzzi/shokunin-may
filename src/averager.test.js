import Averager from './averager';

describe('averager', () => {
  it('calculate average for 1 number', () => {
    const averager = new Averager(2);
    averager.put(2);
    const result = averager.average();
    expect(result).toEqual(2);
  });

  it('calculate average for 2 numbers', () => {
    const averager = new Averager(2);
    averager.put(2);
    averager.put(4);
    const result = averager.average();
    expect(result).toEqual(3);
  });

  it('calculate rolling average', () => {
    const averager = new Averager(2);
    averager.put(2);
    averager.put(4);
    averager.put(4);
    const result = averager.average();
    expect(result).toEqual(4);
  });
})