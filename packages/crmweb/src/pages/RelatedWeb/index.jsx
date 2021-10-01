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
  url: Yup.string().required("¡Url obligatoria!"),
});

const RelatedWeb = ({ saveData, printData, nextPage, pageBefore }) => {
  const [selectedValue, setSelectedValue] = React.useState("a");
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
  return (
    <CardInitial>
      <ContainerWeb>
        <img src="icons/navigationMan.svg" alt="Man" />
        <Subtitle>
          <p> ¿Cuentas con dominio propio?</p>
        </Subtitle>
        <Formik
          initialValues={{
            url: "",
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
                  placeholder="Ingrese la url de su tienda"
                  name="url"
                  active={errors.url && touched.url}
                />{" "}
              </UrlLabel>
              {errors.url && touched.url ? <div>{errors.url}</div> : null}
              <TopSeparator>
                <p>PASO 4</p>
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

export default RelatedWeb;
