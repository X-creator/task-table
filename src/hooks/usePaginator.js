import { useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";

const firstPage = 1;
let lastPage;

const init = ({ items, limit }) => {
  if (items === 0) items = limit;
  lastPage = Math.ceil(items / limit);

  return {
    prev: 1,
    next: lastPage < 2 ? 1 : 2,
    current: 1,
    pages: lastPage
  };
};

const calcPrev = (current) => current <= firstPage ? firstPage : --current;

const calcNext = (current) => current >= lastPage ? lastPage : ++current;

const paginatorReducer = (state, { type, current }) => {
  switch (type) {
    case "CALC_STATE":
      return {
        ...state,
        current,
        prev: calcPrev(current),
        next: calcNext(current)
      };
    default:
      throw new Error();
  }
};

const usePaginator = (items, limit) => {
  const [state, dispatch] = useReducer(paginatorReducer, { items, limit }, init);
  const { page } = useParams();

  useEffect(() => {
    dispatch({ type: "CALC_STATE", current: Number(page) });
  }, [page]);

  return state;
};

export default usePaginator;
