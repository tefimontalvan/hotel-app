import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";

interface HeaderProps {
  userRole: any;
  logOut: () => void;
}

const HeaderAdmin: React.FC<HeaderProps> = ({ userRole, logOut }) => (
  <BottomNavigation sx={{ bgcolor: "#51472e" }}>
    <Box sx={style.itemsNav}>
      <Link to={"/home"} style={style.text}>
        HOTEL PAGE
      </Link>
    </Box>

    {userRole === "admin" ? (
      <div style={{ display: "flex" }}>
        <Box sx={{ margin: 1 }}>
          <Button variant="contained" size="large">
            <Link to={"/addUser"} className="formComponent__buttons-group">
              ADD USER &#43;
            </Link>
          </Button>
        </Box>
        <Box sx={{ margin: 1 }}>
          <Button variant="contained" size="large">
            <Link to={"/addRoom"} className="formComponent__buttons-group">
              ADD ROOM &#43;
            </Link>
          </Button>
        </Box>
      </div>
    ) : (
      ""
    )}
    <Box sx={{ margin: 1 }}>
      <Button variant="contained" size="large">
        <Link to={"/addClient"} className="formComponent__buttons-group">
          ADD CLIENT &#43;
        </Link>
      </Button>
    </Box>
    <Box sx={{ margin: 1 }}>
      <Button
        variant="contained"
        color="secondary"
        size="large"
        onClick={() => logOut()}
      >
        LOG OUT
        <CloseIcon className="itemColor" />
      </Button>
    </Box>
  </BottomNavigation>
);

const style = {
  text: {
    color: "white",
  },
  itemsNav: {
    margin: 2,
    flexGrow: 1,
  },
};

export default HeaderAdmin;
