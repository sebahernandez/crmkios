import { styled } from "baseui";
import Background from 'assets/image/bg-commerce.jpg';

export const Wrapper = styled("div", ({ $theme }) => ({
  width: "100vw",
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  /* backgroundColor: $theme.colors.borderF1, */
  backgroundImage: `url(${Background})`,
  backgroundSize:"cover",

  "@media only screen and (max-width: 520px)": {
    backgroundColor: "#fff"
  }
}));

export const FormWrapper = styled("div", () => ({
  width: "470px",
  borderRadius: "3px",
  backdropFilter: "blur(10px)",
  WebkitBackdropFilter: "blur(10px)",
  backgroundColor:'rgba(255, 255, 255, 0.3)',
  padding: "50px",
  display: "flex",
  flexDirection: "column",

  "@media only screen and (max-width: 500px)": {
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
