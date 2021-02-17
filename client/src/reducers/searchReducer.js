export const searchReducer = (state = { text: "" }, action) => {
  switch (action.type) {
    case "SEARCH_QUERY": //
      return { ...state, ...action.payload }; //payload

    default:
      return state;
  }
};
