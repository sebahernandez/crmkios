import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

export const navBar = makeStyles((theme) => ({
  appBar: {
    background: "#4CC58B",
  },
  menu: {
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      display: "flex",
      alignItems: "center",
      padding: "5px",
      fontFamily: "Roboto",
      fontWeight: 500,
    },
    [theme.breakpoints.down("md")]: {
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: "5px",
      fontFamily: "Roboto",
      fontWeight: 500,
    },
    [theme.breakpoints.up("lg")]: {
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: "5px",
      fontFamily: "Roboto",
      fontWeight: 500,
    },
  },

  searchBar: {
    width: "auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  input: {
    width: "100%",
    padding: "0px 10px",
  },
  text: {
    fontSize: "18px",
    margin: "0px 15px",
  },
  search: {
    [theme.breakpoints.down("sm")]: {
      backgroundColor: "#fff",
      width: "100px",
      borderRadius: "4px",
    },
    [theme.breakpoints.up("md")]: {
      backgroundColor: "#fff",
      width: "200px",
      borderRadius: "4px",
    },
    [theme.breakpoints.up("lg")]: {
      backgroundColor: "#fff",
      width: "230px",
      borderRadius: "4px",
    },
  },
  buttonAction: {
    background: "orange",
    color: "white",
    border: "none",
    outline: "none",
    fontFamily: "Roboto",
    fontWeight: 700,
    fontSize: "14px",
    textTransform: "none",
  },
  buttonUser: {
    fontSize: "30px",
  },
}));
