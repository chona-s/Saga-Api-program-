import  React,{ Component } from "react";

import { connect } from "react-redux";

import {
  GET_USERS,
  POST_USERS,
  EDIT_USERS,
  PUT_USERS,
  DELETE_USERS,
  CANCEL_USER_UPDATE,
} from "./Action";

const sum = (a, b) => {
  return a + b;
};

const calculator = (type) => {
  if (type === "sum") {
    return sum;
  }
};

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
  }

  componentDidMount() {
    this.props.getUsers();
  }
  componentDidUpdate() {

    console.log("in",this.state.users);
  }
  inputChanged = (event, field) => {
    this.setState({ [field] : event.target.value });
  };
  addUser = () => {    
    this.props.addUser({ name: this.state.name, email: this.state.email });
    
  };
  deleteUser= (user) => {
    this.props.deleteUsers(user.id);
  };
  editUser = (user) => {
    this.props.editUser(user.id);
  };

  updateUser = (user) => {
    this.props.updatUsers(user);
  };
  cancelUpdate = (user) => {
    this.props.cancelUpdates(user.id);
  };
  render() {
    return (
      <div>
        <div>
          <p>Higher order Function output - {calculator("sum")(4, 5)}</p>
        </div>{" "}
        <table>
          <tr>
            <th>name</th>
            <th>email</th> <th>Action</th>
          </tr>
          <tr>
            <td>
              <input
                id="name"
                onChange={(event) => this.inputChanged(event, "name")}
              />
            </td>

            <td>
              {" "}
              <input
                id="email"
                onChange={(event) => this.inputChanged(event, "email")}
              />
            </td>

            <td>
              <button onClick={this.addUser}>AddUser</button>
            </td>
          </tr>
        </table>
  
       {this.props.users.length>0 && <div> {(this.props.users || []).map((user) => {
          return (
            <div>
              <table>
                <tr>
                  <td >{user.name}</td>
                  <td>
                    <a href={user.email}>{user.email}</a>
                  </td>{" "}
                  <td>
                    <button
                      onClick={() => {
                        this.updateUser(user);
                      }}
                    >
                      Update
                    </button>

                    <button
                      onClick={() => {
                        this.editUser(user);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        this.deleteUser(user);
                      }}
                    >
                      Delete
                    </button>

                    <button
                      onClick={() => {
                        this.cancelUpdate(user);
                      }}
                    >
                      Cancel
                    </button>
                  </td>
                </tr>{" "}
              </table>
            </div>
          );
        })}</div>}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  console.log("sta",state);
  return {

    users: state,
    
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getUsers: () => {
      console.log("getUser called");
      dispatch({ type: GET_USERS });
    },
    addUser: (user) => {
      console.log("addUser called");
      dispatch({ type: POST_USERS, value: user });
    },
    editUser: (userid) => {
      console.log("editUser called");
      dispatch({ type: EDIT_USERS, value: userid });
    },
    updatUsers: (user) => {
      console.log("updateUser called");
      dispatch({ type: PUT_USERS, value: user });
    },

    deleteUsers: (userid) => {
      console.log("deleteUser called");
      dispatch({ type: DELETE_USERS, value: userid });
    },
    cancelUpdates: (userid) => {
      console.log("cancelUpdate called");
      dispatch({ type: CANCEL_USER_UPDATE, value: userid });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
