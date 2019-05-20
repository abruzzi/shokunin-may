import {Icon} from "antd";
import React from "react";

export const SENSOR_TYPES = {
  Temperature: 'Temperature',
  Humidity: 'Humidity',
  Light: 'Light',
  Radiation: 'Radiation'
};

export const COLORS = {
  Temperature: 'rgba(164, 147, 191, 1)',
  Humidity: 'rgba(234, 196, 53, 1)',
  Light: 'rgba(0, 179, 206, 1)',
  Radiation: 'rgba(255, 111, 89, 1)'
};

export const MARKER_COLOR = "#71F04A";
export const MARKER_RADIUS = 8;
export const MAP_TILE_SERVICE = "http://tile.stamen.com/toner/{z}/{x}/{y}.png";

export const SENSORS_ICON_MAP = {
  Temperature: <Icon type="dashboard" style={{color: COLORS[SENSOR_TYPES.Temperature]}} />,
  Humidity: <Icon type="cloud" style={{color: COLORS[SENSOR_TYPES.Humidity]}} />,
  Light: <Icon type="bulb" style={{color: COLORS[SENSOR_TYPES.Light]}} />,
  Radiation: <Icon type="alert" style={{color: COLORS[SENSOR_TYPES.Radiation]}}/>
};

export const SUB_KEY = 'sub-c-5f1b7c8e-fbee-11e3-aa40-02ee2ddab7fe';
export const CHANNEL = 'pubnub-sensor-network';
export const BATCH_FETCH = 20;

export const CENTER = [-24.00, 132.00];

export const ROLLING_WINDOW_SIZE = 10;