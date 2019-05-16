import config from './sensor-group-location.json';

const parse = (data) => {
  const match = config.find(x => new RegExp(x.sensor_uuid_starts_with).test(data.sensor_uuid));
  return match;
}

export {parse};