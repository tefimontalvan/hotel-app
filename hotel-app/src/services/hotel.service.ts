import { Room, UserLogin } from "../store/interfaces";
import { getDefaultHeaders } from "./utils.service";

class HotelService {
  async loginUser(user: UserLogin): Promise<any> {
    const response = await fetch(`http://localhost:3000/user/login`, {
      method: "POST",
      body: JSON.stringify({
        username: user.username,
        password: user.password,
      }),
      headers: getDefaultHeaders(),
    });
    return await response.json();
  }

  async getRooms(): Promise<any> {
    const response = await fetch(`http://localhost:3000/room`, {
      method: "GET",
      headers: getDefaultHeaders(),
    });
    return await response.json();
  }

  async getUsers(): Promise<any> {
    const response = await fetch(`http://localhost:3000/user`, {
      method: "GET",
      headers: getDefaultHeaders(),
    });
    return await response.json();
  }

  async getClients(): Promise<any> {
    const response = await fetch(`http://localhost:3000/client`, {
      method: "GET",
      headers: getDefaultHeaders(),
    });
    return await response.json();
  }

  async emptyRoom(id: number): Promise<any> {
    const response = await fetch(`http://localhost:3000/room/${id}`, {
      method: "PUT",
      headers: getDefaultHeaders(),
    });
    return await response.json();
  }

  async uploadRoom(
    room: Room,
    id: number,
    token: string,
    client: any
  ): Promise<any> {
    const response = await fetch(`http://localhost:3000/room/${id}`, {
      method: "PATCH",
      body: JSON.stringify({
        capacity: room.capacity,
        type: room.type,
        client: client,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  }

  async updateRoom(
    room: Room,
    id: number,
    token: string,
    client: any
  ): Promise<any> {
    const roomFind: any = await this.getOneRoom(id);
    if (
      (roomFind.client === null && client !== null) ||
      (roomFind.client !== null && client === null)
    ) {
      await this.uploadRoom(room, id, token, client);
      await this.emptyRoom(id);
      return await this.getOneRoom(id);
    }
    return await this.uploadRoom(room, id, token, client);
  }

  async getOneRoom(id: number): Promise<any> {
    const response = await fetch(`http://localhost:3000/room/${id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  }

  async createClient(client: any): Promise<any> {
    const response = await fetch(`http://localhost:3000/client`, {
      method: "POST",
      body: JSON.stringify({
        name: client.name,
        lastName: client.lastName,
        document: client.document,
      }),
      headers: getDefaultHeaders(),
    });
    return await response.json();
  }

  async createRoom(room: any, token: string): Promise<any> {
    const response = await fetch(`http://localhost:3000/room`, {
      method: "POST",
      body: JSON.stringify({
        roomNumber: room.roomNumber,
        type: room.type,
        capacity: room.capacity,
        empty: true,
        active: true,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  }

  async createUser(user: any, token: string): Promise<any> {
    const response = await fetch(`http://localhost:3000/user`, {
      method: "POST",
      body: JSON.stringify({
        name: user.name,
        username: user.username,
        email: user.email,
        password: user.password,
        role: user.role,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  }

  async deleteRoom(room: Room, user: string): Promise<any> {
    const response = await fetch(`http://localhost:3000/room/${room.id}`, {
      method: "PATCH",
      body: JSON.stringify({
        active: false,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${user}`,
      },
    });
    return await response.json();
  }
}

const hotelService = new HotelService();

export default hotelService;
