import React from "react";
import * as Yup from "yup";
import Radio from "@material-ui/core/Radio";
import {
  CardInitial,
  ContainerButtons,
  ContainerWeb,
  FieldInput,
  FormStyled,
  LabelRadio,
  LabelTextRadio,
  StyleButton,
  StyleButtonBack,
  Subtitle,
  TopSeparator,
  UrlLabel,
} from "./styled";
import { Formik } from "formik";

const SignupSchema = Yup.object().shape({
  rubro_negocio: Yup.string().required("¡Rubro Negocio Obligatorio!"),
});

const SectorShop = ({ saveData, printData, nextPage, pageBefore }) => {
  const [selectedValue, setSelectedValue] = React.useState("a");
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
  return (
    <CardInitial>
      <ContainerWeb>
        <img src="icons/categories.svg" alt="Man" />
        <Subtitle>
          <p> ¿Cual es el rubro de su tienda?</p>
        </Subtitle>
        <Formik
          initialValues={{
            rubro_negocio: "",
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
              <UrlLabel>
                <FieldInput
                  placeholder="Vestuario, Comida, Licores"
                  name="rubro_negocio"
                  active={errors.rubro_negocio && touched.rubro_negocio}
                />{" "}
              </UrlLabel>
              {errors.rubro_negocio && touched.rubro_negocio ? <div>{errors.rubro_negocio}</div> : null}
              <TopSeparator>
                <p>PASO 5</p>
              </TopSeparator>

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
        </Formik>

      </ContainerWeb>
    </CardInitial>
  );
};

export default SectorShop;
