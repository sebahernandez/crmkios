import styled from "styled-components";
import { Form, Field } from "formik";

export const CardInitial = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  height: auto;
  justify-content: center;
`;

export const ContainerShop = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  img {
    width: 75%;
    height: 250px;
  }
`;

export const Subtitle = styled.div`
  display: flex;
  justify-content: center;
  padding: 0px 5px;
  p {
    font-weight: 700;
    font-size: 25px;
    text-align: center;
  }
`;

export const FormStyled = styled(Form)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80%;
  height: auto;
  p {
    padding-top: 50px;
    font-size: 15px;
  }

  @media (min-width: 480px) {
    width: 95%;
  }
`;

export const ContainerButtons = styled.div`
  margin: 20px 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const StyleButton = styled.button`
  margin: 0px 10px;
  background:darkorange;
  color: bisque;
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  border: none;
  outline: none;
  border-radius: 8px;
  font-weight: 500;
  font-size: 13px;
  box-shadow: 3px 6px 6px 2px rgba(0, 0, 0, 0.1);
`;

export const StyleButtonBack = styled.button`
  margin: 0px 10px;
  background: linear-gradient(
    90deg,
    rgba(70, 70, 70, 1) 78%,
    rgba(81, 81, 81, 1) 100%
  );
  color: bisque;
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  border: none;
  outline: none;
  border-radius: 8px;
  font-weight: 500;
  font-size: 13px;
  box-shadow: 3px 6px 6px 2px rgba(0, 0, 0, 0.1);
`;

export const FieldInput = styled(Field)`
  height: 50px;
  border-radius: 5px;
  background-color: white;
  border: none;
  width: 100%;
  margin: 10px 0px;
  padding:20px;
  div {
    height: ${(props) => (props.active ? "auto" : "0")};
  }
`;

export const FieldContainerError = styled.div`
  width: 250px;
  height: ${(props) => (props.active ? "100px" : "100px")};
  margin: 0px 10px;
`;
