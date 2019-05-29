import React, { Component } from "react";

import BackgroundMap from "./BackgroundMap";
import Sidebar from "./Sidebar";
import SummaryPanel from "./SummaryPanel";

import { convertRawDataForRendering } from "../data/parser";

import { BATCH_FETCH, CHANNEL } from "./constants";

import "./AppContainer.css";

class AppContainer extends Component {
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

  render() {
    const messages = this.pubnub.getMessage(CHANNEL);

    if (messages.length === 0) return null;

    const groups = convertRawDataForRendering(messages);

    return (
      <div className="main-container">
        <BackgroundMap groups={groups} />
        <Sidebar groups={groups} />
        <SummaryPanel summary={groups["group_total"]} />
      </div>
    );
  }
}

export default AppContainer;
