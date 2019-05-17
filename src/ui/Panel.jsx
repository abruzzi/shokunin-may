import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  
`;

Container.displayName = 'Container';

const format = (figure) => isNaN(Number(figure)) ? '-' : Number(figure).toFixed(2);
const Panel = ({ 
    temperature = 0,
    humidity = 0,
    light = 0,
    radiation = 0
}) => (<Container>
    <p>
      <span className="temperature">Temperature: {format(temperature)}</span>
      <span className="humidity">Humidity: {format(humidity)}</span>
      <span className="light">Light: {format(light)}</span>
      <span className="radiation">Radiation: {format(radiation)}</span>
    </p>
</Container>);

export default Panel;