import { useMemo } from "react";
import { useParams } from "react-router-dom";
import TableHeading from "./TableHeading";
import TableBody from "./TableBody";
import useSort from "../../hooks/useSort";
import classes from "./Table.module.scss";


const Table = ({ cols, rowCells, data, limit, loading }) => {
  const [state, onSort] = useSort(cols);
  const { page } = useParams();
  const start = useMemo(() => (page - 1) * limit, [limit, page]);
  const end = useMemo(() => page * limit, [limit, page]);
  const pageData = useMemo(() => data.slice(start, end), [data, end, start]);

  return (
    <table className={classes.table}>
      <TableHeading cols={cols} onSort={onSort} colState={state} loading={loading} />
      <TableBody data={pageData} rowCells={rowCells} colState={state} limit={limit} />
    </table>
  );
};

export default Table;
