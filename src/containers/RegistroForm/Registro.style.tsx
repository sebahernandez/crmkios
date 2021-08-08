import { styled } from "baseui";
import Background from 'assets/image/bg-commerce.jpg';

 

export const FormWrapper = styled("div", () => ({
  width: "500px",
  borderRadius: "10px",
  background: "assets/image/bg-register.jpg",
  maxWidth: "800px",
  margin: "0",
  backgroundSize: "cover",
  padding: "50px",
  display: "flex",
  flexDirection: "column",

  "@media only screen and (max-width: 700px)": {
    width: "100%",
    padding: "30px"
  }
}));

export const LogoWrapper = styled("div", () => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: "20px"
}));

export const LogoImage = styled("img", () => ({
  display: "block",
  backfaceVisibility: "hidden",
  maxWidth: "150px"
}));
