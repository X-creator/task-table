import classes from "./Table.module.scss";

const TableHeading = ({ cols, onSort, colState, loading }) => {
  return (
    <thead className={classes.heading}>
      <tr>
        {cols.map((colName, colId) => (
          <th key={colId}>
            <button type="button"
                    className={colState[colId] ? classes.sortUp : classes.sortDown}
                    onClick={onSort.bind(null, colId)}>
              {colName}
              {loading && <span className={classes.spinner} />}
            </button>
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeading;
