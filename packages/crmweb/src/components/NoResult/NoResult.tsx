import React from "react";
import NoResultSvg from "./no-result.svg";
import { NoResultWrapper, ImageWrapper, ButtonWrapper } from "./NoResult.style";
import Button from "../Button/Button";
// import { ArrowPrev } from '../AllSvgIcon';

type NoResultProps = {
  id?: string;
  onClick?: () => void;
  hideButton?: boolean;
  style?: any;
};

const NoResult: React.FC<NoResultProps> = ({
  id,
  onClick,
  hideButton = true,
  style
}) => {
  return (
    <NoResultWrapper id={id} style={style}>
      <h3>Discúlpanos, Resultados no encontrados :(</h3>

      <ImageWrapper>
        <img src={NoResultSvg} alt="No Result" />
      </ImageWrapper>

      {hideButton ? (
        <ButtonWrapper>
          <div onClick={onClick}>
            <Button>
              Inténtelo mas tarde nuevamente.
              {/* <ArrowPrev /> Go Back */}
            </Button>
          </div>
        </ButtonWrapper>
      ) : null}
    </NoResultWrapper>
  );
};

export default NoResult;
