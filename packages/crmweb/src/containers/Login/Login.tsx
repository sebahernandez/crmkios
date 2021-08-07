import { useContext, useState } from 'react';
import { Wrapper, FormWrapper, LogoImage, LogoWrapper } from './Login.style';
import { gql, useLazyQuery } from '@apollo/client';
import { useHistory, useLocation } from 'react-router';
import Logoimage from 'assets/image/tuecommerce.png';
import '../../settings/constants';
import { DASHBOARD } from '../../settings/constants';
import { AuthContext } from 'context/auth';
import { FormFields, FormTitle } from 'components/FormFields/FormFields';
import { Alert } from 'react-bootstrap';

/**
 * Develop by Alejandro Sandoval 
 * Alias Joker
 */
/* 
const GET_SUSCRIPTOR = gql`
	query GETSUSCRIPTOR($usuario: String!,$password: String!) {
		suscripciones(where: {usuario: {_eq: $usuario}, clave: {_eq: $password},fecha_vencimiento: {_gte: "now()"}}) {
		usuario
		clave
		clientid
		imageURL
	}
}

`;
 */
const GET_SUSCRIPTOR = gql`
	query GETSUSCRIPTOR($usuario: String!,$password: String!) {
	info_user_view(where: {usuario: {_eq: $usuario}, clave: {_eq: $password},fecha_vencimiento: {_gte: "now()"}}) {
	  img_site_url
	  img_user_url
	  nombre
	  usuario
	  plan_suscripcion
	  fecha_vencimiento
	  estado
	  clientid
	  fecha_suscripcion
	}
  }
  
  
`;

export default function Login() {
	const [usuario, SetUsuario] = useState('');
	const [password, SetPassword] = useState('');
	const { authenticate, isAuthenticated } = useContext(AuthContext);
	let history = useHistory();
	let location = useLocation();
	let { from } = (location.state as any) || { from: { pathname: DASHBOARD } };
	const [loadAuthorInfo, { called, loading, data: authorInfo }] = useLazyQuery(
		GET_SUSCRIPTOR, {
		variables: { usuario, password }
	});

	function handleInput(e) {
		console.log(e.target.name);
		console.log(e.target.value);
		switch (e.target.name) {
			case 'usuario':
				SetUsuario(e.target.value);
				break;
			case 'password':
				SetPassword(e.target.value);
				break;
		}
	}
	const auth = () => {

		authenticate({ usuario, password }, () => {
			console.log(usuario, password);
			history.replace(from);
		});
	}

	const handleMoreInfo = () => {
		console.log('handleMoreInfo');
		loadAuthorInfo();  // or loadAuthorInfo({ variables: { author: book.author.id } });
	}

	return (
	  <>
			<Wrapper>
				<FormWrapper>
							<FormFields>
                <LogoWrapper>
                  <LogoImage src={Logoimage} alt="pickbazar-admin" />
                </LogoWrapper>
                <FormTitle>Ingreso Administración</FormTitle>
								{
									authorInfo! && <Alert key={1} variant={'danger'} transition={true}>
    							Suscriptor no identificado o problemas para validar sus datos, intente nuevamente!!!
  								</Alert>
								}
              </FormFields>
	 					<div className="form-group">
							<label>Usuario</label>
							<input type="text" name="usuario" className="form-control" onChange={handleInput} placeholder="suscriptor@demo.cl"   />
						</div>

						<div className="form-group">
							<label>Contraseña</label>
							<input type="password" name="password" className="form-control" onChange={handleInput} placeholder="Ingrese su clave"   />
						</div>

						<div className="form-group">
							<div className="custom-control custom-checkbox">
								<input type="checkbox" className="custom-control-input" id="customCheck1" />
								<label className="custom-control-label" htmlFor="customCheck1">Recordarme</label>
							</div>
						</div>

						<button onClick={handleMoreInfo} className="btn btn-success btn-block">Ingresar</button>
						{/* {called && loading} */}
						{authorInfo && authorInfo.info_user_view && authorInfo.info_user_view.map(item => {
							console.log(1);
							sessionStorage.setItem('pickbazar_token', `${usuario}.${password}`);			
							console.log(2);
							sessionStorage.setItem('clientid', item.clientid);
							sessionStorage.setItem('infoUser', JSON.stringify(item));
							console.log(3);
							auth()
						})
						}
						<p className="forgot-password text-right">
							Se me olvido la  <a href="#">contraseña?</a>
						</p>
					</FormWrapper>
			</Wrapper>
        </>
	)
}
