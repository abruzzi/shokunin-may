import {Icon} from "antd";
import React from "react";

export const Types = {
  Temperature: 'Temperature',
  Humidity: 'Humidity',
  Light: 'Light',
  Radiation: 'Radiation'
};

export const Colors = {
  Temperature: 'rgba(164, 147, 191, 1)',
  Humidity: 'rgba(234, 196, 53, 1)',
  Light: 'rgba(0, 179, 206, 1)',
  Radiation: 'rgba(255, 111, 89, 1)'
};

export const Sensors = {
  Temperature: <Icon type="dashboard" style={{color: Colors[Types.Temperature]}} />,
  Humidity: <Icon type="cloud" style={{color: Colors[Types.Humidity]}} />,
  Light: <Icon type="bulb" style={{color: Colors[Types.Light]}} />,
  Radiation: <Icon type="alert" style={{color: Colors[Types.Radiation]}}/>
};

export const SUB_KEY = 'sub-c-5f1b7c8e-fbee-11e3-aa40-02ee2ddab7fe';
export const CHANNEL = 'pubnub-sensor-network';
export const BATCH_FETCH = 20;