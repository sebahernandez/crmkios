import styled from "@emotion/styled";

export const CardContainer = styled.div`
  width: 380px;
  height: 140px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background: white;
  border-radius: 10px;
  padding: 10px 20px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
  margin: 10px;

  @media (max-width: 400px) {
    width: 290px;
    margin: 0;
    padding: 10px;
  }
  @media (min-width: 1100px) {
    width: 340px;
    margin: 0;
    padding: 10px;
  }
`;

export const CardItemTitle = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  align-items: flex-start;
  justify-content: space-between;
  img {
    width: 35px;
    height: 35px;
  }
  h3 {
    font-family: Roboto;
    font-weight: 700;
    margin: 0;
    padding: 0;
  }

  @media (max-width: 400px) {
    h3 {
      font-size: 12px;
    }
    margin: 0;
  }
`;

export const CardItemContent = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  align-items: flex-start;
  justify-content: space-between;
  p {
    width: 80%;
    font-family: Roboto;
    font-size: 12px;
    color: grey;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
  }
`;

export const CardItemFooter = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: auto;
  padding: 5px 0px;
  span {
    color: #4cc58b;
    font-family: Roboto;
    font-size: 12px;
    font-weight: 500;
    margin: 0;
    padding: 0;
  }
  h4 {
    font-family: Roboto;
    font-size: 12px;
    font-weight: 500;
    margin: 0;
    padding: 0;
  }
`;
