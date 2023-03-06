import * as actions from "./wateringActions";

// Initial state

const initialState = {
  wateringLogs: [],
};

const wateringReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.READ:
      return {
        wateringLogs: action.payload.wateringLogs,
      };
    case actions.DELETE:
      return {
        ...state,
        wateringLogs: state.wateringLogs.filter(
          (wateringLog) => wateringLog.id !== action.payload
        ),
      };

    default:
      return state;
  }
};

export default wateringReducer;
