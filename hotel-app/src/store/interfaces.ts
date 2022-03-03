export interface UserLogin {
  username: string;
  password: string;
  showPassword: boolean;
}

export interface UserLogin {
  username: string;
  password: string;
}

export interface User {
  id?: number;
  name: string;
  username: string;
  password: string;
  email: string;
  role: string;
}

export interface Client {
  id?: number;
  name: string;
  lastName: string;
  document: number;
}

export interface Room {
  id?: number;
  roomNumber: string;
  empty: boolean;
  type: string;
  capacity: number;
  active: boolean;
  client?: Client;
  pictures: any;
  extraService?: [];
}

export interface HotelState {
  user: string;
  token: string;
  clients: Client[];
  rooms: Room[];
  users: User[];
  isFetching: boolean;
  message: Message | null;
  showMessage?: boolean;
  error?: string | null;
}

export interface Message {
  header: string;
  text?: string;
  type: "success" | "warning" | "error" | "info";
}

export enum RoomType {
  NORMAL = "Normal",
  DOUBLE = "Double",
  SUITE = "Suite",
}

export enum UserRole {
  ADMIN = "admin",
  RECEPCIONIST = "receptionist",
}
