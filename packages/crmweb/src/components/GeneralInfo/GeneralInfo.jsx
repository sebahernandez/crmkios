import React from "react";
import { generalInfoStyles } from "./styles.jsx";
import Divider from "@material-ui/core/Divider";
import {
  Root,
  CardContent,
  ContentCard,
  ContainerCard,
  DividerStyle,
  CardItem,
  CardItemText,
} from "./styled.jsx";

export const GeneralInfo = ({
  visits,
  publishedProducts,
  sales,
  totalValue,
}) => {
  return (
    <Root>

      <ContainerCard>
        <CardItem>{visits}</CardItem>
        <CardItemText>Visitas Totales</CardItemText>
      </ContainerCard>

      <ContainerCard>
        <CardItem>{publishedProducts}</CardItem>
        <CardItemText>Productos Publicados</CardItemText>
      </ContainerCard>

      <ContainerCard>
        <CardItem>{sales}</CardItem>
        <CardItemText>Ventas Generadas</CardItemText>
   
      </ContainerCard>

      <ContainerCard>
        <CardItem>${totalValue}</CardItem>
        <CardItemText>Valor Total</CardItemText>
      </ContainerCard>
      
    </Root>
  );
};
