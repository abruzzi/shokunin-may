import config from './sensor-group-location.json';

const parse = (data) => {
  const match = config.find(x => new RegExp(x.sensor_uuid_starts_with).test(data.sensor_uuid));
  
  return {
    groupName: match.group_name,
    displayName: match.display_name || '',
    timestamp: data.timestamp,
    location: {
      latitude: match.latitude,
      longitude: match.longitude,
    },
    readings: {
      temperature: Number(data.ambient_temperature),
      humidity: Number(data.humidity),
      light: Number(data.photosensor),
      radiation: Number(data.radiation_level)
    }
  };
}

export {parse};