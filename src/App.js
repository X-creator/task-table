import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { makeRequest } from "./store/dataSlice";
import Search from "./components/Search/Search";
import Table from "./components/Table/Table";
import Paginator from "./components/Paginator/Paginator";


const cols = ["ID", "Заголовок", "Описание"];
const rowCells = ["id", "title", "body"];
const limit = 10;

const App = () => {
  let { data, error, loading } = useSelector((state) => state.data);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    navigate("1");
  }, []);

  useEffect(() => {
    dispatch(makeRequest());
  }, []);

  useEffect(() => {
    if (error) console.log(error);
  }, [error]);

  return (
    <div className="App">
      <header>
        <Search />
      </header>
      <Routes>
        <Route path=":page"
               element={
                 <main>
                   <Table cols={cols} data={data} rowCells={rowCells} limit={limit} loading={loading} />
                   {data && !loading && <Paginator items={data.length} limit={limit} />}
                 </main>
               } />
      </Routes>
    </div>
  );
};

export default App;
