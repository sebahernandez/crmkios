import { Formik, Form } from "formik";
import * as Yup from "yup";
import React from "react";
import {
  CardInitial,
  ContainerButtons,
  ContainerShop,
  FieldInput,
  FormStyled,
  StyleButton,
  StyleButtonBack,
  Subtitle,
} from "./styled";

const SignupSchema = Yup.object().shape({
  nameshop: Yup.string()
    .min(2, "¡Nombre muy corto!")
    .max(50, "¡Nombre muy largo!")
    .required("¡Nombre obligatorio"),
});

const NameShop = ({ saveData, printData, nextPage, pageBefore }) => {
  return (
    <CardInitial>
      <ContainerShop>
        <img src="icons/woman.svg" alt="shop"></img>
        <Subtitle>
          <p> Elija el nombre de su tienda</p>
        </Subtitle>
        <Formik
          initialValues={{
            nameshop: "",
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
                placeholder="Ingrese el nombre de su tienda"
                name="nameshop"
                active={errors.nameshop && touched.nameshop}
              />
              {errors.nameshop && touched.nameshop ? (
                <div>{errors.nameshop}</div>
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
      </ContainerShop>
    </CardInitial>
  );
};

export default NameShop;
