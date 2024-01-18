import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";

import classes from "./style.module.scss";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{ flexGrow: 1 }} s>
      <AppBar
        position="static"
        elevation={0}
        style={{ background: "transparent", paddingBottom: "24px" }}
      >
        <Toolbar className={classes.navbar}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          ></IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
            style={{
              fontWeight: 700,
              fontSize: "45px",
              color: "#404040",
              lineHeight: "normal",
              cursor: "pointer",
            }}
            onClick={() => {
              navigate("/");
            }}
          >
            Delicacy
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
