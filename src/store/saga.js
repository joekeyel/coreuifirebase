import { takeLatest,takeEvery, put,call } from "redux-saga/effects";


function* fetchUpAsync() {
   console.log("getData");
   const json = yield call(() =>
     fetch("claritybqm/reportFetch/?scriptName=DC_ROLES&userid=DCOADMIN")
       .then(response => response.json())
       .then(myJson => myJson)
   );
   yield put({ type: "FETCH_DATA_USER", value: json });
   console.log(json)
 }




export function* watchFetchData() {
  yield takeEvery("FETCH_USER", fetchUpAsync);
 
}

