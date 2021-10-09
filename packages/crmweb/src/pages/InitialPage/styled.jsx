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
  margin-top: 0px;
 

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
    width:90%;
  }
`;

export const Subtitle = styled.div`
  width: 90%;
  display: flex;
  color: white;
  font-size: 18px;
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
  padding-top: 0px;
  font-size: 26px;
  justify-content: center;
`;

export const InitialDescription = styled.div`
  display: flex;
  font-size: 15px;
  justify-content: center;
  margin: 0px 0px;
  width: 85%;
  p {
    text-align: center;
    line-height: 25px;
  }
`;

export const LabelInfo = styled.div`
  display:flex;
  div {
    padding: 0px;
  }
`;

export const LabelButton = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 40px 0px;
  width: 100%;

  @media (max-width: 768px) {
    width:100%;
  }

  h5 {
    margin: 10px 10px;
    font-size: 13px;
  }
`;

export const TextFieldsInitial = styled.div`
  display: flex;
  flex-direction:column;
  width: 100%;
 
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
  box-shadow: 3px 6px 20px 1px rgba(0, 0, 0, 0.1);
`;

export const FieldContainerError = styled.div`
  width:300px;
  height: ${(props) => (props.active ? "80px" : "80px")};
  margin:0;
`;

export const FieldInput = styled(Field)`
  position:relative;

  height: 50px;
  border-radius: 5px;
  background-color: white;
  border: none;
  width: 100%;
  padding:20px;

  div {
    height: ${(props) => (props.active ? "auto" : "0")};
  }
`;

