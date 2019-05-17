import React, {Component} from "react";
import PubNubReact from 'pubnub-react';
import styled from 'styled-components';

import Averager from '../utils/averager';
import {parse} from '../utils/parser';

import Panel from './Panel';

const THE_MAP = [...Array(11).keys()].map(index => ({group: `group_${index}`, averager: new Averager(10)}));

const Container = styled.div`
  font-family: 'Source Sans Pro', sans-serif;
  
  width: 1000px;
  margin: 20px auto;
`;

class AppContainer extends Component {
  constructor(props) {
    super(props);
    this.pubnub = new PubNubReact({ subscribeKey: 'sub-c-5f1b7c8e-fbee-11e3-aa40-02ee2ddab7fe' });
    this.pubnub.init(this);
  }

  componentWillMount() {
    this.pubnub.subscribe({ channels: ['pubnub-sensor-network'] });
    this.pubnub.getMessage('pubnub-sensor-network', 1);
  }

  componentWillUnmount() {
    this.pubnub.unsubscribe({ channels: ['pubnub-sensor-network'] });
  }

  render() {
    const message = this.pubnub.getMessage('pubnub-sensor-network');
    if(message.length === 0) return null;

    const parsed = parse(message[0].message);
    THE_MAP.find(x => x.group === parsed.groupName).averager.put(parsed.readings);

    return <Container>
      {THE_MAP.map(value => {
        return <Panel key={value.group} {...value.averager.average()} />
      })}
    </Container>
  }
}

export default AppContainer;
