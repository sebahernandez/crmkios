import styled from "@emotion/styled";

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background: white;
  width: 100%;
  height: 200px;
  border:1px solid #c5c5c5;
  border-radius: 10px;


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
  padding:10px;
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
    width: 100%;
    font-family: Roboto;
    font-size: 14px;
    color: #b5b5b5;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    padding:10px;
  }
`;

export const CardItemFooter = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: auto;
  padding:10px;
  span {
    color: #029e7f;
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
