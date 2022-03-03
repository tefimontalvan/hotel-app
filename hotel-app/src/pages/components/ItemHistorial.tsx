import React, { useEffect } from "react";
import "./styles.css";
import Tabs from "@mui/material/Tabs";
import Box from "@mui/material/Box";
import moment from "moment";

interface ItemProps {
  id: any;
  token: string;
  type: string;
}

const ItemHistorial: React.FC<ItemProps> = ({ id, token, type }) => {
  const [value, setValue] = React.useState(0);

  const [historial, setHistorial] = React.useState([]);

  useEffect(() => {
    requestData(id, token, type);
  }, []);

  const requestData = async (id: number, token: string, type: string) => {
    if (type === "room") {
      const response = await fetch(`http://localhost:3000/history/room`, {
        method: "POST",
        body: JSON.stringify({
          id: id,
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const getHistorial = await response.json();

      setHistorial(getHistorial);
    } else {
      const response = await fetch(`http://localhost:3000/history/client`, {
        method: "POST",
        body: JSON.stringify({
          id: id,
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const getHistorial = await response.json();

      setHistorial(getHistorial);
    }
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <div
      style={{
        maxWidth: "500px",
        display: "grid",
        backgroundColor: "#625943",
        padding: "20px",
        boxSizing: "border-box",
        borderRadius: "10px",
      }}
    >
      <label
        style={{
          color: "white",
          display: "flex",
        }}
      >
        Historial: {historial.length === 0 ? "None" : ""}
      </label>
      <Box sx={{ maxWidth: 480, bgcolor: "#625943" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
          style={{ backgroundColor: "#625943" }}
        >
          {historial &&
            historial?.map((h: any) => (
              <div
                key={h.id}
                style={{
                  display: "grid",
                  backgroundColor: "#51472e",
                  padding: "20px",
                  boxSizing: "border-box",
                  borderRadius: "10px",
                  margin: 10,
                }}
              >
                <div style={{ color: "white" }}>ID: {h.id}</div>
                <div style={{ color: "white" }}>
                  CHECKIN: {moment(h.checkIn_at).format("DD/MM/YYYY HH:mm")}
                </div>
                <div style={{ color: "white" }}>
                  CHECKOUT: {moment(h.checkOut_at).format("DD/MM/YYYY HH:mm")}
                </div>
              </div>
            ))}
        </Tabs>
      </Box>
    </div>
  );
};

export default ItemHistorial;
