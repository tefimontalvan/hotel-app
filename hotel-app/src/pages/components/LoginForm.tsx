import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import CardActions from "@mui/material/CardActions";
import React from "react";
import "./styles.css";
import { UserLogin } from "../../store/interfaces";
import { Visibility, VisibilityOff } from "@mui/icons-material";

interface FormProps {
  titleName: string;
  submitForm: any;
  buttonName: string;
  onChangeForm: (e: any) => void;
  handleClickShowPassword: () => void;
  handleMouseDownPassword: (e: any) => void;
  values: UserLogin;
}

const LoginForm: React.FC<FormProps> = ({
  titleName,
  submitForm,
  onChangeForm,
  buttonName,
  handleClickShowPassword,
  handleMouseDownPassword,
  values,
}) => {
  return (
    <div className="customForm__form">
      <h1>{titleName}</h1>
      <form onSubmit={submitForm}>
        <TextField
          name="username"
          className="textField__input"
          value={values.username}
          label="Username"
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
            type={values.showPassword ? "text" : "password"}
            value={values.password}
            onChange={onChangeForm}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        <CardActions className="formComponent__buttons-group">
          <Button type="submit" variant="contained" size="large">
            {buttonName}
          </Button>
        </CardActions>
      </form>
    </div>
  );
};

export default LoginForm;
