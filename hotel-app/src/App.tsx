import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { ThemeProvider } from "@material-ui/styles";
import theme from "./theme";
import { Provider } from "react-redux";
import LoginPage from "./pages/LoginPage";
import store from "./store/store";
import HomePage from "./pages/HomePage";
import EditRoomPage from "./pages/EditRoomPage";
import AuthApi from "./AuthApi";
import Cookies from "js-cookie";
import AddRoomPage from "./pages/AddRoomPage";
import AddClientPage from "./pages/AddClientPage";
import AddUserPage from "./pages/AddUserPage";

function App() {
  const [auth, setAuth] = React.useState(false);
  const Auth = React.useContext(AuthApi);

  const readCookie = () => {
    const user = Cookies.get("user");
    if (user) {
      setAuth(true);
    }
  };

  React.useEffect(() => {
    readCookie();
  }, []);

  return (
    <AuthApi.Provider value={{ auth, setAuth }}>
      <Router>
        <ThemeProvider theme={theme}>
          <Provider store={store}>
            <div>
              <Switch>
                <Route exact path="/" component={LoginPage} />
                <ProtectedRoute
                  path="/home"
                  component={HomePage}
                  auth={Auth.auth}
                />
                <Route exact path="/room/:id" component={EditRoomPage} />
                <Route exact path="/addRoom" component={AddRoomPage} />
                <Route exact path="/addClient" component={AddClientPage} />
                <Route exact path="/addUser" component={AddUserPage} />
              </Switch>
            </div>
          </Provider>
        </ThemeProvider>
      </Router>
    </AuthApi.Provider>
  );
}

const ProtectedRoute = (auth: any, component: Component, ...rest: any[]) => {
  return auth ? (
    <Route exact path="/home" component={HomePage} />
  ) : (
    <Redirect to="/" />
  );
};

export default App;
