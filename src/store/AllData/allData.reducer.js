import { SET_WEEK, SET_DATA, SET_NHL_SCHEDULE } from './allData.types';

const INITIAL_STATE = {
  teamData: [],
  seasonSchedule: [],
  currentWeek: 1,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_DATA:
      return { ...state, teamData: action.payload };

    case SET_WEEK:
      return {
        ...state,
        currentWeek: action.payload,
      };

    case SET_NHL_SCHEDULE:
      // console.log(action);
      return {
        ...state,
        seasonSchedule: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;