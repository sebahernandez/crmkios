import React, { useState, Fragment } from 'react';
import { useQuery, useSubscription, useMutation, gql } from '@apollo/client';
import TodoItem from './TodoItem';
import TodoFilters from './TodoFilters';
import config from 'settings/config';

const cid = config().SUBSCRIPTION_ID;


export const FETCH_PRIVATE_ORDER_QUERY = gql`
  query fetchPrivateOrders($clientid: String!) {
    pedido(
      limit: 10
      where: {
        clientid: { _eq: $clientid }
        _and: {
          order: { _neq: "null" }
          _and: {
            order_date: { _neq: "full" }
            _and: { is_closed: { _neq: true } }
          }
        }
      }
      order_by: { creation_date: desc }
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


export const FETCH_PRIVATE_ORDER = gql`
  subscription fetchPrivateOrders($clientid: String!) {
    pedido(
      limit: 10
      where: {
        clientid: { _eq: $clientid }
        _and: {
          order: { _neq: "null" }
          _and: {
            order_date: { _neq: "full" }
            _and: { is_closed: { _neq: true } }
          }
        }
      }
      order_by: { creation_date: desc }
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

// Remove all the todos that are completed
const CLEAR_CLOSED = gql`
  mutation clearCompleted($clientid: String!) {
    delete_pedido(
      where: {
        is_closed: { _eq: true }
        _and: { clientid: { _eq: $clientid } }
      }
    ) {
      affected_rows
    }
  }
`;

const TodoPrivateList = (props) => {
  const [state, setState] = useState({
    filter: 'all',
    clearInProgress: false,
    pedidos: [],
  });

  const { pedidos } = props;
  const filterResults = (filter) => {
    setState({
      ...state,
      filter: filter,
    });
  };
  const [clearCompletedTodos] = useMutation(CLEAR_CLOSED);

  const clearCompleted = () => {
    clearCompletedTodos({
      optimisticResponse: true,
      update: (cache, { data }) => {
        const existingTodos = cache.readQuery({
          query: FETCH_PRIVATE_ORDER,
        });
        console.log(existingTodos);
        const newPedido = existingTodos.pedido.filter((t) => !t.is_closed);
        cache.writeQuery({
          query: FETCH_PRIVATE_ORDER,
          data: { pedido: newPedido },
        });
      },
    });
  };

  let filteredPedidos = pedidos;
  if (state.filter === 'active') {
    filteredPedidos = pedidos.filter(
      (pedido) => pedido.is_closed !== true && pedido.is_cancelled !== true
    );
    
  } else {
    if (state.filter === 'closed') {
      filteredPedidos = pedidos.filter((pedido) => pedido.is_closed === true);
    }
    if (state.filter === 'received') {
      filteredPedidos = pedidos.filter(
        (pedido) => pedido.is_received === true && pedido.is_process === false
      );
    }
    if (state.filter === 'process') {
      filteredPedidos = pedidos.filter(
        (pedido) => pedido.is_process === true && pedido.is_delivery === false
      );
    }
    if (state.filter === 'delivery') {
      filteredPedidos = pedidos.filter(
        (pedido) => pedido.is_delivery === true && pedido.is_closed === false
      );
    }
  }

  const pedidoList = [];
  filteredPedidos.forEach((pedido, index) => {
    pedidoList.push(<TodoItem key={index} index={index} pedido={pedido} />);
  });

  return (
    <Fragment>
      <TodoFilters
        pedido={filteredPedidos}
        currentFilter={state.filter}
        filterResultsFn={filterResults}
        clearCompletedFn={clearCompleted}
        clearInProgress={state.clearInProgress}
      />
      <div className="todoListWrapper mt-3 ">
        <ul className="list-group">{pedidoList}</ul>
      </div>

      <TodoFilters
        pedido={filteredPedidos}
        currentFilter={state.filter}
        filterResultsFn={filterResults}
        clearCompletedFn={clearCompleted}
        clearInProgress={state.clearInProgress}
      />
    </Fragment>
  );
};

const TodoPrivateListQuery = () => {
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
  return <TodoPrivateList pedidos={data.pedido} />;
};

//TodoPrivateList
export default TodoPrivateListQuery;
