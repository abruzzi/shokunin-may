import React, {Component} from "react";
import PubNubReact from 'pubnub-react';

import { Card, Col, Row } from 'antd';
import Panel from './Panel';

import {parse} from '../utils/parser';
import groupMap from '../utils/group';

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

    const parsed = messages.map(m => parse(m.message));

    parsed.forEach(group => {
      groupMap[group.groupName].averager.put(group.readings);
      groupMap['group_total'].averager.put(group.readings);
    });

    return <div>
      <Row gutter={16}>

      {Object.values(groupMap).map(value => {
        return (<Col span={6} key={value.name} style={{padding: '8px'}}>
          <Card title={value.name.toUpperCase()} bordered>
            <Panel group={value.name} {...value.averager.average()} />
          </Card>
        </Col>);
      })}

      </Row>
    </div>
  }
}

export default AppContainer;
