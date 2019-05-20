import React, {Component} from "react";
import PubNubReact from 'pubnub-react';
import {Button, Drawer} from 'antd';

import BackgroundMap from "./BackgroundMap";
import Sidebar from "./Sidebar";

import {convert} from "../utils/message";

import {BATCH_FETCH, CHANNEL, SUB_KEY} from "../constants";
import './AppContainer.css';

class AppContainer extends Component {
  state = {
    visible: false
  }

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

  showDrawer = () => {
    this.setState({visible: true});
  };

  closeDrawer = () => {
    this.setState({visible: false})
  };

  render() {
    const messages = this.pubnub.getMessage(CHANNEL);
    if(messages.length === 0) return null;

    const groupMap = convert(messages);

    return <div className='main-container'>
      <div className="view-detail-button">
        <Button ghost onClick={() => this.showDrawer()}>List View</Button>
      </div>

      <BackgroundMap groups={groupMap}/>

      <Drawer
        visible={this.state.visible}
        width={360}
        closable={false}
        onClose={this.closeDrawer}
      >
        <Sidebar groups={groupMap}/>
      </Drawer>
    </div>
  }
}

export default AppContainer;
