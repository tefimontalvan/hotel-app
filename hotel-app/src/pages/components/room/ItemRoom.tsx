import React from "react";
import Button from "@material-ui/core/Button";
import CardActions from "@mui/material/CardActions";
import EditIcon from "@material-ui/icons/Edit";
import CloseIcon from "@material-ui/icons/Close";
import { Room } from "../../../store/interfaces";
import "../styles.css";
import ImageCarousel from "../ImageCarousel";

interface ItemProps {
  room: any;
  removeRoom: (room: Room) => void;
  canEditRoom: (room: Room) => void;
}

const ItemRoom: React.FC<ItemProps> = ({ room, removeRoom, canEditRoom }) => {
  return (
    <div className="container">
      <div
        className="content"
        style={{ display: "grid", height: 400, width: 300 }}
      >
        <div
          style={{
            height: 200,
            overflow: "hidden",
          }}
        >
          <ImageCarousel imagesArray={room.pictures.map((p: any) => p.url)} />
        </div>
        <div className="item--type">Room Number: {room.roomNumber}</div>
        <div className="item--type">Type: {room.type}</div>
        <div className="item--type">Capacity: {room.capacity}</div>
        {room.empty ? (
          <div className="item--type">Empty: True</div>
        ) : (
          <div className="item--type">Empty: False</div>
        )}
        {room.empty ? (
          <div className="item--type">Client: None</div>
        ) : (
          <div className="item--type">Client: {room.client?.name}</div>
        )}
        {room.services !== [] ? (
          <div className="item--type">
            Services:
            {room.services.map((s: any) => {
              return " " + s.name;
            })}
          </div>
        ) : (
          <div className="item--type">Services: None</div>
        )}
        <CardActions className="itemComponent__buttons-group">
          <Button onClick={() => canEditRoom(room)} variant="contained">
            <EditIcon className="itemColor" />
          </Button>

          <Button
            onClick={() => removeRoom(room)}
            variant="contained"
            color="secondary"
          >
            <CloseIcon className="itemColor" />
          </Button>
        </CardActions>
      </div>
    </div>
  );
};

export default ItemRoom;
