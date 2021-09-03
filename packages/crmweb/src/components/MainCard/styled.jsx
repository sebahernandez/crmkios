import styled from "@emotion/styled";

export const Root = styled.div`
  width: 100%;
  height: 300px;
  background: linear-gradient(to right, #4cc58b 100%, #0f9e59 51%);
  color: white;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);

  @media (min-width: 400px) {
    width: 90%;
    margin-left: 4.5%;
    margin-right: 5%;
  }
`;

export const InfoContent = styled.div`
  @media (min-width: 900px) {
    display: flex;
    flex-direction: column;
  }
`;

export const CardContent = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px;
  margin-left: 3%;
  @media (min-width: 768px) {
  }
`;

export const Saludo = styled.div`
  width: 100%;
  font-size: 40px;
  font-weight: bold;
  margin-top: 60px;
  @media (min-width: 768px) {
    margin-top: 40px;
  }
`;
export const TextPercentage = styled.div`
  width: 100%;
`;

export const PercentageAdv = styled.div`
  width: ${(props) => props.percentage}%;
  height: 100%;
  background-color: #ffac30;
  border-radius: 10px;
`;

export const ProgressBar = styled.div`
  width: 250px;
  height: 11px;
  background-color: #ffeda8;
  border-radius: 10px;

  @media (min-width: 400px) {
    width: 250px;
  }
  @media (min-width: 768px) {
  }
`;

export const OnlineShop = styled.div`
  margin-top: 5px;
`;

export const OnlineShopRigth = styled.div`
  @media (min-width: 320px) {
    display: none;
  }
  @media (min-width: 900px) {
    display: block;
    margin-right: 5%;
    margin-top: 3%;
  }
`;
