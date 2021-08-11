import React, { Fragment } from 'react';
import { useSubscription, gql } from '@apollo/client';
import config from 'settings/config';
import TodoReceivedItem from './TodoReceivedItem';
const cid = config().SUBSCRIPTION_ID;

export const FETCH_PRIVATE_ORDER = gql`
  subscription fetchPrivateOrders($clientid: String!) {
    pedido(
      order_by: { delivery_date: desc }
      where: {
        clientid: { _eq: $clientid }
        _and: {
          is_process: { _eq: false }
          _and: { is_received: { _eq: true } }
        }
      }
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

 

const TodoPublicList = (props) => { 

  const { pedidos } = props;

  const pedidoList = [];
  pedidos.forEach((pedido, index) => {
    pedidoList.push(<TodoReceivedItem index={index} pedido={pedido} />);
  });

  return (
    <Fragment>
      <div className="todoListWrapper">
        <ul>{pedidoList}</ul>
      </div>
    </Fragment>
  );
};

const TodoPublicListQuery = () => {
  const { loading, error, data } = useSubscription(FETCH_PRIVATE_ORDER, {
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
  return <TodoPublicList pedidos={data.pedido} />;
};

export default TodoPublicListQuery;
