import { useDispatch, useSelector } from "react-redux";
import { search } from "../../store/searchSlice";
import classes from "./Search.module.scss";

const Search = (props) => {
  const dispatch = useDispatch();
  const { searchStr, founded } = useSelector((state) => state.search);

  const searchHandler = (e) => {
    const inputStr = e.target.value.trim();
    if (inputStr !== searchStr) dispatch(search(inputStr));
  };

  return (
    <div className={classes.search}>
      <input className={classes.input} onChange={searchHandler} type="text" {...props} placeholder="Поиск" />
      {searchStr && <p className={classes.result}>{founded}</p>}
    </div>
  );
};

export default Search;
