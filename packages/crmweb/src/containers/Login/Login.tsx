import { useContext, useEffect, useState } from 'react';
import { Wrapper, FormWrapper, LogoImage, LogoWrapper } from './Login.style';
import { gql, useQuery } from '@apollo/client';
import { useHistory, useLocation } from 'react-router';
import Logoimage from 'assets/image/tuecommerce.png';
import '../../settings/constants';
import { DASHBOARD, SUBSCRIPTIONS } from '../../settings/constants';
import { AuthContext } from 'context/auth';
import { FormFields, FormTitle } from 'components/FormFields/FormFields';
import { Alert } from 'react-bootstrap';
import Cookies  from 'universal-cookie';

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
	  negocio_web
	  is_negocio_web
	  is_root
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
	const cookie = new Cookies();
	const [usuario, SetUsuario] = useState('');
	const [password, SetPassword] = useState('');
	const [isAuth, SetIsAuth] = useState(true);
	const [isLogged, SetIsLogged] = useState(false);
	const [isClicked, SetIsClicked] = useState(false);
	const { authenticate } = useContext(AuthContext);
	let history = useHistory();
	let location = useLocation();
	let { from } = (location.state as any) || { from: { pathname: DASHBOARD } };
	let { from2 } = (location.state as any) || { from2: { pathname: SUBSCRIPTIONS } };
 

	const { data:data2 } = useQuery(GET_SUSCRIPTOR,
		{
			variables: { 
				usuario: usuario, 
				password: password 
			}
		});

	function handleInput(e) { 
		switch (e.target.name) {
			case 'usuario':
				SetUsuario(e.target.value);
				break;
			case 'password':
				SetPassword(e.target.value);
				break;
		}
	}

	useEffect(()=> {
		SetIsLogged(false)
		SetIsClicked(false)
		if(data2 !== undefined){
			cookie.set('suscriptor',data2.info_user_view[0])
			SetIsLogged(true)
		}	
	},[])


	const auth = () => {
	 
		authenticate({ usuario, password }, () => { 
			if(cookie.get('suscriptor').is_root)
			{
				history.replace(from2);
			} else {
				history.replace(from);
			}
			
			SetIsLogged(true)
		});
		
		SetIsLogged(false)
	}

	const handleMoreInfo = () => {
		SetIsClicked(true) 

		if(data2  && data2.info_user_view && data2.info_user_view.length > 0) {
			cookie.set('suscriptor',data2.info_user_view[0])
			SetIsLogged(true)
			auth()
			SetIsAuth(false)
		}	else {
			SetIsLogged(false)
			SetIsAuth(true)
			
		}
		
		

	}

const loadMessage = () => {
	 
	if(	isAuth ) {
		return <Alert key={1} variant={'danger'} transition={true}>
    			Suscriptor no identificado o problemas para validar sus datos, intente nuevamente o contacte al administrador!!!
  			</Alert>
	}	else {
		return
	}	  

}

	return (
	  <>
			<Wrapper>
				<FormWrapper>
							<FormFields>
                <LogoWrapper>
                  <LogoImage src={Logoimage} alt="pickbazar-admin"  className="logo"/>
                </LogoWrapper>
                <FormTitle>Ingreso Administración</FormTitle>
								{
									(isAuth === true && isClicked===true && isLogged===false)  && loadMessage()
									
								}
              </FormFields>
	 					<div className="form-group">
							<label>Usuario:</label>
							<input type="text" name="usuario" className="form-control" onChange={handleInput} placeholder="suscriptor@demo.cl"   />
						</div>

						<div className="form-group">
							<label>Contraseña:</label>
							<input type="password" name="password" className="form-control" onChange={handleInput} placeholder="Ingrese su clave"   />
						</div>

						<div className="form-group">
							<div className="custom-control custom-checkbox">
								<input type="checkbox" className="custom-control-input" id="customCheck1" />
								<label className="custom-control-label" htmlFor="customCheck1">Recordarme</label>
							</div>
						</div>

						<button onClick={handleMoreInfo} className="btn-login">Ingresar</button>
						{/* {called && loading} */}
						{ data2 && data2.info_user_view.map(item => {
							 
							sessionStorage.setItem('tuecommerce_token', `${usuario}.${password}`);									 
							sessionStorage.setItem('clientid', item.clientid);
							sessionStorage.setItem('infoUser', JSON.stringify(item));
							 
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
