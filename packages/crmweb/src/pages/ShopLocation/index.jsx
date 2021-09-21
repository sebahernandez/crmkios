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
              <p>PASO 2</p>
              <ContainerButtons>
                <StyleButtonBack onClick={pageBefore}>
                  <h3> ATRÁS </h3>
                </StyleButtonBack>
                <StyleButton type="submit">
                  <h3> SIGUIENTE</h3>
                </StyleButton>
              </ContainerButtons>
            </FormStyled>
          )}
        </Formik>{" "}
        <button onClick={printData}> Data</button>
      </ContainerLocation>
    </CardInitial>
  );
};

export default ShopLocation;
