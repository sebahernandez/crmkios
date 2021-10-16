import styled from "@emotion/styled";

export const Root = styled.div`
  
  width: 100%;
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: auto;
  width: 100%;
  height: auto;

  @media (max-width: 479px) {

    margin: 20px 0px;
  }

  @media (min-width: 480px) {
    margin: 20px 0px;
  }
  @media (min-width: 600px) {
    width: 100%;
  }
  @media (min-width: 768px) {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: auto;
  }
`;

export const ContainerCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 60px;
  align-items: center;
  justify-content: center;
  border: 1px solid #f0f0f0;
  margin-top:20px;

  
  @media (min-width: 600px) {
    width: 100%;
    justify-content: flex-start;
  }
  @media (min-width: 768px) {
    width: 100%;
    justify-content: space-between;
    height: 100px;
  }

  @media (min-width: 900px) {
    height: 100px;
    justify-content: center;
    margin-top:50px;
  }
`;
export const CardItem = styled.h3`
  display: flex;
  align-items: center;
  justify-content:flex-start;
  padding-left:23px;
  width: 100%;
  height: 100%;

  @media (min-width: 400px) {
    width: 100%;
  }
  @media (min-width: 900px) {
    font-size: 2rem;
    width: auto;
  }
`;

export const CardItemText = styled.h3`
  color: #929292;
  font-size: 14px;
  font-weight: 400;
  width: 80%;
  display: flex;
  align-items: center;
  height: 100%;
  padding:10px;
  @media (min-width: 600px) {
    justify-content: left;
    margin-left: 7px;
  }

  @media (min-width: 768px) {
    justify-content: left;

  }
  @media (min-width: 900px) {
    font-size: 14px;
    width: auto;
   
  }
`;

export const DividerStyle = styled.div``;
