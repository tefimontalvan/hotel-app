import { createSlice } from "@reduxjs/toolkit";
import { HotelState } from "./interfaces";

const initialState: HotelState = {
  user: "",
  token: "",
  clients: [],
  rooms: [],
  users: [],
  isFetching: false,
  showMessage: false,
  message: null,
};

export default createSlice({
  name: "hotel",
  initialState,
  reducers: {
    loginUser: (state, { payload }) => ({
      ...state,
      isFetching: false,
      user: payload.acces_token,
      token: payload.token,
    }),
    stageError: (state, { payload }) => ({
      ...state,
      isFetching: false,
      error: payload,
    }),
    updateRoom: (state, { payload }) => ({
      ...state,
      isFetching: false,
      rooms: state.rooms.map((room) =>
        room.id === payload.id ? (room = payload) : room
      ),
    }),
    createRoom: (state, { payload }) => ({
      ...state,
      isFetching: false,
      rooms: [...state.rooms, payload],
    }),
    createClient: (state, { payload }) => ({
      ...state,
      isFetching: false,
      clients: [...state.clients, payload],
    }),
    createUser: (state, { payload }) => ({
      ...state,
      isFetching: false,
      users: [...state.users, payload],
    }),
    setMessage: (state, { payload }) => ({
      ...state,
      message: payload,
      isFetching: false,
    }),
    getClients: (state, { payload }) => ({
      ...state,
      isFetching: false,
      clients: payload.data,
      message: null,
    }),
    getUsers: (state, { payload }) => ({
      ...state,
      isFetching: false,
      users: payload,
      message: null,
    }),
    getRooms: (state, { payload }) => ({
      ...state,
      isFetching: false,
      rooms: payload,
      message: null,
    }),
    deleteRoom: (state, { payload }) => ({
      ...state,
      isFetching: false,
      rooms: state.rooms.filter((room) => room.id !== payload.id),
    }),
    allroomsRequest: (state) => ({
      ...state,
      isFetching: true,
    }),
  },
});
