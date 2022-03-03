import React, { useEffect, useState } from "react";
import { ThunkDispatch } from "redux-thunk";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import "./components/styles.css";
import LoginForm from "./components/LoginForm";
import { Message, UserLogin } from "../store/interfaces";
import { loginUser } from "../store/hotel.action";
import { RootState } from "../store/root-reducer";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import AuthApi from "../AuthApi";
import Cookies from "js-cookie";
import moment from "moment";

type LoginProps = LinkDispatchProps & LinkStateProps;

const LoginPage: React.FC<LoginProps> = ({ loginUser, message }) => {
  const history = useHistory();

  const Auth = React.useContext(AuthApi);
  const [values, setValues] = useState({
    username: "",
    password: "",
    showPassword: false,
  });

  const cookies = document.cookie.split(";");
  const name =
    cookies[0].indexOf("=") > -1
      ? cookies[0].substr(0, cookies[0].indexOf("="))
      : cookies[0];

  /* const currentToken =
    cookies[0].indexOf("=") > -1
      ? cookies[0].substr(cookies[0].indexOf("="))
      : cookies[0];

  const newStr = currentToken.slice(1); */

  Auth.setAuth(false);
  Cookies.remove(name);

  useEffect(() => {
    if (message) {
      Swal.fire(message.header, message.text, message.type);
    }
  }, [message]);

  const onChangeForm = (e: any) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (e: any) => {
    e.preventDefault();
  };

  async function submitForm(e: any) {
    e.preventDefault();
    const token = await loginUser(values);
    const userFind = token;

    if (userFind !== undefined) {
      Auth.setAuth(true);
      Cookies.set(values.username, userFind);
      history.push("/home");
    } else {
      history.push("/");
    }
  }

  return (
    <div className="to-do-list__container">
      <LoginForm
        titleName="HOTEL LOGIN"
        submitForm={submitForm}
        onChangeForm={onChangeForm}
        values={values}
        handleClickShowPassword={handleClickShowPassword}
        handleMouseDownPassword={handleMouseDownPassword}
        buttonName="LOGIN"
      />
    </div>
  );
};

interface LinkDispatchProps {
  loginUser: (user: UserLogin) => void;
}

interface LinkStateProps {
  message: Message | null;
}

const mapStateToProps = (state: RootState): LinkStateProps => {
  const { message } = state.hotel;
  return {
    message,
  };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, any>
): LinkDispatchProps => ({
  loginUser: bindActionCreators(loginUser, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
