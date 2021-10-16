import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

export const navBar = makeStyles((theme) => ({
  appBar: {
    background: "#029e7fe6",
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
    fontSize: "12px",
    margin: "0px 15px",
  },
  search: {
    [theme.breakpoints.down("sm")]: {
      backgroundColor: "#fff",
      width: "100px",
      borderRadius: "2px",
    },
    [theme.breakpoints.up("md")]: {
      backgroundColor: "#fff",
      width: "200px",
      borderRadius: "2px",
    },
    [theme.breakpoints.up("lg")]: {
      backgroundColor: "#fff",
      width: "330px",
      borderRadius: "2px",
    },
  },
  buttonAction: {
    background: "orange",
    color: "white",
    border: "none",
    outline: "none",
    fontFamily: "Roboto",
    fontWeight: 600,
    fontSize: "14px",
    textTransform: "uppercase",

    [theme.breakpoints.down("xs")]: {
      fontSize: "8px",
    },
  },



  buttonUser: {
    fontSize: "30px",
  },
}));
