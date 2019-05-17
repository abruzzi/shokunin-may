import {Icon} from "antd";
import React from "react";

export const Types = {
  Temperature: 'Temperature',
  Humidity: 'Humidity',
  Light: 'Light',
  Radiation: 'Radiation'
};

export const Colors = {
  Temperature: 'rgba(48, 197, 255, 1)',
  Humidity: 'rgba(0, 0, 0, 0.65)',
  Light: 'rgba(0, 167, 225, 1)',
  Radiation: 'rgba(248, 51, 60, 1)'
};

export const Sensors = {
  Temperature: <Icon type="dashboard" style={{color: Colors[Types.Temperature]}} />,
  Humidity: <Icon type="cloud" style={{color: Colors[Types.Humidity]}} />,
  Light: <Icon type="bulb" style={{color: Colors[Types.Light]}} />,
  Radiation: <Icon type="alert" style={{color: Colors[Types.Radiation]}}/>
};
