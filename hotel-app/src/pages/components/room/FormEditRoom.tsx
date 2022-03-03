import {
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  InputLabel,
} from "@material-ui/core";
import { MenuItem, Select, FormControl } from "@mui/material";
import Button from "@material-ui/core/Button";
import CardActions from "@mui/material/CardActions";
import React, { useEffect } from "react";
import { RoomType } from "../../../store/interfaces";
import "../styles.css";
import { getClients } from "../../../store/hotel.action";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from "@material-ui/icons/Close";

interface FormProps {
  titleName: string;
  submitForm: any;
  buttonName: string;
  onChangeForm: (e: any) => void;
  currentRoom: any;
  removeClient: () => void;
  removePicture: (picture: number) => void;
  addPicture: (picture: string) => void;
  picture: string;
  changePicture: (e: any) => void;
  pictureMessage: string;
  removeService: (service: number) => void;
  addService: (service: string) => void;
  service: string;
  changeService: (e: any) => void;
  serviceMessage: string;
  userRole: any;
}

const FormEditRoom: React.FC<FormProps> = ({
  titleName,
  submitForm,
  onChangeForm,
  buttonName,
  currentRoom,
  removeClient,
  removePicture,
  addPicture,
  picture,
  changePicture,
  pictureMessage,
  removeService,
  addService,
  service,
  changeService,
  serviceMessage,
  userRole,
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    //Consulta la API
    const loadClients = () => dispatch(getClients());
    loadClients();
  }, []);

  const clients = useSelector((state: any) => state.hotel.clients);

  return (
    <div className="customForm__form">
      <h1>{titleName}</h1>
      <form onSubmit={submitForm}>
        <div style={{ justifyContent: "center", display: "grid" }}>
          <FormControl style={{ margin: 1, width: 500 }}>
            <InputLabel
              style={{
                color: "white",
                display: "flex",
                marginTop: 20,
              }}
              id="demo-multiple-name-label"
            >
              Client
            </InputLabel>
            <Select
              variant="outlined"
              placeholder="Room Client"
              name="client"
              value={
                currentRoom.client
                  ? currentRoom.client.document
                    ? currentRoom.client.document
                    : currentRoom.client
                  : ""
              }
              onChange={onChangeForm}
            >
              {clients.map((element: any) => (
                <MenuItem
                  style={{
                    justifyContent: "center",
                    display: "grid",
                  }}
                  key={element.id}
                  value={element.document}
                >
                  {[element.name, " ", element.lastName, " ", element.document]}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <CardActions
          style={{
            color: "white",
            justifyContent: "flex-end",
          }}
        >
          <Button
            style={{ backgroundColor: "#51472e", color: "white" }}
            onClick={() => removeClient()}
            variant="contained"
            size="large"
          >
            REMOVE CLIENT
            <CloseIcon className="itemColor" />
          </Button>
        </CardActions>
        {userRole === "admin" ? (
          <div>
            <label
              style={{
                color: "white",
                display: "flex",
                marginTop: 20,
              }}
            >
              Room Capacity
            </label>
            <TextField
              name="capacity"
              className="textField__input"
              value={currentRoom.capacity}
              placeholder="Room Capacity"
              variant="outlined"
              onChange={onChangeForm}
            />

            <div
              style={{
                display: "grid",
                overflow: "hidden",
                marginTop: "20px",
              }}
            >
              {currentRoom.pictures &&
                currentRoom.pictures?.map((element: any) => (
                  <div
                    style={{
                      display: "flex",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                    }}
                  >
                    <Button
                      onClick={() => {
                        removePicture(element.id);
                      }}
                    >
                      <CloseIcon style={{ color: "white" }} />
                    </Button>
                    <label
                      style={{
                        position: "relative",
                        border: "1px ",
                        borderRadius: "10px",
                        width: "100%",
                        color: "white",
                        marginTop: "5px",
                        padding: "5px",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {element.url}
                    </label>
                  </div>
                ))}
            </div>

            <label
              style={{
                color: "white",
                display: "flex",
                marginTop: 20,
              }}
            >
              Pictures
            </label>
            <label
              style={{
                color: "white",
                backgroundColor: "#4ab29f",
                display: "flex",
                marginTop: 20,
              }}
            >
              {pictureMessage}
            </label>

            <TextField
              name="pictures"
              className="textField__input"
              style={{ width: 500 }}
              value={picture}
              placeholder="Room Picture (url)"
              variant="outlined"
              onChange={changePicture}
            />
            <CardActions
              style={{
                color: "white",
                justifyContent: "flex-end",
              }}
            >
              <Button
                style={{
                  backgroundColor: "#51472e",
                  color: "white",
                  marginBottom: "20px",
                }}
                variant="contained"
                size="large"
                onClick={() => addPicture(picture)}
              >
                ADD PICTURE &#43;
              </Button>
            </CardActions>

            <div
              style={{
                display: "grid",
                width: 400,
                overflow: "hidden",
                marginTop: "20px",
              }}
            >
              {currentRoom.services &&
                currentRoom.services?.map((element: any) => (
                  <div style={{ display: "flex" }}>
                    <Button
                      onClick={() => {
                        removeService(element.id);
                      }}
                    >
                      <CloseIcon style={{ color: "white" }} />
                    </Button>
                    <label
                      style={{
                        position: "relative",
                        border: "1px ",
                        borderRadius: "10px",
                        color: "white",
                        marginTop: "5px",
                        padding: "5px",
                      }}
                    >
                      {element.name}
                    </label>
                  </div>
                ))}
            </div>

            <label
              style={{
                color: "white",
                display: "flex",
                marginTop: 20,
              }}
            >
              Services
            </label>
            <label
              style={{
                color: "white",
                backgroundColor: "#4ab29f",
                display: "flex",
                marginTop: 20,
              }}
            >
              {serviceMessage}
            </label>

            <TextField
              name="services"
              className="textField__input"
              style={{ width: 500 }}
              value={service}
              placeholder="Room Service"
              variant="outlined"
              onChange={changeService}
            />
            <CardActions
              style={{
                color: "white",
                justifyContent: "flex-end",
              }}
            >
              <Button
                style={{
                  backgroundColor: "#51472e",
                  color: "white",
                  marginBottom: "20px",
                }}
                variant="contained"
                size="large"
                onClick={() => addService(service)}
              >
                ADD SERVICE &#43;
              </Button>
            </CardActions>

            <FormControl
              className="customForm__form-control"
              component="fieldset"
            >
              <FormLabel className="customForm__form-label" component="legend">
                Room type
              </FormLabel>
              <RadioGroup
                name="type"
                aria-label="Room type"
                value={currentRoom.type}
                onChange={onChangeForm}
                className="radioGroup"
              >
                <FormControlLabel
                  value={RoomType.NORMAL}
                  control={<Radio />}
                  label="Normal"
                />
                <FormControlLabel
                  value={RoomType.DOUBLE}
                  control={<Radio />}
                  label="Double"
                />
                <FormControlLabel
                  value={RoomType.SUITE}
                  control={<Radio />}
                  label="Suite"
                />
              </RadioGroup>
            </FormControl>
          </div>
        ) : (
          ""
        )}

        <CardActions className="formComponent__buttons-group">
          <Button type="submit" variant="contained" size="large">
            {buttonName}
          </Button>
        </CardActions>
      </form>
    </div>
  );
};

export default FormEditRoom;
