import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  .figure {
    flex: 1;
    padding: 10px;
    margin: 10px;
  }
`;

Container.displayName = 'Container';

const format = (figure) => isNaN(Number(figure)) ? '-' : Number(figure).toFixed(2);
const Panel = ({ 
    temperature = 0,
    humidity = 0,
    light = 0,
    radiation = 0
}) => (<Container>
      <div className="figure temperature">Temperature: {format(temperature)}</div>
      <div className="figure humidity">Humidity: {format(humidity)}</div>
      <div className="figure light">Light: {format(light)}</div>
      <div className="figure radiation">Radiation: {format(radiation)}</div>
</Container>);

export default Panel;