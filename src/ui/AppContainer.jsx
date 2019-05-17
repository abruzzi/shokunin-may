import React, {Component} from "react";
import PubNubReact from 'pubnub-react';

import { Card, Col, Row } from 'antd';

import Averager from '../utils/averager';
import {parse} from '../utils/parser';

import Panel from './Panel';

const THE_MAP = [...Array(11).keys()].map(index => ({group: `group_${index}`, averager: new Averager(10), data: {}}));

class AppContainer extends Component {
  constructor(props) {
    super(props);
    this.pubnub = new PubNubReact({ subscribeKey: 'sub-c-5f1b7c8e-fbee-11e3-aa40-02ee2ddab7fe' });
    this.pubnub.init(this);
  }

  componentWillMount() {
    this.pubnub.subscribe({ channels: ['pubnub-sensor-network'] });
    this.pubnub.getMessage('pubnub-sensor-network', 10);
  }

  componentWillUnmount() {
    this.pubnub.unsubscribe({ channels: ['pubnub-sensor-network'] });
  }

  render() {
    const messages = this.pubnub.getMessage('pubnub-sensor-network');
    if(messages.length === 0) return null;

    messages.forEach(message => {
      const parsed = parse(message.message);
      const group = THE_MAP.find(current => current.group === parsed.groupName);
      if(group) {
        group.averager.put(parsed.readings);
        group.data = parsed;
      }
    });

    return <div>
      <Row gutter={16}>

      {THE_MAP.map(value => {
        return (<Col span={6} key={value.group}>
          <Card title={value.group.toUpperCase()} bordered={false}>
            <Panel {...value.averager.average()} />
          </Card>
        </Col>);
      })}

      </Row>
    </div>
  }
}

export default AppContainer;
