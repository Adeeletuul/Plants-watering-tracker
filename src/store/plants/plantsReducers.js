import * as actions from "./plantsActions";

// Initial state

const initialState = {
  plants: [],
};

const plantsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.READ:
      return {
        plants: action.payload.plants,
      };
    case actions.UPDATE:
      return {
        ...state,
        plants: state.plants.map((plant) => {
          if (plant.id === action.payload.id) {
            return action.payload;
          }
          return plant;
        }),
      };
    case actions.DELETE:
      return {
        ...state,
        plants: state.plants.filter((plant) => plant.id !== action.payload),
      };
    case actions.DELETEIMAGE:
      return {
        ...state,
        plants: state.plants.map((plant) => {
          if (plant.id === action.payload) {
            return { ...plant, imageUrl: null };
          }
          return plant;
        }),
      };

    default:
      return state;
  }
};

export default plantsReducer;
