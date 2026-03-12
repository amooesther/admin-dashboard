import { all } from 'redux-saga/effects';
import { dashboardSaga } from './dashboardSaga';
import { authSaga } from './authSaga';

export default function* rootSaga() {
  yield all([
    dashboardSaga(),
    authSaga(),
  ]);
}
