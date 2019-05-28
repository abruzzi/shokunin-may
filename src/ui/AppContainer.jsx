import React, {Component} from "react";
import {Button, Drawer} from 'antd';

import BackgroundMap from "./BackgroundMap";
import Sidebar from "./Sidebar";
import SummaryPanel from './SummaryPanel'

import {convertRawDataForRendering} from "../data/message";

import {BATCH_FETCH, CHANNEL} from "../constants";
import './AppContainer.css';

class AppContainer extends Component {
  state = {
    visible: false
  }

  constructor(props) {
    super(props);
    this.pubnub = props.initPubNub(this);
  }

  componentWillMount() {
    this.pubnub.subscribe({ channels: [CHANNEL] });
    this.pubnub.getMessage(CHANNEL, BATCH_FETCH);
  }

  componentWillUnmount() {
    this.pubnub.unsubscribe({ channels: [CHANNEL] });
  }

  showDrawer = () => {
    this.setState({visible: true});
  };

  closeDrawer = () => {
    this.setState({visible: false})
  };

  render() {
    const messages = this.pubnub.getMessage(CHANNEL);
    if(messages.length === 0) return null;

    const groups = convertRawDataForRendering(messages);

    return <div className='main-container'>
      <div className="view-detail-button">
        <Button ghost onClick={() => this.showDrawer()}>List View</Button>
      </div>

      <BackgroundMap groups={groups}/>

      <Drawer
        visible={this.state.visible}
        width={360}
        closable={false}
        onClose={this.closeDrawer}
      >
        <Sidebar groups={groups}/>
      </Drawer>

      <SummaryPanel summary={groups['group_total']} />
    </div>
  }
}

export default AppContainer;
