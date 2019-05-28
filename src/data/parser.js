import _ from "lodash";

import config from "./sensor-group-location.json";
import RoundRobinArchive from "./RoundRobinArchive";

import { ROLLING_WINDOW_SIZE } from "./constants";

const parse = data => {
  const match = config.find(x =>
    new RegExp(x.sensor_uuid_starts_with).test(data.sensor_uuid)
  );

  return {
    groupName: match.group_name,
    displayName: match.display_name || "",
    timestamp: data.timestamp,
    location: {
      latitude: match.latitude,
      longitude: match.longitude
    },
    readings: {
      temperature: Number(data.ambient_temperature),
      humidity: Number(data.humidity),
      light: Number(data.photosensor),
      radiation: Number(data.radiation_level)
    }
  };
};

const groups = _.range(0, 11).reduce(
  (previous, current) => ({
    ...previous,
    [`group_${current}`]: {
      name: `group_${current}`,
      rra: new RoundRobinArchive(ROLLING_WINDOW_SIZE),
      data: {}
    }
  }),
  {}
);

const groupMap = {
  ...groups,
  group_total: {
    name: "group_total",
    rra: new RoundRobinArchive(ROLLING_WINDOW_SIZE),
    data: {}
  }
};

const convertRawDataForRendering = messages => {
  const parsed = messages.map(m => parse(m.message));

  parsed.forEach(group => {
    groupMap[group.groupName].rra.put(group.readings);
    groupMap[group.groupName].data = group;

    groupMap["group_total"].rra.put(group.readings);
    groupMap["group_total"].data = { ...group, displayName: "Total" };
  });

  return groupMap;
};

export { parse, convertRawDataForRendering };
