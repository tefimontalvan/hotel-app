import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  FormLabel,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Button from "@material-ui/core/Button";
import CardActions from "@mui/material/CardActions";
import React from "react";
import "../styles.css";
import { UserRole } from "../../../store/interfaces";

interface FormProps {
  submitForm: any;
  onChangeForm: (e: any) => void;
  currentUser: any;
  handleClickShowPassword: () => void;
  handleMouseDownPassword: (e: any) => void;
}

const FormAddUser: React.FC<FormProps> = ({
  submitForm,
  onChangeForm,
  currentUser,
  handleClickShowPassword,
  handleMouseDownPassword,
}) => {
  return (
    <div className="customForm__form">
      <h1>ADD USER</h1>
      <form onSubmit={submitForm}>
        <TextField
          name="name"
          className="textField__input"
          value={currentUser.name}
          label="User Name"
          variant="outlined"
          onChange={onChangeForm}
        />
        <TextField
          name="username"
          className="textField__input"
          value={currentUser.username}
          label="User Username"
          variant="outlined"
          onChange={onChangeForm}
        />
        <TextField
          name="email"
          className="textField__input"
          value={currentUser.email}
          label="User Email"
          variant="outlined"
          onChange={onChangeForm}
        />
        <FormControl className="textField__input" variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            name="password"
            type={currentUser.showPassword ? "text" : "password"}
            value={currentUser.password}
            onChange={onChangeForm}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {currentUser.showPassword ? (
                    <VisibilityOff />
                  ) : (
                    <Visibility />
                  )}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        <FormControl className="customForm__form-control" component="fieldset">
          <FormLabel className="customForm__form-label" component="legend">
            {" "}
            User Role{" "}
          </FormLabel>
          <RadioGroup
            name="role"
            aria-label="User Role"
            value={currentUser.role}
            onChange={onChangeForm}
            className="radioGroup"
          >
            <FormControlLabel
              value={UserRole.ADMIN}
              control={<Radio />}
              label="Admin"
            />
            <FormControlLabel
              value={UserRole.RECEPCIONIST}
              control={<Radio />}
              label="Recepcionist"
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

export default FormAddUser;
