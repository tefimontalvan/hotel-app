import React, { useEffect, useState } from "react";
import FormEditRoom from "./components/room/FormEditRoom";
import { getDefaultHeaders } from "../services/utils.service";
import { canEditRoomAction } from "../store/hotel.action";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import ItemHistorial from "./components/ItemHistorial";

const EditRoomPage: any = (props: any) => {
  const [currentRoom, setCurrentRoom] = useState<any>({
    id: 0,
    roomNumber: 0,
    empty: true,
    type: "",
    capacity: 0,
    active: true,
    client: {},
    pictures: [],
    services: [],
  });
  const [currentHistorial, setCurrentHistorial] = useState();

  const dispatch = useDispatch();
  const history = useHistory();

  const requestData = async () => {
    const response = await fetch(
      `http://localhost:3000/room/` + props.match.params.id,
      {
        method: "GET",
        headers: getDefaultHeaders(),
      }
    );
    const getRoomCurrent = await response.json();
    setCurrentRoom(getRoomCurrent);
  };

  const requestHistory = async () => {
    const response = await fetch(`http://localhost:3000/history/room`, {
      method: "POST",
      body: JSON.stringify({
        id: props.match.params.id,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const getRoomHistorial = await response.json();

    setCurrentHistorial(getRoomHistorial);
  };

  useEffect(() => {
    requestData();
    requestHistory();
    getCurrentUser();
  }, []);

  const cookies = document.cookie.split(";");

  const currentToken =
    cookies[0].indexOf("=") > -1
      ? cookies[0].substr(cookies[0].indexOf("="))
      : cookies[0];

  const name =
    cookies[0].indexOf("=") > -1
      ? cookies[0].substr(0, cookies[0].indexOf("="))
      : cookies[0];

  const token = currentToken.slice(1);

  const [currentUser, setCurrentUser] = useState({
    username: "",
    password: "",
    email: "",
    id: "",
    role: "",
  });

  const users = useSelector((state: any) => state.hotel.users);

  const getCurrentUser = () => {
    users.map((u: any) => (u.username === name ? setCurrentUser(u) : ""));
  };

  const editRoom = async (e: any) => {
    e.preventDefault();
    if (picturesArray.length !== 0) {
      addPictureArray();
    }
    if (servicesArray.length !== 0) {
      addServiceArray();
    }
    if (removePicturesArray.length !== 0) {
      removePictureArray();
    }
    if (removeServicesArray.length !== 0) {
      removeServiceArray();
    }
    let getCurrentClient;
    if (currentRoom.client !== null) {
      const response = await fetch(
        `http://localhost:3000/client/document/${
          currentRoom.client.document
            ? currentRoom.client.document
            : currentRoom.client
        }`,
        {
          method: "GET",
          headers: getDefaultHeaders(),
        }
      );
      getCurrentClient = await response.json();
    }
    dispatch(
      canEditRoomAction(
        currentRoom,
        currentRoom.id,
        token,
        currentRoom.client === null ? null : getCurrentClient
      )
    );
    history.push("/home");
  };

  const onChangeForm = (e: any) => {
    setCurrentRoom({
      ...currentRoom,
      [e.target.name]: e.target.value,
    });
  };

  const removeClient = () => {
    setCurrentRoom({
      ...currentRoom,
      client: null,
    });
  };

  const [service, setService] = useState("");
  const [serviceMessage, setServiceMessage] = useState("");
  const [servicesArray, setServicesArray] = useState<string[]>([]);
  const [removeServicesArray, setRemoveServicesArray] = useState<number[]>([]);

  const changeService = (e: any) => {
    setService(e.target.value);
    setServiceMessage("");
  };

  const removeServiceAction = async (service: number) => {
    await fetch(`http://localhost:3000/extraService/` + service, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  };

  const removeService = (service: number) => {
    setRemoveServicesArray([...removeServicesArray, service]);
    setServiceMessage("Service removed successfully");
  };

  const removeServiceArray = () => {
    removeServicesArray.map((s: number) => removeServiceAction(s));
  };

  const addService = (service: string) => {
    setServicesArray([...servicesArray, service]);
    setService("");
    setServiceMessage("Service added successfully");
  };

  const addServiceArray = () => {
    servicesArray.map((s: string) => addServiceAction(s));
  };

  const addServiceAction = async (s: string) => {
    const response = await fetch(`http://localhost:3000/extraService`, {
      method: "POST",
      body: JSON.stringify({
        room: {
          id: currentRoom.id,
        },
        name: s,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  };

  const [picturesArray, setPicturesArray] = useState<string[]>([]);
  const [removePicturesArray, setRemovePicturesArray] = useState<number[]>([]);
  const [pictureMessage, setPictureMessage] = useState("");
  const [picture, setPicture] = useState("");

  const changePicture = (e: any) => {
    setPicture(e.target.value);
    setPictureMessage("");
  };

  const removePictureAction = async (picture: number) => {
    await fetch(`http://localhost:3000/picture/` + picture, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  };

  const removePicture = (picture: number) => {
    setRemovePicturesArray([...removePicturesArray, picture]);
    setPictureMessage("Picture removed successfully");
  };

  const removePictureArray = () => {
    removePicturesArray.map((p: number) => removePictureAction(p));
  };

  const addPicture = (picture: string) => {
    setPicturesArray([...picturesArray, picture]);
    setPicture("");
    setPictureMessage("Picture added successfully");
  };

  const addPictureArray = () => {
    picturesArray.map((p: string) => addPictureAction(p));
  };

  const addPictureAction = async (p: string) => {
    const response = await fetch(`http://localhost:3000/picture`, {
      method: "POST",
      body: JSON.stringify({
        room: {
          id: currentRoom.id,
        },
        url: p,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  };

  return (
    <div>
      <FormEditRoom
        titleName={"EDIT ROOM"}
        submitForm={editRoom}
        onChangeForm={onChangeForm}
        currentRoom={currentRoom}
        buttonName="EDIT"
        removeClient={removeClient}
        removePicture={removePicture}
        addPicture={addPicture}
        picture={picture}
        changePicture={changePicture}
        pictureMessage={pictureMessage}
        removeService={removeService}
        addService={addService}
        service={service}
        changeService={changeService}
        serviceMessage={serviceMessage}
        userRole={currentUser.role}
      />
      <div style={{ display: "flex", justifyContent: "center" }}>
        {currentUser.role === "admin" ? (
          <ItemHistorial id={props.match.params.id} token={token} type="room" />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default EditRoomPage;
