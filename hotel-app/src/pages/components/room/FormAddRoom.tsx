import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import CardActions from "@mui/material/CardActions";
import React from "react";
import { RoomType, Room } from "../../../store/interfaces";
import "../styles.css";

interface FormProps {
  submitForm: any;
  onChangeForm: (e: any) => void;
  currentRoom: Room;
}

const FormAddRoom: React.FC<FormProps> = ({
  submitForm,
  onChangeForm,
  currentRoom,
}) => {
  return (
    <div className="customForm__form">
      <h1>ADD ROOM</h1>
      <form onSubmit={submitForm}>
        <TextField
          name="roomNumber"
          className="textField__input"
          value={currentRoom.roomNumber}
          label="Room Number"
          variant="outlined"
          onChange={onChangeForm}
        />
        <TextField
          name="capacity"
          className="textField__input"
          value={currentRoom.capacity}
          label="Room Capacity"
          variant="outlined"
          onChange={onChangeForm}
        />
        <FormControl className="customForm__form-control" component="fieldset">
          <FormLabel className="customForm__form-label" component="legend">
            {" "}
            Room type{" "}
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
        <CardActions className="formComponent__buttons-group">
          <Button type="submit" variant="contained" size="large">
            ADD
          </Button>
        </CardActions>
      </form>
    </div>
  );
};

export default FormAddRoom;
