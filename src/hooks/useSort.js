import { useReducer } from "react";

let initialState;

const init = (cols) => {
  initialState = Object.fromEntries(
    cols.map((_, colId) => [colId, false])
  );

  return {
    ...initialState,
    active: null
  };
};

const sortReducer = (state, { type, colId }) => {
  switch (type) {
    case "SORT":
      return {
        ...initialState,
        [colId]: !state[colId],
        active: colId
      };
    default:
      throw new Error();
  }
};

const useSort = (cols) => {
  const [state, dispatch] = useReducer(sortReducer, cols, init);

  const onSort = (colId) => {
    dispatch({ type: "SORT", colId });
  };

  return [state, onSort];
};

export default useSort;

