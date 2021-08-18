import {
  EDIT_USERS_R,
  GET_USERS_FAILED,
  GET_USERS_START,
  SET_USERS,
} from "./Action";

const users = (state = [], action) => {
  switch (action.type) {
    case SET_USERS:
      console.log("Inside SET_USERS case ");
      
      return [...action.value];

    case EDIT_USERS_R:
      console.log("Inside EDIT_USER case ");
      const users = (state || []).map((x) => {
        if ((x.id = action.value.userid)) {
          x.editMode = action.value.editMode;
          console.log("editMode value is ", x.editMode);
        }
        return { ...x };
      });
      console.log("Inside EDIT_USER case : ", users);

      return [...users];

    case GET_USERS_START:
      return [...action.value];

    case GET_USERS_FAILED:
      return [...action.value];

    default:
      return state;
  }
};

export default users;
