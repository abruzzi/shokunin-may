import React, {Component} from "react";
import PubNubReact from 'pubnub-react';

import { Drawer, Button } from 'antd';

import { Card, Col, Row } from 'antd';
import Panel from './Panel';

import { Map, TileLayer, CircleMarker, Popup } from 'react-leaflet';

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
    this.closeModal = this.closeModal.bind(this);
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

  closeModal () {
    this.setState({
      visible: false
    })
  }

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
      <Button ghost style={{position: 'absolute', top: '20px', right: '20px', zIndex: '1000'}} onClick={() => this.showModal()}>List View</Button>
      <Map center={position} zoom={4}>
        <TileLayer
          url="http://tile.stamen.com/toner/{z}/{x}/{y}.png"
        />
        {
          Object.values(groupMap).filter(g => g.data.location).map(value => {
            const position = [value.data.location.latitude, value.data.location.longitude];
            return (<CircleMarker center={position} color="rgba(255, 111, 89, 1)" fillColor="rgba(255, 111, 89, 1)" radius={8}>
              <Popup>
                <Card title={value.name.toUpperCase()} bordered>
                  <Panel group={value.name} {...value.averager.average()} />
                </Card>
              </Popup>
            </CircleMarker>)
          })
        }
      </Map>

      <Drawer
        visible={this.state.visible}
        style={{zIndex: '1001'}}
        width={360}
        closable={false}
        onClose={this.closeModal}
      >
        <Row gutter={16}>

          {Object.values(groupMap).map(value => {
            return (<Col span={24} key={value.name} style={{padding: '8px'}}>
              <Card title={value.name.toUpperCase()} bordered>
                <Panel group={value.name} {...value.averager.average()} />
              </Card>
            </Col>);
          })}

        </Row>
      </Drawer>
    </div>
  }
}

export default AppContainer;
