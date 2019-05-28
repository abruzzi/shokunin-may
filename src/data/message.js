import _ from 'lodash';
import RoundRobinArchive from "./RoundRobinArchive";
import {parse} from "./parser";
import {ROLLING_WINDOW_SIZE} from "../constants/index";

const groups = _.range(0, 11).reduce((previous, current) => ({
  ...previous,
  [`group_${current}`]: {
    name: `group_${current}`,
    rra: new RoundRobinArchive(ROLLING_WINDOW_SIZE),
    data: {}
  }
}), {});

const groupMap = {
  ...groups,
  group_total: {
    name: 'group_total',
    rra: new RoundRobinArchive(ROLLING_WINDOW_SIZE),
    data: {}
  }
};

const convertRawDataForRendering = (messages) => {
  const parsed = messages.map(m => parse(m.message));

  parsed.forEach(group => {
    groupMap[group.groupName].rra.put(group.readings);
    groupMap[group.groupName].data = group;

    groupMap['group_total'].rra.put(group.readings);
    groupMap['group_total'].data = {...group, displayName: 'Total'};
  });

  return groupMap;
};

export {convertRawDataForRendering};