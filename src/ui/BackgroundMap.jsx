import React from 'react';
import {Map, CircleMarker, Popup, TileLayer} from "react-leaflet";
import {Card} from "antd";

import ChartSection from "./ChartSection";

import {CENTER, MARKER_COLOR, MARKER_RADIUS, MAP_TILE_SERVICE} from "../constants";
import {createRealTimeChart} from "../utils/chart";

const BackgroundMap = ({groups = {}}) => (
  <Map center={CENTER} zoom={4}>
    <TileLayer url={MAP_TILE_SERVICE} />
    {
      Object.values(groups).filter(g => g.data.location).map(value => {
        const position = [value.data.location.latitude, value.data.location.longitude];
        return (<CircleMarker key={value.name} center={position} color={MARKER_COLOR} fillColor={MARKER_COLOR} radius={MARKER_RADIUS}>
          <Popup>
            <Card title={value.data.displayName} bordered={false}>
              <ChartSection createRealTimeChart={createRealTimeChart} group={`m-${value.name}`} {...value.rra.average()} />
            </Card>
          </Popup>
        </CircleMarker>)
      })
    }
  </Map>
);

export default BackgroundMap;