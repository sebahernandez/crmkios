import { useContext, useEffect, useState } from 'react';
import { Wrapper, FormWrapper, LogoImage, LogoWrapper } from './Login.style';
import { useQuery } from '@apollo/client';
import { useHistory, useLocation } from 'react-router';
import Logoimage from 'assets/image/tuecommerce.png';
import '../../settings/constants';
import { DASHBOARD, SUBSCRIPTIONS } from '../../settings/constants';
import { AuthContext } from 'context/auth';
import { FormFields, FormTitle } from 'components/FormFields/FormFields';
import { Alert } from 'react-bootstrap';
import Cookies  from 'universal-cookie';
import { GET_SUSCRIPTOR } from 'utils/graphql/query/subscription.query';
import showPwdImg from 'assets/image/show-password.svg';
import hidePwdImg from 'assets/image/hide-password.svg';



export default function Login() {
	const cookie = new Cookies();
	const [usuario, SetUsuario] = useState('');
	const [password, SetPassword] = useState('');
	const [passwordShown, setPasswordShown] = useState(false);
	const [isAuth, SetIsAuth] = useState(true);

	const { authenticate } = useContext(AuthContext);
	let history = useHistory();
	let location = useLocation();
	let { dashboard } = (location.state as any) || { dashboard: { pathname: DASHBOARD } };
	let { root } = (location.state as any) || { root: { pathname: SUBSCRIPTIONS } };
 
	

	const togglePassword = () => {
		// When the handler is invoked
		// inverse the boolean state of passwordShown
		setPasswordShown(!passwordShown);
	  };

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
		if(data2  && data2.suscripciones && data2.suscripciones.length > 0) {
			cookie.set('suscriptor',data2.suscripciones[0])
			cookie.set('clientid',data2.suscripciones[0].clientid)
			cookie.set('cid',data2.suscripciones[0].clientid)
			cookie.set('negocio_web',data2.suscripciones[0].negocio_web)
			SetIsAuth(true)
		}	
	},[cookie, data2])


	const auth = () => {
	 
		authenticate({ usuario, password }, async () => { 
			if(cookie.get('suscriptor').is_root === false)
			{
			 
				history.replace(dashboard);
			} else {
				 
				history.replace(root);
			} 
			SetIsAuth(false)
		});
		 
	}

	const handleMoreInfo = async () => {
		 
	 
		if(data2  && data2.suscripciones && data2.suscripciones.length > 0) {
			cookie.set('suscriptor',data2.suscripciones[0])
			cookie.set('negocio_web',data2.suscripciones[0].negocio_web)
			await auth()
			SetIsAuth(true)
		}	else {
			SetIsAuth(false)
			
		}
		
		

	}

const loadMessage = () => {
	 
 	if(	usuario && password ) { 
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
									
									(!isAuth)  && 
									loadMessage() 
									
								}
              </FormFields>
	 					<div className="form-group">
							<label>Usuario:</label>
							<input type="text" name="usuario" className="form-control" onChange={handleInput} placeholder="suscriptor@demo.cl"   />
						</div>

						<div className="form-group">
							<label>Contraseña:</label>
							 <input type={passwordShown ? "text" : "password"} name="password" className="form-control showPass" onChange={handleInput} placeholder="Ingrese su clave" value={password} />
							 <img
								title={passwordShown ? "Hide password" : "Show password"}
								src={passwordShown ? hidePwdImg : showPwdImg}
								onClick={() => setPasswordShown(prevState => !prevState)}
       						 />
						</div>

						<div className="form-group">
							<div className="custom-control custom-checkbox">
								<input type="checkbox" className="custom-control-input" id="customCheck1" />
								<label className="custom-control-label" htmlFor="customCheck1">Recordarme</label>
							</div>
						</div>

						<button onClick={handleMoreInfo} className="btn-login">Ingresar</button>
					 				
						<p className="forgot-password text-right">
							Se me olvido la  <a href="#">contraseña?</a>
						</p>
					</FormWrapper>
			</Wrapper>
        </>
	)
}
