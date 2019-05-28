import { Icon } from "antd";
import React from "react";

export const SENSOR_TYPES = ["Temperature", "Humidity", "Light", "Radiation"];

export const COLORS = {
  Temperature: "rgba(164, 147, 191, 1)",
  Humidity: "rgba(234, 196, 53, 1)",
  Light: "rgba(0, 179, 206, 1)",
  Radiation: "rgba(255, 111, 89, 1)"
};

export const MARKER_COLOR = "#6AB14B";
export const MARKER_RADIUS = 8;
export const MARKER_OPACITY = 0.6;

const MAP_BOX_TOKEN =
  "pk.eyJ1IjoianVudGFvIiwiYSI6ImNqdzIwNjZmeDBybjgzenFrNG95OGNnejgifQ.sFyDPo2-yPZZJbZdmFX7QA";
export const MAP_TILE_SERVICE = `https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token=${MAP_BOX_TOKEN}`;

export const SENSORS_ICON_MAP = {
  Temperature: <Icon type="dashboard" style={{ color: COLORS["Temperature"] }} />,
  Humidity: <Icon type="cloud" style={{ color: COLORS["Humidity"] }} />,
  Light: <Icon type="bulb" style={{ color: COLORS["Light"] }} />,
  Radiation: <Icon type="alert" style={{ color: COLORS["Radiation"] }} />
};

export const CHANNEL = "pubnub-sensor-network";
export const BATCH_FETCH = 20;

export const CENTER = [-24.0, 132.0];

export const DRAWER_WIDTH = 360;