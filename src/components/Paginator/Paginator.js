import { Link, NavLink } from "react-router-dom";
import usePaginator from "../../hooks/usePaginator";
import classes from "./Paginator.module.scss";


const Paginator = ({ items, limit }) => {
  const { prev, next, pages } = usePaginator(items, limit);

  return (
    <div className={classes.container}>
      <Link className={classes.actions} to={`/${prev}`}>Назад</Link>
      <div className={classes.wrapper}>
        {Array.from({ length: pages }).map((_, id) => (
          <NavLink
            className={({ isActive }) => isActive ? classes.active : classes.links}
            key={id}
            to={`/${id + 1}`}>
            {id + 1}
          </NavLink>
        ))}
      </div>
      <Link className={classes.actions} to={`/${next}`}>Далее</Link>
    </div>
  );
};

export default Paginator;
