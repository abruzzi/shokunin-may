import React from "react";
import ReactDOM from "react-dom";
import AppContainer from './ui/AppContainer';

import 'antd/dist/antd.css';
import 'rickshaw/rickshaw.min.css'
import 'react-leaflet'

const root = document.getElementById("app");
ReactDOM.render(<AppContainer />, root);