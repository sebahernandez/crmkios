import { Field, Form } from "formik";
import styled from "styled-components";

export const CardInitial = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 250px;
    height: 250px;
  }
`;

export const ContainerWeb = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  img {
    width: 300px;
    height: 250px;
  }

  @media (min-width: 769px) {
    img {
      width: 400px;
      height: 250px;
    }
  }
`;

export const Subtitle = styled.div`
  display: flex;
  justify-content: center;
  padding: 0px 10px;
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

  @media (min-width: 320px) {
    width: 80%;
  }
`;

export const UrlLabel = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  p {
    font-weight: 700;
    font-size: 25px;
    display: none;
  }

  @media (min-width: 900px) {
    p {
      display: flex;
      font-weight: 700;
      font-size: 25px;
    }
  }
`;

export const LabelRadio = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LabelTextRadio = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FieldInput = styled(Field)`
  height: 30px;
  border-radius: 5px;
  padding: 5px 10px;
  background-color: white;
  border: none;
  width: 330px;
  margin: 10px 0px;
`;

export const ContainerButtons = styled.div`
  margin: 20px 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const TopSeparator = styled.div`
  padding-top: 50px;
`;

export const StyleButton = styled.button`
  margin: 0px 10px;
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
