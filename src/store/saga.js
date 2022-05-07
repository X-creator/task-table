import { call, put, takeEvery } from "redux-saga/effects";
import { makeRequest, onFailure, onSuccess } from "./dataSlice";
import axios from "axios";


const options = {
  method: "get",
  url: "https://jsonplaceholder.typicode.com/posts"
};

const fetchDataApi = (options) => {
  return axios(options)
    .then(({ data }) => ({ data }))
    .catch(({ message }) => ({ err: message }));
};

function* fetchData() {
  const { data, err } = yield call(fetchDataApi, options);
  if (data) {
    yield put(onSuccess(data));
  } else {
    yield put(onFailure(err));
  }
}

function* watchFetchData() {
  yield takeEvery(makeRequest, fetchData);
}

export default watchFetchData;