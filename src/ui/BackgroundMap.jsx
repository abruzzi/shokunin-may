import React from 'react';
import {Map, CircleMarker, Popup, TileLayer} from "react-leaflet";
import {Card} from "antd";

import ChartSection from "./ChartSection";

import {CENTER} from "../constants";
import {createRealTimeChart} from "../utils/chart";

const BackgroundMap = ({groups = {}}) => (
  <Map center={CENTER} zoom={4}>
    <TileLayer
      url="http://tile.stamen.com/toner/{z}/{x}/{y}.png"
    />
    {
      Object.values(groups).filter(g => g.data.location).map(value => {
        const position = [value.data.location.latitude, value.data.location.longitude];
        return (<CircleMarker key={value.name} center={position} color="rgba(255, 111, 89, 1)" fillColor="rgba(255, 111, 89, 1)" radius={8}>
          <Popup>
            <Card title={value.data.displayName} bordered={false}>
              <ChartSection createRealTimeChart={createRealTimeChart} group={`m-${value.name}`} {...value.averager.average()} />
            </Card>
          </Popup>
        </CircleMarker>)
      })
    }
  </Map>
);

export default BackgroundMap;