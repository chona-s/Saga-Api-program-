//generator function
import { all } from "@redux-saga/core/effects";
import { watchGetUsers,

  watchCancelUser,

  watchDeleteUser,
  watchPostUser,

  watchPutUser,

  watchEditUser } from "./Saga3";
export default function* rootsaga() {
  yield all([
    watchGetUsers(),

    watchCancelUser(),

    watchDeleteUser(),
    watchPostUser(),

    watchPutUser(),

    watchEditUser(),
  ]);
}
