import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  
`;

Container.displayName = 'Container';

const Panel = ({ 
    temperature = 0,
    humidity = 0,
    light = 0,
    radiation = 0
}) => (<div>
    <p>
      <span className="temperature">{temperature}</span>
      <span className="humidity">{humidity}</span>
      <span className="light">{light}</span>
      <span className="radiation">{radiation}</span>
    </p>
</div>);

export default Panel;