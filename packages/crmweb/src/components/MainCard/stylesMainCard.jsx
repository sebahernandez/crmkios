import { makeStyles } from "@material-ui/core";

export const styleMainCard = makeStyles({
  root: {
    minWidth: 275,
    width: "100%",
    height: "300px",
    background: "linear-gradient(to right, #4CC58B 100%, #0F9E59 51%)",
    color: "white",
    boxShadow: "2px 2px 10px rgba(0,0,0,0.2)",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  cardContent: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  saludo: {
    fontSize: "40px",
    marginTop: "40px",
    fontWeight: "bold",
  },
  progressbar: {
    position: "relative",
    width: "308px",
    height: "11px",
    backgroundColor: "#FFEDA8",
    borderRadius: "10px",
    marginTop: "10px",

    "& div": {
      borderRadius: "10px",
      backgroundColor: "#FFAC30",
    },
  },
});
