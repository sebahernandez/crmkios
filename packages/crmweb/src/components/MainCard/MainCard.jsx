import React from "react";
import {
  Root,
  CardContent,
  Saludo,
  ProgressBar,
  OnlineShop,
  OnlineShopRigth,
  PercentageAdv,
  TextPercentage,
  InfoContent,
} from "./styled";

export const MainCard = ({ name, percentage, shopUrl }) => {
  console.log("props: " + name);
  return (
    <div>
      <Root>
        <CardContent>
          <InfoContent>
            <Saludo> Hola, {name} </Saludo>
            <TextPercentage>{percentage}% de avance</TextPercentage>
            <ProgressBar>
              <PercentageAdv percentage={percentage}></PercentageAdv>
            </ProgressBar>
            <OnlineShop>Tu tienda online: {shopUrl} </OnlineShop>
          </InfoContent>
          <OnlineShopRigth>
            <div>
              Tu tienda online :<br></br>
              {shopUrl}
            </div>
          </OnlineShopRigth>
        </CardContent>
      </Root>
    </div>
  );
};
