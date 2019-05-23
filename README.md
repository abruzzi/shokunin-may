# Shokunin May - Real-Time Sensor Data Visualization

[![Build Status](https://travis-ci.org/abruzzi/shokunin-may.svg?branch=master)](https://travis-ci.org/abruzzi/shokunin-may)

[Live Demo](https://shokunin-may.juntao.now.sh/) can be found here.

To setup, you need to install all the dependencies first:

```sh
npm install
```

After all packages are installed, launch a dev server by:

```sh
npm run dev
```

Then on page `http://localhost:1234`, you would see something like this if everything goes well.

![Map with popup](/screenshots/map-with-pupup.png)

And if you click the button on top-right corner, you would see a Drawer shows up as:

![Map with drawer](/screenshots/map-with-drawer.png)

## Tech stack

Runtime dependencies:

- React - UI rendering
- [Antd](https://ant.design/) - UI grid system (24 columns grid)
- [React-Leaflet](https://github.com/PaulLeCam/react-leaflet) - the background map
- [Rickshaw](https://github.com/shutterstock/rickshaw) - real time charting
- [PubNab](https://github.com/pubnub/react) - pub-and-sub to [pubnab](https://www.pubnub.com/) real time data

Development dependencies:

- Parcel - build and run
- jest - unit tests

## References

- [RRDTool](https://en.wikipedia.org/wiki/RRDtool)
- [Moving Average](https://en.wikipedia.org/wiki/Moving_average)
- [Visualize your real-time data](https://itnext.io/visualize-your-real-time-data-c8f17fe65dde) That's right, it was me

## Issue found

Rickshaw is using some reserved variables like `$super` that `uglify` doesn't like, so when
I build the package and minify it then some errors occurred. I have to fallback to un-minified for now.