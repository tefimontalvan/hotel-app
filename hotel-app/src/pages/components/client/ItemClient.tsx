import React from "react";
import "../styles.css";
import ItemHistorial from "../ItemHistorial";

interface ItemProps {
  client: any;
  token: string;
  rol: string;
}

const ItemClient: React.FC<ItemProps> = ({ client, token, rol }) => {
  return (
    <div
      style={{
        height: "300px",
        maxWidth: "520px",
        display: "block",
        backgroundColor: "#625943",
        padding: "20px",
        boxSizing: "border-box",
        borderRadius: "10px",
        margin: "40px",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div className="item--type">
        Client Name: {client.name + " " + client.lastName}
      </div>
      <div className="item--type">Document: {client.document}</div>

      {client.room === [] ? (
        <div className="item--type">Room: None</div>
      ) : (
        <div className="item--type">
          Room:{" "}
          {client.room.map((r: any) => {
            return " " + r.roomNumber;
          })}
        </div>
      )}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          boxSizing: "border-box",
        }}
      >
        {rol === "admin" ? (
          <ItemHistorial id={client.id} token={token} type="client" />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default ItemClient;
