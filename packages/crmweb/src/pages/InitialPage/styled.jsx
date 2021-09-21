import styled from "styled-components";

import { Field } from "formik";

export const CardInitial = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 10px;
`;

export const FormContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  margin-top: 30px;

  form {
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;
  }
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 10px;
  img {
    width: 300px;
  }
`;

export const Subtitle = styled.div`
  width: 90%;
  display: flex;
  color: white;
  font-size: 13px;
  text-align: center;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  @media (min-width: 640px) {
    width: 65%;
  }
`;

export const InitialComment = styled.div`
  display: flex;
  padding-top: 50px;
  font-size: 26px;
  justify-content: center;
`;

export const InitialDescription = styled.div`
  display: flex;
  font-size: 15px;
  justify-content: center;
  margin: 10px 0px;
  width: 85%;
  p {
    text-align: center;
    line-height: 25px;
  }
`;

export const LabelInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  div {
    padding: 3px;
  }
`;

export const LabelButton = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 10px 0px;
  width: 85%;

  h5 {
    margin: 10px;
    font-size: 13px;
  }
`;

export const TextFieldsInitial = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  @media (min-width: 769px) {
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    width: 80%;
  }
`;

export const ButtonMaterial = styled.button`
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
  background: rgb(255, 161, 19);
  background: linear-gradient(
    90deg,
    rgba(255, 161, 19, 1) 40%,
    rgba(255, 184, 78, 1) 100%
  );
`;

export const StyleButton = styled.button`
  background: linear-gradient(
    90deg,
    rgba(255, 161, 19, 1) 40%,
    rgba(255, 184, 78, 1) 100%
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

export const FieldContainerError = styled.div`
  width: 250px;
  height: ${(props) => (props.active ? "80px" : "40px")};
  margin: 0px 10px;
`;

export const FieldInput = styled(Field)`
  height: 30px;
  border-radius: 5px;
  background-color: white;
  border: none;
  width: 100%;
  margin: 10px 0px;

  div {
    height: ${(props) => (props.active ? "auto" : "0")};
  }
`;
