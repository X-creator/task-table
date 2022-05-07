import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { found } from "../../store/searchSlice";
import classes from "./Table.module.scss";


const populateTable = ({ data, rowCells, colState, limit }) => {
  data = sortTable({ data, rowCells, colState });
  if (data.length && data.length % limit === 0) return data;
  const filledRows = data.length % limit;
  const emptyRows = Array.from({ length: limit - filledRows }, () => ({}));
  return data.concat(emptyRows);
};

const sortTable = ({ data, rowCells, colState }) => {
  if (colState.active === null || !data.length) return data;
  return data.sort((a, b) => {
    let row = rowCells[colState.active];
    if (/\D/g.test(a[row])) {
      a = a[row].length;
      b = b[row].length;
    } else {
      a = a[row];
      b = b[row];
    }

    return sortFn(a, b, colState[colState.active]);
  });
};

const sortFn = (a, b, up) => up ? b - a : a - b;


const TableBody = ({ data, rowCells, colState, limit = 10 }) => {
  let parts,
    founded = 0;
  const bodyData = populateTable({ data, rowCells, colState, limit });
  const { searchStr } = useSelector((state) => state.search);
  const { page } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(found(founded));
    founded = 0;
  }, [searchStr, page]);

  return (
    <tbody className={classes.body}>
      {bodyData.map((row, id) => (
        <tr key={id}>
          {rowCells.map((cell, _id) => {
            if (searchStr) {
              parts = `${row[cell]}`.split(new RegExp(`(${searchStr})`, "gi"));
            }

            return (
              <td key={_id}>
                {parts && parts.map((entry, id) => {
                  if (entry.toLowerCase() === searchStr.toLowerCase()) {
                    founded++;
                    return <span key={id} className={classes.highlight}>{entry}</span>;
                  }
                  return entry;
                })}
                {!parts && row[cell]}
              </td>
            );
          })}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
