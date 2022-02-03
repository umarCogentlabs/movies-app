const initialState = 0;

const changeTheNumber = (state = initialState, action: any) => {
  switch (action.type) {
    case "INCREMENT":
      return state + action.payload;

    case "DECREMENT":
      return state - 1;

    case "SET_NUMBER":
      return action.payload;

    default:
      return state;
  }
};

export default changeTheNumber;
