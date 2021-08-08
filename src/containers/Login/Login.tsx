import React, { useContext } from 'react';
import { Redirect, useHistory, useLocation } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { AuthContext } from 'context/auth';
import {
  FormFields,
  FormLabel,
  FormTitle,
  Error,
} from 'components/FormFields/FormFields';
import { Wrapper, FormWrapper, LogoImage, LogoWrapper } from './Login.style';
import Input from 'components/Input/Input';
import Button from 'components/Button/Button';
import Logoimage from 'assets/image/tuecommerce.png';

const initialValues = {
  username: '',
  password: '',
};

const getLoginValidationSchema = () => {
  return Yup.object().shape({
    username: Yup.string().required('Username is Required!'),
    password: Yup.string().required('Password is Required!'),
  });
};

const MyInput = ({ field, form, ...props }) => {
  return <Input {...field} {...props} />;
};

export default function Login() {
  let history = useHistory();
  let location = useLocation();
  const { authenticate, isAuthenticated } = useContext(AuthContext);
  if (isAuthenticated) return <Redirect to={{ pathname: '/' }} />;

  let { from } = (location.state as any) || { from: { pathname: '/' } };
  let login = ({ username, password }) => {
    authenticate({ username, password }, () => {
      history.replace(from);
    });
  };
  return (
	<>
		  <Wrapper>
			  <FormWrapper>
						  <FormFields>
			  <LogoWrapper>
				<LogoImage src={Logoimage} alt="tuecommerce-admin" />
			  </LogoWrapper>
			  <FormTitle>Ingreso Administración</FormTitle>
							 
			</FormFields>
					   <div className="form-group">
						  <label>Usuario</label>
						  <input type="text" name="usuario" className="form-control"   placeholder="suscriptor@demo.cl"   />
					  </div>

					  <div className="form-group">
						  <label>Contraseña</label>
						  <input type="password" name="password" className="form-control"  placeholder="Ingrese su clave"   />
					  </div>

					  <div className="form-group">
						  <div className="custom-control custom-checkbox">
							  <input type="checkbox" className="custom-control-input" id="customCheck1" />
							  <label className="custom-control-label" htmlFor="customCheck1">Recordarme</label>
						  </div>
					  </div>

					  <button   className="btn btn-success btn-block">Ingresar</button>
					  
					 
					  <p className="forgot-password text-right">
						  Se me olvido la  <a href="#">contraseña?</a>
					  </p>
				  </FormWrapper>
		  </Wrapper>
	  </>
  )
}
