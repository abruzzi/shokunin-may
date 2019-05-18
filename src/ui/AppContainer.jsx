import React, {Component} from "react";
import PubNubReact from 'pubnub-react';

import { Modal, Button } from 'antd';

import { Card, Col, Row } from 'antd';
import Panel from './Panel';

import { Map, TileLayer, Circle } from 'react-leaflet';

import {parse} from '../utils/parser';
import groupMap from '../utils/group';

import {SUB_KEY, CHANNEL, BATCH_FETCH} from "../constants";

class AppContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { visible: false };

    this.pubnub = new PubNubReact({ subscribeKey: SUB_KEY });
    this.pubnub.init(this);

    this.showModal = this.showModal.bind(this);
  }

  componentWillMount() {
    this.pubnub.subscribe({ channels: [CHANNEL] });
    this.pubnub.getMessage(CHANNEL, BATCH_FETCH);
  }

  componentWillUnmount() {
    this.pubnub.unsubscribe({ channels: [CHANNEL] });
  }

  showModal () {
    this.setState({
      visible: true,
    });
  };

  render() {
    const messages = this.pubnub.getMessage(CHANNEL);
    if(messages.length === 0) return null;

    const parsed = messages.map(m => parse(m.message));

    parsed.forEach(group => {
      groupMap[group.groupName].averager.put(group.readings);
      groupMap[group.groupName].data = group;

      groupMap['group_total'].averager.put(group.readings);
      groupMap['group_total'].data = group;
    });

    const position = [-24.00, 132.00];

    return <div style={{position: 'relative'}}>
      <Button style={{position: 'absolute', top: '20px', right: '20px', zIndex: '1000'}} onClick={() => this.showModal()}>View details</Button>
      <Map center={position} zoom={4}>
        <TileLayer
          url="http://tile.stamen.com/toner/{z}/{x}/{y}.png"
        />
        {
          Object.values(groupMap).filter(g => g.data.location).map(value => {
            const position = [value.data.location.latitude, value.data.location.longitude];
            return (<Circle center={position} color="rgba(255, 111, 89, 1)" fillColor="rgba(255, 111, 89, 1)" radius={200} />)
          })
        }
      </Map>

      <Modal
        title="Details"
        visible={this.state.visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        style={{zIndex: '1001'}}
        width={1024}
      >
        <Row gutter={16}>

          {Object.values(groupMap).map(value => {
            return (<Col span={6} key={value.name} style={{padding: '8px'}}>
              <Card title={value.name.toUpperCase()} bordered>
                <Panel group={value.name} {...value.averager.average()} />
              </Card>
            </Col>);
          })}

        </Row>
      </Modal>
    </div>
  }
}

export default AppContainer;
