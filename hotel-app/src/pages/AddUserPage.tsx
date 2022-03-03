import React, { useEffect, useState } from "react";
import { Message } from "../store/interfaces";
import { ThunkDispatch } from "redux-thunk";
import { bindActionCreators } from "redux";
import { createUser } from "../store/hotel.action";
import { RootState } from "../store/root-reducer";
import { connect, useDispatch } from "react-redux";
import "./components/styles.css";
import Swal from "sweetalert2";
import CustomBackdrop from "./components/CustomBackdrop";
import { useHistory } from "react-router";
import FormAddUser from "./components/user/FormAddUser";
import hotelSlice from "../store/hotelSlice";

type RoomProps = LinkDispatchProps & LinkStateProps;

const AddUserPage: React.FC<RoomProps> = ({
  createUser,
  isFetching,
  message,
}) => {
  useEffect(() => {
    if (message) {
      Swal.fire(message.header, message.text, message.type);
    }
  }, [message]);

  const history = useHistory();

  const cookies = document.cookie.split(";");

  const currentToken =
    cookies[0].indexOf("=") > -1
      ? cookies[0].substr(cookies[0].indexOf("="))
      : cookies[0];

  const token = currentToken.slice(1);

  const dispatch = useDispatch();

  async function submitForm(e: any) {
    e.preventDefault();
    if (
      currentUser.name === "" ||
      currentUser.username === "" ||
      currentUser.email === "" ||
      currentUser.password === "" ||
      currentUser.role === ""
    ) {
      dispatch(
        hotelSlice.actions.setMessage({
          header: "Error when creating the user",
          text: "Please complete all the fields",
          type: "error",
        })
      );
      return;
    }
    await createUser(currentUser, token);
    history.push("/home");
  }

  const [currentUser, setCurrentUser] = useState<any>({
    name: "",
    username: "",
    email: "",
    password: "",
    showPassword: false,
    role: "",
  });

  const onChangeForm = (e: any) => {
    setCurrentUser({
      ...currentUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleClickShowPassword = () => {
    setCurrentUser({
      ...currentUser,
      showPassword: !currentUser.showPassword,
    });
  };

  const handleMouseDownPassword = (e: any) => {
    e.preventDefault();
  };

  return (
    <div className="to-do-list__container">
      <FormAddUser
        submitForm={submitForm}
        onChangeForm={onChangeForm}
        currentUser={currentUser}
        handleClickShowPassword={handleClickShowPassword}
        handleMouseDownPassword={handleMouseDownPassword}
      />
      <CustomBackdrop isFetching={isFetching} />
    </div>
  );
};

interface LinkDispatchProps {
  createUser: (user: any, token: string) => void;
}

interface LinkStateProps {
  isFetching: boolean;
  error?: string | null;
  message: Message | null;
}

const mapStateToProps = (state: RootState): LinkStateProps => {
  const { isFetching, error, message } = state.hotel;

  return {
    isFetching,
    error,
    message,
  };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, any>
): LinkDispatchProps => ({
  createUser: bindActionCreators(createUser, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddUserPage);
