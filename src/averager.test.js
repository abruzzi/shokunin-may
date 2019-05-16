import Averager from './averager';

describe('averager', () => {
  it('calculate average for 1 reading', () => {
    const averager = new Averager(2);
    averager.put({
      temperature: 2,
      humidity: 2,
      photo: 2,
      radiation: 2
    });

    const result = averager.average();
    
    expect(result).toEqual({
      temperature: 2,
      humidity: 2,
      photo: 2,
      radiation: 2
    });
  });

  it('calculate average for 2 numbers', () => {
    const averager = new Averager(2);
    
    averager.put({
      temperature: 2,
      humidity: 2,
      photo: 2,
      radiation: 2
    });
    
    averager.put({
      temperature: 4,
      humidity: 4,
      photo: 4,
      radiation: 4
    });
    
    const result = averager.average();
    
    expect(result).toEqual({
      temperature: 3,
      humidity: 3,
      photo: 3,
      radiation: 3
    });
  });

  it('calculate rolling average', () => {
    const averager = new Averager(2);
    
    averager.put({
      temperature: 2,
      humidity: 2,
      photo: 2,
      radiation: 2
    });

    averager.put({
      temperature: 4,
      humidity: 4,
      photo: 4,
      radiation: 4
    });

    averager.put({
      temperature: 4,
      humidity: 4,
      photo: 4,
      radiation: 4
    });
    
    const result = averager.average();

    expect(result).toEqual({
      temperature: 4,
      humidity: 4,
      photo: 4,
      radiation: 4
    });
  });
})