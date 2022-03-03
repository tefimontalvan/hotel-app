import { Room, UserLogin } from "./interfaces";
import hotelSlice from "./hotelSlice";
import { Dispatch } from "redux";
import hotelService from "../services/hotel.service";
import { RootState } from "./root-reducer";

enum Action {
  LISTROOMS = 1,
  LISTCLIENTS,
  LISTUSERS,
  DELETE,
  LOGIN,
  EDIT,
  CREATEROOM,
  CREATECLIENT,
  CREATEUSER,
}

function handleServerResponse(
  action: Action,
  response: any,
  dispatch: (RoomsActions: { payload: any; type: string }) => void
): boolean {
  if (response.error || ("" + response.statusCode)[0] === "5") {
    dispatch(
      hotelSlice.actions.stageError({
        error: response.message || response.error,
      })
    );
    return false;
  }
  switch (action) {
    case Action.LOGIN:
      dispatch(hotelSlice.actions.loginUser(response));
      break;
    case Action.LISTROOMS:
      dispatch(hotelSlice.actions.getRooms(response));
      break;
    case Action.LISTCLIENTS:
      dispatch(hotelSlice.actions.getClients(response));
      break;
    case Action.LISTUSERS:
      dispatch(hotelSlice.actions.getUsers(response));
      break;
    case Action.DELETE:
      dispatch(hotelSlice.actions.deleteRoom(response));
      break;
    case Action.CREATEROOM:
      dispatch(hotelSlice.actions.createRoom(response));
      break;
    case Action.CREATECLIENT:
      dispatch(hotelSlice.actions.createClient(response));
      break;
    case Action.CREATEUSER:
      dispatch(hotelSlice.actions.createUser(response));
      break;
    case Action.EDIT:
      dispatch(hotelSlice.actions.updateRoom(response));
      break;
    default:
      console.error("action not handled??", action);
  }
  return true;
}

function handleRejected(
  e: string,
  dispatch: (StageActions: { payload: any; type: string }) => void
) {
  // e.g. server is down
  dispatch(
    hotelSlice.actions.stageError({ error: "Error al conectar con servidor" })
  );
}

export const createRoom = (room: any, token: string) => {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    dispatch(hotelSlice.actions.allroomsRequest());
    if (getState().hotel.rooms.find((r) => r.roomNumber === room.roomNumber)) {
      dispatch(
        hotelSlice.actions.setMessage({
          header: "Error when creating the room",
          text: "Existing room name. Enter another.",
          type: "error",
        })
      );
    } else {
      const response = await hotelService
        .createRoom(room, token)
        .catch((e: any) => {
          handleRejected(e, dispatch);
        });
      if (!response) return;
      handleServerResponse(Action.CREATEROOM, response, dispatch);
      dispatch(
        hotelSlice.actions.setMessage({
          header: "Room created successfully",
          text: "Room created successfully",
          type: "success",
        })
      );
    }
  };
};

export const createUser = (user: any, token: string) => {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    dispatch(hotelSlice.actions.allroomsRequest());
    if (
      getState().hotel.users.find(
        (u) => u.username === user.username || u.email === user.email
      )
    ) {
      dispatch(
        hotelSlice.actions.setMessage({
          header: "Error when creating the user",
          text: "Existing user username/email. Enter another.",
          type: "error",
        })
      );
    } else {
      const response = await hotelService
        .createUser(user, token)
        .catch((e: any) => {
          handleRejected(e, dispatch);
        });
      if (!response) return;
      handleServerResponse(Action.CREATEUSER, response, dispatch);
      dispatch(
        hotelSlice.actions.setMessage({
          header: "User created successfully",
          text: "User created successfully",
          type: "success",
        })
      );
    }
  };
};

export const createClient = (client: any) => {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    dispatch(hotelSlice.actions.allroomsRequest());
    if (getState().hotel.clients.find((c) => c.document === client.document)) {
      dispatch(
        hotelSlice.actions.setMessage({
          header: "Error when creating the client",
          text: "Existing client document. Enter another.",
          type: "error",
        })
      );
    } else {
      const response = await hotelService
        .createClient(client)
        .catch((e: any) => {
          handleRejected(e, dispatch);
        });
      if (!response) return;
      handleServerResponse(Action.CREATECLIENT, response, dispatch);
      dispatch(
        hotelSlice.actions.setMessage({
          header: "Client created successfully",
          text: "Client created successfully",
          type: "success",
        })
      );
    }
  };
};

export const loginUser = (user: UserLogin) => {
  return async (dispatch: Dispatch) => {
    dispatch(hotelSlice.actions.allroomsRequest());
    const response = await hotelService.loginUser(user).catch((e: any) => {
      handleRejected(e, dispatch);
    });
    if (response === undefined) {
      dispatch(
        hotelSlice.actions.setMessage({
          header: "Login failed",
          text: "Wrong credentials",
          type: "error",
        })
      );
      return;
    }
    handleServerResponse(Action.LOGIN, response, dispatch);
    dispatch(
      hotelSlice.actions.setMessage({
        header: "Successful login",
        text: "The user has successfully logged in",
        type: "success",
      })
    );
    return response.acces_token;
  };
};

export const getRooms = () => {
  return async (dispatch: Dispatch) => {
    dispatch(hotelSlice.actions.allroomsRequest());
    const response = await hotelService.getRooms().catch((e) => {
      handleRejected(e, dispatch);
    });
    if (!response) return;
    handleServerResponse(Action.LISTROOMS, response, dispatch);
  };
};

export const getUsers = () => {
  return async (dispatch: Dispatch) => {
    dispatch(hotelSlice.actions.allroomsRequest());
    const response = await hotelService.getUsers().catch((e) => {
      handleRejected(e, dispatch);
    });
    if (!response) return;
    handleServerResponse(Action.LISTUSERS, response, dispatch);
  };
};

export const getClients = () => {
  return async (dispatch: Dispatch) => {
    dispatch(hotelSlice.actions.allroomsRequest());
    const response = await hotelService.getClients().catch((e) => {
      handleRejected(e, dispatch);
    });
    if (!response) return;
    handleServerResponse(Action.LISTCLIENTS, response, dispatch);
  };
};

export const removeRoomAction = (room: Room, user: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(hotelSlice.actions.allroomsRequest());
    const response = await hotelService.deleteRoom(room, user).catch((e) => {
      handleRejected(e, dispatch);
    });
    if (!response) return;
    handleServerResponse(Action.DELETE, response, dispatch);
    dispatch(
      hotelSlice.actions.setMessage({
        header: "Room deleted correctly",
        text: "Room has been successfully deleted",
        type: "success",
      })
    );
  };
};

export const canEditRoomAction = (
  room: Room,
  id: number,
  token: string,
  client: any
) => {
  return async (dispatch: Dispatch) => {
    dispatch(hotelSlice.actions.allroomsRequest());
    const response = await hotelService
      .updateRoom(room, id, token, client)
      .catch((e) => {
        handleRejected(e, dispatch);
      });
    if (!response) return;
    handleServerResponse(Action.EDIT, response, dispatch);
    dispatch(
      hotelSlice.actions.setMessage({
        header: "Room edited correctly",
        text: "The room has been edited correctly",
        type: "success",
      })
    );
  };
};
