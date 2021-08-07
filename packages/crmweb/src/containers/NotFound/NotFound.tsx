import React from "react";
import NotFoundImage from "./not-found.svg";
import {
  NoResultWrapper,
  ImageWrapper,
  Image,
  NoResultMsg
} from "./NotFound.style";

type NoResultProps = {
  id?: string;
  style?: any;
};

const NoResult: React.FC<NoResultProps> = ({ id, style }) => {
  return (
    <NoResultWrapper id={id} style={style}>
      <NoResultMsg>Ups.., 404 Página no encontrada :(</NoResultMsg>

      <ImageWrapper>
        <Image src={NotFoundImage} alt="Not Found" />
      </ImageWrapper>
    </NoResultWrapper>
  );
};

export default NoResult;
