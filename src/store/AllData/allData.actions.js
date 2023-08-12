import { SET_DATA, SET_WEEK, SET_NHL_SCHEDULE } from './allData.types';

export const setTeamStats = (data) => {
  return {
    type: SET_DATA,
    payload: data,
  };
};

export const setCurrentWeek = (data) => {
  return {
    type: SET_WEEK,
    payload: data,
  };
};

export const setNHLSchedule = (data) => {
  return {
    type: SET_NHL_SCHEDULE,
    payload: data,
  };
};