import RoundRobinArchive from './RoundRobinArchive';

describe('RoundRobinArchive', () => {
  it('calculate average for 1 reading', () => {
    const rra = new RoundRobinArchive(2);
    rra.put({
      temperature: 2,
      humidity: 2,
      light: 2,
      radiation: 2
    });

    const result = rra.average();
    
    expect(result).toEqual({
      temperature: 2,
      humidity: 2,
      light: 2,
      radiation: 2
    });
  });

  it('calculate average for 2 numbers', () => {
    const rra = new RoundRobinArchive(2);
    
    rra.put({
      temperature: 2,
      humidity: 2,
      light: 2,
      radiation: 2
    });
    
    rra.put({
      temperature: 4,
      humidity: 4,
      light: 4,
      radiation: 4
    });
    
    const result = rra.average();
    
    expect(result).toEqual({
      temperature: 3,
      humidity: 3,
      light: 3,
      radiation: 3
    });
  });

  it('calculate rolling average', () => {
    const rra = new RoundRobinArchive(2);
    
    rra.put({
      temperature: 2,
      humidity: 2,
      light: 2,
      radiation: 2
    });

    rra.put({
      temperature: 4,
      humidity: 4,
      light: 4,
      radiation: 4
    });

    rra.put({
      temperature: 4,
      humidity: 4,
      light: 4,
      radiation: 4
    });
    
    const result = rra.average();

    expect(result).toEqual({
      temperature: 4,
      humidity: 4,
      light: 4,
      radiation: 4
    });
  });
})