import React, { Fragment, useEffect, useState } from "react";
import { ThunkDispatch } from "redux-thunk";
import { bindActionCreators } from "redux";
import { useHistory } from "react-router-dom";
import { RootState } from "../store/root-reducer";
import { connect } from "react-redux";
import "./components/styles.css";
import Swal from "sweetalert2";
import CustomBackdrop from "./components/CustomBackdrop";
import ItemRoom from "./components/room/ItemRoom";
import { Client, Room, Message, User } from "../store/interfaces";
import HeaderAdmin from "./components/HeaderAdmin";
import {
  getClients,
  getRooms,
  getUsers,
  removeRoomAction,
} from "../store/hotel.action";
import { InputBase } from "@material-ui/core";
import SearchIcon from "@mui/icons-material/Search";
import { Pagination, PaginationItem } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Button from "@material-ui/core/Button";
import ItemClient from "./components/client/ItemClient";
import Cookies from "js-cookie";

type HotelProps = LinkDispatchProps & LinkStateProps;

const HomePage: React.FC<HotelProps> = ({
  user,
  rooms,
  clients,
  users,
  isFetching,
  error,
  message,
  getClients,
  getRooms,
  getUsers,
  removeRoomAction,
}) => {
  useEffect(() => {
    getRooms();
    getClients();
    getUsers();
    getCurrentUser();
  }, []);

  useEffect(() => {
    if (message) {
      Swal.fire(message.header, message.text, message.type);
    }
  }, [message]);

  const cookies = document.cookie.split(";");
  const currentToken =
    cookies[0].indexOf("=") > -1
      ? cookies[0].substr(cookies[0].indexOf("="))
      : cookies[0];

  const newStr = currentToken.slice(1);

  const name =
    cookies[0].indexOf("=") > -1
      ? cookies[0].substr(0, cookies[0].indexOf("="))
      : cookies[0];

  const [currentUser, setCurrentUser] = useState({
    username: "",
    password: "",
    email: "",
    id: "",
    role: "",
  });

  const getCurrentUser = () => {
    users.map((u: any) => (u.username === name ? setCurrentUser(u) : ""));
  };

  const logOut = () => {
    Cookies.remove(name);
    history.push("/");
  };

  const removeRoom = (room: Room) => {
    //preguntar al usuario
    Swal.fire({
      title: "Are you sure?",
      text: "A room that is deleted cannot be recovered.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#48b29d",
      cancelButtonColor: "#ef6756",
      confirmButtonText: "Yes, delete",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.value) {
        // pasarlo al action
        await removeRoomAction(room, newStr);
      }
    });
  };

  const history = useHistory();

  const canEditRoom = (room: Room) => {
    history.push("/room/" + room.id);
  };

  const [clientList, setClientList] = useState<any[]>(clients);
  const [clientsTotal, setClientsTotal] = useState<any>();
  const [nameToSearch, saveName] = useState("");
  const [clientWasSearched, setClientWasSearched] = useState<boolean>();

  useEffect(() => {
    setClientList(clients);
    setClientsTotal(clients);
  }, [clients]);

  if (clientList === undefined) {
    setClientList(clients);
  }

  if (clientWasSearched === true) {
    setClientWasSearched(false);
  }

  const onChangeClient = (e: any) => {
    saveName(e.target.value);
    filterClient(e.target.value);
  };

  const filterClient = (inputValue: string) => {
    const clientsCopy = [...clientsTotal];
    const clientFind = clientsCopy?.filter((clientFind: any) =>
      new RegExp(inputValue, "i").test(clientFind.name)
    );
    setClientList(clientFind);
    setClientWasSearched(true);
  };

  const [roomNumberToSearch, saveRoomNumber] = useState("");
  const [roomWasSearched, setRoomWasSearched] = useState<boolean>();
  const [roomList, setRoomList] = useState<Room[]>(rooms);
  const [roomsTotal, setRoomsTotal] = useState<any>();
  const [limit, setLimit] = useState<number>(2);
  const [offset, setOffset] = useState<number>(0);
  const [currentPage, setcurrentPage] = useState<number>(1);

  const end = offset + limit;

  useEffect(() => {
    setRoomList(rooms);
    setRoomsTotal(rooms);
  }, [rooms]);

  if (roomList === undefined) {
    setRoomList(rooms);
  }

  if (roomWasSearched === true) {
    setRoomWasSearched(false);
  }

  const onChange = (e: any) => {
    saveRoomNumber(e.target.value);
    filterRoom(e.target.value);
  };

  const filterRoom = (inputValue: string) => {
    const roomsCopy = [...roomsTotal];
    const roomFind = roomsCopy?.filter((roomFind: any) =>
      new RegExp(inputValue, "i").test(roomFind.roomNumber)
    );
    setRoomList(roomFind);
    setRoomWasSearched(true);
  };

  const [home, setHome] = useState("ROOMS");

  return !roomList ? null : (
    <div className="to-do-list__container">
      <HeaderAdmin userRole={currentUser.role} logOut={logOut} />
      <Button
        style={{
          backgroundColor: "#51472e",
          color: "white",
          marginLeft: "50px",
        }}
        variant="contained"
        size="large"
        onClick={() => {
          home === "ROOMS" ? setHome("CLIENTS") : setHome("ROOMS");
        }}
      >
        {home === "ROOMS" ? "CLIENTS" : "ROOMS"}
      </Button>
      {home === "ROOMS" ? (
        <Fragment>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              marginLeft: 50,
              marginTop: 50,
            }}
          >
            <InputBase
              style={{
                justifyContent: "center",
                display: "grid",
                flex: 1,
                color: "#51472e",
              }}
              value={roomNumberToSearch}
              placeholder="Search by room number"
              inputProps={{ "aria-label": "search google maps" }}
              onChange={onChange}
            />

            <SearchIcon sx={{ p: "10px", color: "#51472e" }} />
          </div>
          <div className="to-do-list__tasks-wrapper">
            {roomList &&
              roomList
                ?.slice(offset, end)
                .map((r: Room) => (
                  <ItemRoom
                    key={r.id}
                    room={r}
                    removeRoom={removeRoom}
                    canEditRoom={canEditRoom}
                  />
                ))}
          </div>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              marginLeft: 50,
              marginTop: 50,
              borderRadius: 8,
            }}
          >
            <Pagination
              variant="outlined"
              count={Math.ceil(roomList.length / limit)}
              renderItem={(item) => (
                <PaginationItem
                  style={{
                    backgroundColor: "#df2040",
                    color: "white",
                  }}
                  components={{
                    previous: ArrowBackIcon,
                    next: ArrowForwardIcon,
                  }}
                  {...item}
                  onClick={() => {
                    setcurrentPage(item.page);
                    setOffset((item.page - 1) * limit);
                  }}
                />
              )}
            />
          </div>
          <CustomBackdrop isFetching={isFetching} />
        </Fragment>
      ) : (
        <Fragment>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              marginLeft: 50,
              marginTop: 50,
            }}
          >
            <InputBase
              style={{
                justifyContent: "center",
                display: "grid",
                flex: 1,
                color: "#51472e",
              }}
              value={nameToSearch}
              placeholder="Search by client name"
              inputProps={{ "aria-label": "search google maps" }}
              onChange={onChangeClient}
            />

            <SearchIcon sx={{ p: "10px", color: "#51472e" }} />
          </div>
          <div className="to-do-list__tasks-wrapper">
            {clientList &&
              clientList?.slice(offset, end).map((c: any) => (
                <div>
                  <ItemClient
                    key={c.id}
                    client={c}
                    token={newStr}
                    rol={currentUser.role}
                  />
                </div>
              ))}
          </div>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              marginLeft: 50,
              marginTop: 50,
              borderRadius: 8,
            }}
          >
            <Pagination
              variant="outlined"
              count={Math.ceil(clientList.length / limit)}
              renderItem={(item) => (
                <PaginationItem
                  style={{
                    backgroundColor: "#df2040",
                    color: "white",
                  }}
                  components={{
                    previous: ArrowBackIcon,
                    next: ArrowForwardIcon,
                  }}
                  {...item}
                  onClick={() => {
                    setcurrentPage(item.page);
                    setOffset((item.page - 1) * limit);
                  }}
                />
              )}
            />
          </div>
          <CustomBackdrop isFetching={isFetching} />
        </Fragment>
      )}
    </div>
  );
};

interface LinkDispatchProps {
  getRooms: () => void;
  getClients: () => void;
  getUsers: () => void;
  removeRoomAction: (room: Room, user: string) => void;
}

interface LinkStateProps {
  user: string;
  rooms: Room[];
  clients: Client[];
  users: User[];
  isFetching: boolean;
  error?: string | null;
  message: Message | null;
}

const mapStateToProps = (state: RootState): LinkStateProps => {
  const { user, rooms, clients, users, isFetching, error, message } =
    state.hotel;

  return {
    user,
    rooms,
    clients,
    users,
    isFetching,
    error,
    message,
  };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, any>
): LinkDispatchProps => ({
  getClients: bindActionCreators(getClients, dispatch),
  getRooms: bindActionCreators(getRooms, dispatch),
  getUsers: bindActionCreators(getUsers, dispatch),
  removeRoomAction: bindActionCreators(removeRoomAction, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
