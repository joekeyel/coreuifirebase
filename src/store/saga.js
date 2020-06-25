import { takeLatest,takeEvery, put,call } from "redux-saga/effects";
import auth from '../../src/auth';


function* fetchUpAsync() {
  var username =  auth.authenticated.username.toUpperCase();
   //console.log("getData");
   const json = yield call(() =>
     fetch("/claritybqm/reportFetch/?scriptName=DC_USER&userid=" + username)
       .then(response => response.json())
       .then(myJson => myJson)
   );
   yield put({ type: "FETCH_DATA_USER", value: json });
  // console.log(json,username)
 }

//  function* fetchBadge() {
//   console.log("getbadge");
//   const json = yield call(() =>
//     fetch("/claritybqm/reportFetch/?scriptName=DC_BADGE")
//       .then(response => response.json())
//       .then(myJson => myJson)
//   );
//   yield put({ type: "FETCH_BADGE_USER", value: json });
//   console.log(json)
// }

function* fetchRack() {
  //console.log("getRack");
    const json = yield call(() =>
    fetch("/claritybqm/reportFetch/?scriptName=DC_RACK")
      .then(response => response.json())
      .then(data => data )
  );
  yield put({ type: "FETCH_DATA_RACK", value: json });
  //console.log(json)
}

function* fetchSite() {
  //console.log("getSite");
    const json = yield call(() =>
    fetch("/claritybqm/reportFetch/?scriptName=DC_SITE")
      .then(response => response.json())
      .then(data => data )
  );
  yield put({ type: "FETCH_DATA_DCSITE", value: json });
 // console.log('site',json)
}

function* fetchLocation() {
  //console.log("getLOC");
    const json = yield call(() =>
    fetch("/claritybqm/reportFetch/?scriptName=DC_LOCATION")
      .then(response => response.json())
      .then(data => data )
  );
  yield put({ type: "FETCH_DATA_DCLOCATION", value: json });
 // console.log('loc',json)
}

function* fetchBandwidth() {
  //console.log("getBandwidth");
    const json = yield call(() =>
    fetch("/claritybqm/reportFetch/?scriptName=DC_NETWORK_BANDWIDTH")
      .then(response => response.json())
      .then(data => data )
  );
  yield put({ type: "FETCH_DATA_BANDWIDTH", value: json });
 // console.log('getBandwidth',json)
}


function* fetchPort() {
  //console.log("port");
    const json = yield call(() =>
    fetch("/claritybqm/reportFetch/?scriptName=DC_NETWORK_PORT")
      .then(response => response.json())
      .then(data => data )
  );
  yield put({ type: "FETCH_DATA_PORT", value: json });
  //console.log('port',json)
}


export function* watchFetchData() {
  yield takeEvery("FETCH_USER", fetchUpAsync);
 // yield takeEvery("FETCH_BADGE", fetchBadge);
  yield takeEvery("FETCH_RACK", fetchRack);
  yield takeEvery("FETCH_DCSITE", fetchSite);
  yield takeEvery("FETCH_DCLOCATION", fetchLocation);
  yield takeEvery("FETCH_BANDWIDTH", fetchBandwidth);
  yield takeEvery("FETCH_PORT", fetchPort);
}
