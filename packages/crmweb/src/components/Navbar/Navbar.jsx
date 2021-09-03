import React from "react";
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  InputBase,
} from "@material-ui/core";
import { AccountCircle, Input } from "@material-ui/icons";
import { navBar } from "./styles";

export const Navbar = () => {
  const classes = navBar();

  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar>
        <div className={classes.menu}>
          <div className={classes.searchBar}>
            <h3 className={classes.text}>Buscar</h3>

            <div className={classes.search}>
              <InputBase
                className={classes.input}
                inputProps={{ "aria-label": "search" }}
              />
            </div>
          </div>
          <Input style={{ margin: "0px 10px" }} />
          <Button variant="contained" className={classes.buttonAction}>
            Ver tienda
          </Button>
          <IconButton
            edge="end"
            onClick={() => console.log("test")}
            color="inherit"
          >
            <AccountCircle className={classes.buttonUser} />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
};
