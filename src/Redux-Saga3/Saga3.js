import axios from "axios";
import { call, put, takeEvery } from "redux-saga/effects";

import {
  CANCEL_USER_UPDATE,
  DELETE_USERS,
  EDIT_USERS,
  GET_USERS,
  POST_USERS,
  PUT_USERS,
  SET_USERS,
  EDIT_USERS_R,
} from "./Action";

export function* watchGetUsers() {
  console.log("inside watchGetUsers");

  yield takeEvery(GET_USERS, workerGetUsers);
}
export const watchCancelUser = function* () {
  console.log("inside watchCancelUser");

  yield takeEvery(CANCEL_USER_UPDATE, workerCancelUser);
};
export const watchDeleteUser = function* () {
  console.log("inside watchDeleteUser");

  yield takeEvery(DELETE_USERS, workerDeleteUser);
};
export const watchPostUser = function* () {
  console.log("inside watchPostUser");
  yield takeEvery(POST_USERS, workerPostUser);
};
export const watchPutUser = function* () {
  console.log("inside watchPutUser");

  yield takeEvery(PUT_USERS, workerPutUser);
};
export const watchEditUser = function* () {
  console.log("inside watchEdituser");
  yield takeEvery(EDIT_USERS, workerEditUser);
};


export function* workerGetUsers() {
  console.log("called workerGetUsers");

  // yield put({ type: GET_USERS_START });

  try {
    const uri = "https://jsonplaceholder.typicode.com/users";
    const result = yield call(axios.get, uri);
    console.log(result.data);
    yield put({ type: SET_USERS, value: result.data });

    console.log("User fetched successfully");
  } catch {
    console.log("Fetching user service got failed");
    //yield put({ type: GET_USERS_FAILED });
  }
}

export function* workerDeleteUser(action) {
  console.log("called workerDeleteUser");

  try {
    const uri = `https://jsonplaceholder.typicode.com/users/${action.value}`;

    const result = yield call(axios.delete, uri);
    yield put({ type: GET_USERS, value: result.data });
    console.log("User got deleted successfully");
  } catch {
    console.log("User deletion failed");
    //yield put({ type: GET_USERS_FAILED });
  }
}

export function* workerPostUser(action) {
  console.log("called workerPostUser");
  try {
    const uri = `https://jsonplaceholder.typicode.com/users`;
    const result = yield call(axios.post, uri, action.value);
    console.log(action.value);
    console.log(result.data);
    yield put({ type: GET_USERS, value: result.data });
    
    console.log("User got inserted successfully");
  } catch {
    console.log("User creation failed");
    //yield put({ type: GET_USERS_FAILED });
  }
}

export function* workerPutUser(action) {
  console.log("called workerPutUser");

  try {
    const uri = `https://jsonplaceholder.typicode.com/users/${action.value.id}`;
    const result = yield call(axios.put, uri, action.value);
    yield put({ type: GET_USERS, value: result.data });

    console.log("User got updated successfully");
  } catch {
    console.log("User updation failed");
  }
}

export function* workerEditUser(action) {
  console.log("called workerEditUser");
  yield put({
    type: EDIT_USERS_R,
    value: { userid: action.value, editMode: true },
  });
}

export function* workerCancelUser(action) {
  console.log("called workerCancelUser");

  yield put({
    type: EDIT_USERS_R,
    value: { userid: action.value, editMode: false },
  });
}
