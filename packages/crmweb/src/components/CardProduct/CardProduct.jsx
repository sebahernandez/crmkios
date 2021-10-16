import React from "react";
import {
  CardContainer,
  CardItemFooter,
  CardItemContent,
  CardItemTitle,
} from "./styled";

const CardProduct = ({ title, content, step, time, icon }) => {
  return (
    <CardContainer>
      <CardItemTitle>
        <img src={icon && icon} alt="Icono" />
        <h5>{title && title}</h5>
      </CardItemTitle>
      <CardItemContent>
        <p>{content && content}</p>
      </CardItemContent>
      <CardItemFooter>
        <span>{step && step}</span>
        <h4>{time && time}</h4>
      </CardItemFooter>
    </CardContainer>
  );
};

export default CardProduct;
