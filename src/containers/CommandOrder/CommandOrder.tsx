import React,{ useContext, useState } from 'react'; 
import { gql,useQuery} from '@apollo/client';  
import { useHistory, useLocation } from 'react-router'; 
import '../../settings/constants';
import { DASHBOARD } from '../../settings/constants';
import { AuthContext } from 'context/auth'; 
import TopbarCommand from 'containers/Layout/Topbar/TopbarCommand';
 
import TodoClosedWrapper from "./TodoClosedWrapper"; 
import TodoPrivateWrapper from './TodoPrivateWrapper';
/**
 * Develop by Alejandro Sandoval 
 * Alias Joker
 */


 const GET_ORDERS = gql`
 query getOrders($clientid: String!) {
   pedido (where: {clientid: {_eq: $clientid}}) {
	 id
	 cliente
	 creation_date
	 delivery_address
	 total
	 metodo_pago
	 contacto
	 estado
	 status
   }
 }
`;

const statusSelectOptions = [
	{ value: 'Todos', label: 'Todos' },
	{ value: 'Entregado', label: 'Entregado' },
	{ value: 'En Ruta', label: 'En Ruta' },
	{ value: 'Por Entregar', label: 'Por Entregar' },
	{ value: 'En Preparacion', label: 'En Preparacion' },
	{ value: 'Cancelado', label: 'Cancelado' },
  ];

export default function CommandOrder({clientid}) {
	const [usuario, SetUsuario] = useState('');
	const [password, SetPassword] = useState('');
	const [tag, setTag] = useState([]);
	const { authenticate, isAuthenticated } = useContext(AuthContext);
	let history = useHistory();
	let location = useLocation();
	let { from } = (location.state as any) || { from: { pathname: DASHBOARD } };
	const { data, error, refetch } = useQuery(GET_ORDERS, {
		variables: {
		  clientid: sessionStorage.getItem('clientid')
		},
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

	}

	const handleMultiChange = ({ value }) => {
    
		setTag(value);
	  }

 

	return (
	  <div>
      <TopbarCommand />
      <div className="row container-fluid p-left-right-0 m-left-right-0">
        <div className="row col-md-9 p-left-right-0 m-left-right-0">
          <div className="col-md-12 sliderMenu p-30">
            <TodoPrivateWrapper />  
          </div>
          
        </div>
		<div className="col-md-3 p-left-right-0">
		<div className="col-md-12 sliderMenu p-30 bg-gray">
            <TodoClosedWrapper />  
          </div>
        </div>

       {/*  <div className="col-md-3 p-left-right-0">
          <div className="col-md-12 sliderMenu p-30 bg-gray">
         		<OnlineUsersWrapper /> 
          </div>
        </div> */}
      </div>

      </div>
	)
}
