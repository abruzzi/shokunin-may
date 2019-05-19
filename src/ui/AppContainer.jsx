import React, {Component} from "react";
import PubNubReact from 'pubnub-react';

import { Drawer, Button } from 'antd';

import { Card, Col, Row } from 'antd';
import Panel from './Panel';

import { Map, TileLayer, CircleMarker, Popup } from 'react-leaflet';

import {parse} from '../utils/parser';
import groupMap from '../utils/group';

import {SUB_KEY, CHANNEL, BATCH_FETCH} from "../constants";

import './AppContainer.css';

class AppContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { visible: false };

    this.pubnub = new PubNubReact({ subscribeKey: SUB_KEY });
    this.pubnub.init(this);

    this.showDrawer = this.showDrawer.bind(this);
    this.closeDrawer = this.closeDrawer.bind(this);
  }

  componentWillMount() {
    this.pubnub.subscribe({ channels: [CHANNEL] });
    this.pubnub.getMessage(CHANNEL, BATCH_FETCH);
  }

  componentWillUnmount() {
    this.pubnub.unsubscribe({ channels: [CHANNEL] });
  }

  showDrawer () {
    this.setState({
      visible: true,
    });
  };

  closeDrawer () {
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
      groupMap['group_total'].data = {...group, displayName: 'Total'};
    });

    const position = [-24.00, 132.00];

    return <div className='main-container'>
      <div className="view-detail-button">
        <Button ghost onClick={() => this.showDrawer()}>List View</Button>
      </div>

      <Map center={position} zoom={4}>
        <TileLayer
          url="http://tile.stamen.com/toner/{z}/{x}/{y}.png"
        />
        {
          Object.values(groupMap).filter(g => g.data.location).map(value => {
            const position = [value.data.location.latitude, value.data.location.longitude];
            return (<CircleMarker key={value.name} center={position} color="rgba(255, 111, 89, 1)" fillColor="rgba(255, 111, 89, 1)" radius={8}>
              <Popup>
                <Card title={value.data.displayName} bordered={false}>
                  <Panel group={value.name} {...value.averager.average()} />
                </Card>
              </Popup>
            </CircleMarker>)
          })
        }
      </Map>

      <Drawer
        visible={this.state.visible}
        width={360}
        closable={false}
        onClose={this.closeDrawer}
      >
        <Row gutter={16}>

          {Object.values(groupMap).filter(g => g.data.location).map(value => {
            return (<Col span={24} key={value.name} style={{padding: '8px'}}>
              <Card title={value.data.displayName} bordered>
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
