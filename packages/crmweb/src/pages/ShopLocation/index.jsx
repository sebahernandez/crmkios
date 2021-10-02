import { Formik } from "formik";
import * as Yup from "yup";
import React from "react";
import {
  CardInitial,
  ContainerButtons,
  ContainerLocation,
  FieldInput,
  FormStyled,
  StyleButton,
  StyleButtonBack,
  Subtitle,
} from "./styled";

const SignupSchema = Yup.object().shape({
  locationshop: Yup.string().required("¡Ubicación obligatoria!"),
});

const ShopLocation = ({ saveData, printData, nextPage, pageBefore }) => {
  return (
    <CardInitial>
      <ContainerLocation>
        <img src="icons/map.svg" alt="map"></img>
        <Subtitle>
          <p> ¿Dónde está ubicada su tienda?</p>
        </Subtitle>
        <Formik
          initialValues={{
            locationshop: "",
          }}
          validationSchema={SignupSchema}
          onSubmit={(values) => {
            console.log(values);
            saveData(values);
            nextPage();
          }}
        >
          {({ errors, touched }) => (
            <FormStyled>
              <FieldInput
                placeholder="Ingrese la ubicación de su tienda"
                name="locationshop"
                active={errors.locationshop && touched.locationshop}
              />
              {errors.locationshop && touched.locationshop ? (
                <div>{errors.locationshop}</div>
              ) : null}
              <p>PASO 3</p>
              <ContainerButtons>
                <StyleButtonBack onClick={pageBefore}>
                  ATRÁS
                </StyleButtonBack>
                <StyleButton type="submit">
                  SIGUIENTE
                </StyleButton>
              </ContainerButtons>
            </FormStyled>
          )}
        </Formik>{" "}
      </ContainerLocation>
    </CardInitial>
  );
};

export default ShopLocation;
