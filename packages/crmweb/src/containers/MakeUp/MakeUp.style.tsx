import styled from "@emotion/styled";

export const Container = styled.main`
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin: 0px;
  overflow: hidden;
  font-family: "Roboto";
`;

export const Content = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 10px;
  @media (max-width: 400px) {
    width: 90%;
  }
`;
export const CenterContent = styled.div`
  width: 100%;
  height: auto;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(2, auto);
  grid-gap: 10px;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 10px 0px;
  margin: 15px 0px;

  & img {
    position: absolute;
    bottom: 40px;
    right: 20px;
    width: 300px;
  }
  @media (max-width: 400px) {
    grid-template-columns: auto;
    img {
      display: block;
      bottom: 160px;
      left: 50%;
      width: 180px;
    }
  }

  @media (max-width: 600px) {
    img {
      display: block;
      bottom: 160px;
      left: 50%;
      width: 180px;
    }
  }
  @media (min-width: 900px) {
    img {
      position: absolute;
      bottom: 20px;
      right: 20px;
      width: 40%;
    }
  }
  @media (min-width: 1500px) {
    img {
      position: absolute;
      bottom: 20px;
      right: 20px;
      width: 30%;
    }
  }
`;

export const GreenCard = styled.div`
  width: 100%;
  height: 300px;
  background-color: green;
  border-radius: 20px;
`;

export const TasktText = styled.div`
  display: flex;
  width: 40%;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  height: 200px;
  margin: 0 20px;
  & p {
    margin: 10px 0px;
  }
  & h3 {
    font-size: 35px;
    font-weight: 700;
    margin: 5px 0px;
    &:last-of-type {
      margin: 0;
    }
  }

  & p {
    font-size: 14px;
    color: grey;
  }

  @media (max-width: 399px) {
    width: 100%;
    & p {
      margin: 0px;
    }
    & h3 {
      font-size: 25px;
      font-weight: 700;
      margin: 5px 0px;
      &:last-of-type {
        margin: 0;
      }
    }

    & p {
      font-size: 12px;
      color: grey;
    }
  }

  @media (min-width: 400px) {
    width: 60%;
    margin-left: 7%;
    & p {
      margin: 0px;
    }
    & h3 {
      font-size: 30px;
      font-weight: 700;
      margin: 5px 0px;
      &:last-of-type {
        margin: 0;
      }
    }

    & p {
      font-size: 11px;
      color: grey;
    }
  }

  @media (min-width: 600px) {
    width: 40%;
    margin-left: 7%;
    & p {
      margin: 0px;
    }
    & h3 {
      font-size: 30px;
      font-weight: 700;
      margin: 5px 0px;
      &:last-of-type {
        margin: 0;
      }
    }

    & p {
      font-size: 11px;
      color: grey;
    }
  }

  @media (min-width: 700px) {
    width: 60%;
  }
`;

export const Bar = styled.div`
  width: 70%;
  height: 15px;
  background-color: #ffeda8;
  display: flex;
  justify-content: flex-start;
  margin: 10px 0px;
  border-radius: 5px;
  & div {
    height: 100%;
    border-radius: 10px;
    background-color: #ffac30;
    display: flex;
    justify-content: flex-end;
    align-items: center;

    & span {
      font-size: 10px;
      color: white;
      padding: 0 5px;
    }
  }

  @media (max-width: 600px) {
    width: 300px;
    height: 15px;
    background-color: #ffeda8;
    display: flex;
    justify-content: flex-start;
    margin: 10px 0px;
    border-radius: 5px;
    & div {
      height: 100%;
      border-radius: 10px;
      background-color: #ffac30;
      display: flex;
      justify-content: flex-end;
      align-items: center;

      & span {
        font-size: 10px;
        color: white;
        padding: 0 5px;
      }
    }
  }

  @media (min-width: 600px) {
    width: 300px;
  }
`;
export const CardsProductContainer = styled.div`
  overflow: hidden;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, auto);
  grid-template-rows: auto;
  grid-gap: 15px;
  align-items: center;
  justify-content: flex-start;

  @media (max-width: 400px) {
    grid-template-columns: auto;
    grid-gap: 10px;
    align-items: center;
    justify-content: center;
  }
  @media (min-width: 401px) {
    grid-template-columns: auto;
    width: 100%;
    align-items: center;
    justify-content: center;
  }
  @media (min-width: 900px) {
    display: grid;
    grid-template-columns: repeat(2, auto);
    grid-template-rows: auto;
  }
  @media (min-width: 1200px) {
    display: grid;
    grid-template-columns: repeat(3, auto);
    grid-template-rows: auto;
  }

  @media (min-width: 1500px) {
    display: grid;
    grid-template-columns: repeat(4, auto);
    grid-template-rows: auto;
  }
`;
