/* eslint-disable jsx-a11y/anchor-is-valid */
import { NotificationIcon } from 'assets/icons/NotificationIcon';
import { Cooking } from 'assets/icons/Cooking';
import { DeliveryIcon } from 'assets/icons/DeliveryIcon';

const TodoFilters = ({
  pedido,
  currentFilter,
  filterResultsFn,
  clearCompletedFn,
}) => {
  const filterResultsHandler = (filter) => {
    return () => {
      filterResultsFn(filter);
    };
  };

  // The clear completed button if these are personal todos
  const clearCompletedButton = (
    <button onClick={clearCompletedFn} className="clearComp">
      Vaciar Cerrados
    </button>
  );

  let activePedidos = pedido.filter((pedido) => pedido.is_closed !== true);

  let itemCount = pedido.length;
  if (currentFilter === 'active') {
    activePedidos = pedido.filter((pedido) => pedido.is_closed !== true);
    itemCount = activePedidos.length;
  } else {
    if (currentFilter === 'closed') {
      activePedidos = pedido.filter((pedido) => pedido.is_closed === true);
      itemCount = activePedidos.length;
    } else if (currentFilter === 'received') {
      activePedidos = pedido.filter((pedido) => pedido.is_received === true);
      itemCount = activePedidos.length;
    } else if (currentFilter === 'delivery') {
      activePedidos = pedido.filter((pedido) => pedido.is_delivery === true);
      itemCount = activePedidos.length;
    } else if (currentFilter === 'process') {
      activePedidos = pedido.filter((pedido) => pedido.is_process === true);
      itemCount = activePedidos.length;
    }
  }

  return (
    <div className="footerList pt-2">
      <span>
        {' '}
        {itemCount} órden
        {itemCount !== 1 ? 'es' : ''}
      </span>

      <ul className="list-group list-group-horizontal pt-3">
        <li className="mr-3 text-white rounded bg-dark d-flex justify-content-between list-group-item" onClick={filterResultsHandler('active')}>
          <a className={currentFilter === 'active' ? 'selected' : '', 'text-white'}>Todos</a>
        </li>
        <li className="mr-3 text-white rounded  bg-success d-flex justify-content-between list-group-item" onClick={filterResultsHandler('received')}>
          <a className={currentFilter === 'received' ? 'selected' : '', 'text-white mr-2'}>
            Recibidas{' '}
          </a>
           <NotificationIcon />
        </li>
        <li className="mr-3 text-white rounded  bg-warning d-flex justify-content-between list-group-item" onClick={filterResultsHandler('process')}>
          <a className={currentFilter === 'process' ? 'selected' : '', 'text-white mr-2'}>
            En Proceso
          </a>
           <Cooking />
        </li>
        <li className="mr-3 text-white rounded bg-danger d-flex justify-content-between list-group-item" onClick={filterResultsHandler('delivery')}>
          <a className={currentFilter === 'delivery' ? 'selected' : '', 'text-white mr-2'}>
            En Delivery
          </a>
           <DeliveryIcon />
        </li>
      </ul>

      {/*  {clearCompletedButton}  */}
    </div>
  );
};

export default TodoFilters;
