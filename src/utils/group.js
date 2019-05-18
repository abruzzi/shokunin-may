import Averager from "./averager";

const allGroups = [...Array(11).keys()].reduce((previous, current) => ({
  ...previous,
  [`group_${current}`]: {
    name: `group_${current}`,
    averager: new Averager(10),
    data: {}
  }
}), {});

const groupMap = {
  ...allGroups,
  group_total: {
    name: 'group_total',
    averager: new Averager(10),
    data: {}
  }
}

export default groupMap;

