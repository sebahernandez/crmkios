import { useContext, useState } from 'react';
import { Wrapper, FormWrapper, LogoImage, LogoWrapper } from './Login.style'; 
import { Redirect, useHistory, useLocation } from 'react-router';
import Logoimage from 'assets/image/tuecommerce.png';
import '../../settings/constants';
import { DASHBOARD } from '../../settings/constants';
import { AuthContext } from 'context/auth';
import { FormFields, FormTitle } from 'components/FormFields/FormFields'; 

 

export default function Login() {
	const [usuario, SetUsuario] = useState('');
	const [password, SetPassword] = useState('');
	const { authenticate, isAuthenticated } = useContext(AuthContext);
	let history = useHistory();
	let location = useLocation();
	if (isAuthenticated) return <Redirect to={{ pathname: '/' }} />;

	let { from } = (location.state as any) || { from: { pathname: DASHBOARD } }; 

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
	 const login = () => { 
	  authenticate({ usuario, password }, () => {
		history.replace(from);
	  });
	};

	return (
	  <>
			<Wrapper>
				<FormWrapper>
							<FormFields>
                <LogoWrapper>
                  <LogoImage src={Logoimage} alt="pickbazar-admin" />
                </LogoWrapper>
                <FormTitle>Ingreso Administración</FormTitle>
								{/* {
									authorInfo! && <Alert key={1} variant={'danger'} transition={true}>
    							Suscriptor no identificado o problemas para validar sus datos, intente nuevamente!!!
  								</Alert>
								} */}
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

						<button onClick={login} className="btn btn-success btn-block">Ingresar</button>
				 
						 
					</FormWrapper>
			</Wrapper>
        </>
	)
}
