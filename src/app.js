import {parse} from './parser';
import Averager from './averager';

const pubnub = new PubNub({
  subscribeKey: 'sub-c-5f1b7c8e-fbee-11e3-aa40-02ee2ddab7fe'
});

pubnub.subscribe({
  channels: ["pubnub-sensor-network"]
});

const THE_MAP = [...Array(11).keys()].reduce((previous, current) => ({
  ...previous,
  [`group_${current}`]: new Averager(10)
}), {});

pubnub.addListener({
  message: function(data) {
    const parsed = parse(data.message);
    THE_MAP[parsed.groupName].put(parsed.readings);
    console.log({
      group: parsed.groupName,
      average: THE_MAP[parsed.groupName].average()
    });
  }
});