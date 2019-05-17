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

const figure = (type, value) => <div key={type} className={`figure ${type.toLowerCase()}`}>{type}: {format(value)}</div>

const Labels = [
  'Temperature',
  'Humidity',
  'Light',
  'Radiation'
];

const Panel = (props) => (<Container>
  {Labels.map(label => {
    return figure(label, props[label.toLowerCase()])
  })}
</Container>);

export default Panel;