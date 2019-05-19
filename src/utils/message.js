import {parse} from "./parser";
import groupMap from "./group";

const convert = (messages) => {
  const parsed = messages.map(m => parse(m.message));

  parsed.forEach(group => {
    groupMap[group.groupName].averager.put(group.readings);
    groupMap[group.groupName].data = group;

    groupMap['group_total'].averager.put(group.readings);
    groupMap['group_total'].data = {...group, displayName: 'Total'};
  });

  return groupMap;
};

export {convert};