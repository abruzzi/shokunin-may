# Shokunin May

Install all the dependencies

```sh
npm install
```

And launch a dev server locally on port 1234

```sh
npm run dev
```

On page `localhost:1234`, you would see something like this if everything goes well.

![Map with popup](/screenshots/map-with-pupup.png)

And if you click the button on top-right corner, you would see a Drawer shows up as:

![Map with drawer](/screenshots/map-with-drawer.png)

## Tech stack

Runtime dependencies:

- React - UI rendering
- Antd - UI grid system (24 columns grid)
- Leaflet - the background map
- Rickshaw - real time charting
- PubNab - pub-and-sub to pubnab real time data

Development dependencies:

- Parcel - build and run
- jest - unit tests
