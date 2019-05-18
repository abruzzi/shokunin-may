import React, {Component} from "react";
import PubNubReact from 'pubnub-react';

import { Card, Col, Row } from 'antd';

import Averager from '../utils/averager';
import {parse} from '../utils/parser';

import Panel from './Panel';

const THE_MAP = [...Array(11).keys()].map(index => ({group: `group_${index}`, averager: new Averager(10), data: {}}));

const THE_TOTAL = {group: 'group_total', averager: new Averager(10), data: {}};

THE_MAP.push(THE_TOTAL);

import {SUB_KEY, CHANNEL, BATCH_FETCH} from "../constants";

class AppContainer extends Component {
  constructor(props) {
    super(props);
    this.pubnub = new PubNubReact({ subscribeKey: SUB_KEY });
    this.pubnub.init(this);
  }

  componentWillMount() {
    this.pubnub.subscribe({ channels: [CHANNEL] });
    this.pubnub.getMessage(CHANNEL, BATCH_FETCH);
  }

  componentWillUnmount() {
    this.pubnub.unsubscribe({ channels: [CHANNEL] });
  }

  render() {
    const messages = this.pubnub.getMessage(CHANNEL);
    if(messages.length === 0) return null;

    messages.forEach(message => {
      const parsed = parse(message.message);

      const group = THE_MAP.find(current => current.group === parsed.groupName);
      const total = THE_MAP.find(current => current.group === 'group_total');

      if(group) {
        group.averager.put(parsed.readings);
        group.data = parsed;

        total.averager.put(parsed.readings);
        total.data = parsed;
      }
    });

    return <div>
      <Row gutter={16}>

      {THE_MAP.map(value => {
        return (<Col span={6} key={value.group} style={{padding: '8px'}}>
          <Card title={value.group.toUpperCase()} bordered>
            <Panel group={value.group} {...value.averager.average()} />
          </Card>
        </Col>);
      })}

      </Row>
    </div>
  }
}

export default AppContainer;
