import styled from "@emotion/styled";

export const Root = styled.div`
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
  width: 100%;
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: auto;
  width: 90%;
  height: auto;
  margin: 0;
  hr {
    display: none;
  }
  @media (min-width: 480px) {
  }
  @media (min-width: 600px) {
    width: 80%;
  }
  @media (min-width: 768px) {
    width: 95%;
    display: grid;
    grid-template-columns: repeat(4, 25%);
    grid-template-rows: auto;
    hr {
      display: block;
      height: 50%;
      align-self: center;
    }
  }
`;

export const ContainerCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  align-items: center;
  justify-content: center;
  &:last-of-type {
    border-bottom: none;
  }
  @media (min-width: 600px) {
    width: 100%;
    justify-content: space-between;
  }
  @media (min-width: 768px) {
  }

  @media (min-width: 900px) {
    height: 96px;
    justify-content: center;
  }
`;
export const CardItem = styled.h3`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20%;

  height: 100%;
  @media (min-width: 900px) {
    font-size: 40px;
    width: auto;
  }
`;

export const CardItemText = styled.h3`
  color: #929292;
  font-size: 19px;
  font-weight: 400;
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
  @media (min-width: 600px) {
    justify-content: center;
    margin-left: 7px;
  }

  @media (min-width: 768px) {
    justify-content: center;
    margin-left: 7px;
    padding: 10px;
  }
  @media (min-width: 900px) {
    font-size: 18px;
    width: auto;
    margin-left: 5px;
  }
`;

export const DividerStyle = styled.div``;
