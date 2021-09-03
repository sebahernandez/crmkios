import { makeStyles } from "@material-ui/core/styles";

export const generalInfoStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    minWidth: 275,
    width: "100%",
    margin: "20px 0px",
    height: "96px",
    boxShadow: "2px 2px 10px rgba(0,0,0,0.2)",
  },
  cardContent: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  contentCard: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  containerCard: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0px 15px",
    width: "25%",
  },
  cardItem: {
    color: "#555555",
    fontSize: "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  divider: {
    height: "80%",
    width: "3px",
  },
  cardItemText: {
    color: "#929292",
    marginLeft: "30px",
    fontSize: "19px",
    fontWeight: 400,
  },

  pos: {
    marginBottom: 12,
  },
}));
