import React, { useEffect, useState } from "react";
import { Message } from "../store/interfaces";
import { ThunkDispatch } from "redux-thunk";
import { bindActionCreators } from "redux";
import { createRoom } from "../store/hotel.action";
import { RootState } from "../store/root-reducer";
import { connect, useDispatch } from "react-redux";
import FormAddRoom from "./components/room/FormAddRoom";
import "./components/styles.css";
import Swal from "sweetalert2";
import CustomBackdrop from "./components/CustomBackdrop";
import { useHistory } from "react-router";
import hotelSlice from "../store/hotelSlice";

type RoomProps = LinkDispatchProps & LinkStateProps;

const AddRoomPage: React.FC<RoomProps> = ({
  createRoom,
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
      currentRoom.roomNumber === "" ||
      currentRoom.type === "" ||
      currentRoom.capacity === ""
    ) {
      dispatch(
        hotelSlice.actions.setMessage({
          header: "Error when creating the room",
          text: "Please complete all the fields",
          type: "error",
        })
      );
      return;
    }
    await createRoom(currentRoom, token);
    history.push("/home");
  }

  const [currentRoom, setCurrentRoom] = useState<any>({
    roomNumber: "",
    type: "",
    capacity: "",
  });

  const onChangeForm = (e: any) => {
    setCurrentRoom({
      ...currentRoom,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="to-do-list__container">
      <FormAddRoom
        submitForm={submitForm}
        onChangeForm={onChangeForm}
        currentRoom={currentRoom}
      />
      <CustomBackdrop isFetching={isFetching} />
    </div>
  );
};

interface LinkDispatchProps {
  createRoom: (room: any, token: string) => void;
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
  createRoom: bindActionCreators(createRoom, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddRoomPage);
