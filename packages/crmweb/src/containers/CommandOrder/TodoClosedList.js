import { Fragment } from 'react';
import { useSubscription, gql } from '@apollo/client';
import config from 'settings/config';
import TodoClosedItem from './TodoClosedItem';

const cid = config().SUBSCRIPTION_ID;

export const FETCH_CLOSED_ORDER = gql`
  subscription fetchClosedOrders($clientid: String!) {
    pedido(
      where: {
        clientid: { _eq: $clientid }
        _and: { is_closed: { _eq: true } }
      }
      order_by: { delivery_date: desc }
    ) {
      id
      order
      total
      order_date
      is_received
      is_process
      is_delivery
      is_closed
      is_cancelled
    }
  }
`;
 

const TodoClosedList = (props) => { 

  const { pedidos } = props;

  const pedidoList = [];
  pedidos.forEach((pedido, index) => {
    pedidoList.push(<TodoClosedItem index={index} pedido={pedido} />);
  });

  return (
    <Fragment>
      <div className="todoListWrapper">
       <ul className="list-group">{pedidoList}</ul> 
      </div>
    </Fragment>
  );
  
};

const TodoClosedListQuery = () => {
  const { loading, error, data } = useSubscription(FETCH_CLOSED_ORDER, {
    variables: {
      clientid: cid,
    },
  });
  if (loading) {
    return <div>Cargando...</div>;
  }
  if (error) {
    return <div>Se produjo un error</div>;
  }
  return <TodoClosedList pedidos={data.pedido} />;
};

export default TodoClosedListQuery;
