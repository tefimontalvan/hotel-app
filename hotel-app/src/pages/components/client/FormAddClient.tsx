import { TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import CardActions from "@mui/material/CardActions";
import React from "react";
import { Client } from "../../../store/interfaces";
import "../styles.css";

interface FormProps {
  submitForm: any;
  onChangeForm: (e: any) => void;
  currentClient: Client;
}

const FormAddClient: React.FC<FormProps> = ({
  submitForm,
  onChangeForm,
  currentClient,
}) => {
  return (
    <div className="customForm__form">
      <h1>ADD CLIENT</h1>
      <form onSubmit={submitForm}>
        <TextField
          name="name"
          className="textField__input"
          value={currentClient.name}
          label="Client Name"
          variant="outlined"
          onChange={onChangeForm}
        />
        <TextField
          name="lastName"
          className="textField__input"
          value={currentClient.lastName}
          label="Client Last Name"
          variant="outlined"
          onChange={onChangeForm}
        />
        <TextField
          name="document"
          className="textField__input"
          value={currentClient.document}
          label="Client Document"
          variant="outlined"
          onChange={onChangeForm}
        />
        <CardActions className="formComponent__buttons-group">
          <Button type="submit" variant="contained" size="large">
            ADD
          </Button>
        </CardActions>
      </form>
    </div>
  );
};

export default FormAddClient;
