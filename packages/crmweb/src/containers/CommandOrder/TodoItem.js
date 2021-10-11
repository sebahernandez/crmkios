import { useMutation, gql } from '@apollo/client';
import { FETCH_PRIVATE_ORDER_QUERY } from './TodoPrivateList';
import { NotificationIcon } from 'assets/icons/NotificationIcon';
import { Cooking } from 'assets/icons/Cooking';
import { DeliveryIcon } from 'assets/icons/DeliveryIcon';
import config from 'settings/config'; 
import ModalCommand from 'components/Modal/Modal';

import Button from "components/Button/Button";  

const TodoItem = ({ index, pedido }) => {
  let flagstatus = '';
  let isReceived = pedido.is_received;
  let isProcess = pedido.is_process;
  let isDelivery = pedido.is_delivery;
  let isClosed = pedido.is_closed;
  let isCancelled = pedido.is_cancelled;
  let status = ''; 

  const cid = config().SUBSCRIPTION_ID;
 
 

  const TOGGLE_ORDER_MUTATION = gql`
    mutation togglePedido(
      $delivery_date: String!
      $estado: String
      $clientid: String!
      $id: Int!
      $isReceived: Boolean!
      $isProcess: Boolean!
      $isDelivery: Boolean!
      $isClosed: Boolean!
      $isCancelled: Boolean!
    ) {
      update_pedido(
        _set: {
          delivery_date: $delivery_date
          estado: $estado
          is_received: $isReceived
          is_process: $isProcess
          is_delivery: $isDelivery
          is_closed: $isClosed
          is_cancelled: $isCancelled
        }
        where: { id: { _eq: $id }, clientid: { _eq: $clientid } }
      ) {
        affected_rows
        returning {
          id
        }
      }
    }
  `;

  const [togglePedidoMutation] = useMutation(TOGGLE_ORDER_MUTATION);

  const icon = (st) => {
    console.log('....', st);
    if (st === 'received') {
      return <NotificationIcon />;
    }
    if (st === 'process') {
      return <Cooking />;
    }
    if (st === 'delivery') {
      return <DeliveryIcon />;
    }
  };
  const togglePedido = () => {
   
    // logica de negocio algoritmica
    if (!isClosed && !isCancelled) {
      // si no esta cerrada procede
      if (isDelivery && isProcess && isReceived) {
        isClosed = !isClosed;
        flagstatus = 'closed';
      } else {
        if (isProcess && isReceived) {
          isDelivery = !isDelivery;
          flagstatus = 'delivery';
        } else {
          if (isReceived) {
            isProcess = !isProcess;
            flagstatus = 'process';
          } else {
            isReceived = !isReceived;
            flagstatus = 'received';
          }
        }
      }
    
      togglePedidoMutation({
        variables: {
          delivery_date: new Date(),
          id: pedido.id,
          clientid: cid,
          isReceived: isReceived,
          isProcess: isProcess,
          isDelivery: isDelivery,
          isClosed: isClosed,
          isCancelled: isCancelled,
          estado: flagstatus,
        },
        optimisticResponse: true,
        update: (cache) => {
          // read cache
          const existingPedidos = cache.readQuery({
            query: FETCH_PRIVATE_ORDER_QUERY,
            variables: {
              clientid: cid,
            },
          });
          
          // process data
          if(existingPedidos) {
          const newPedidos = existingPedidos.pedido.map((t) => {
               
              if (t.id === pedido.id) {
                if (flagstatus === 'closed') {
                  return { ...t, is_closed: !t.is_closed };
                } else {
                  if (flagstatus === 'delivery') {
                    return { ...t, is_delivery: !t.is_delivery };
                  } else {
                    if (flagstatus === 'process') {
                      return { ...t, is_process: !t.is_process };
                    } else {
                      if (flagstatus === 'received') {
                        return { ...t, is_received: !t.is_received };
                      } else {
                        return { ...t, is_cancelled: !t.is_cancelled };
                      }
                    }
                  }
                }
              } else {
                return t;
              }
            });
         
            // write back into the cache
            cache.writeQuery({
              query: FETCH_PRIVATE_ORDER_QUERY,
              variables: {
                clientid: cid,
              },
              data: { pedido: newPedidos },
            });
          }
        },
      });
    }
  };

  if (pedido.is_closed) {
    status = 'closed';
    
  } else if (pedido.is_cancelled) {
    status = 'cancelled';
    
  } else {
    if (pedido.is_delivery) {
      status = 'delivery';
      
    } else {
      if (pedido.is_process) {
        status = 'process';
       
      } else {
        if (pedido.is_received) {
          status = 'received';
           
        } else {
          status = '';
          
        }
      }
    }
  }

  return (
    <li className="d-flex justify-content-between list-group-item">
      <div>{icon(status)} <span>Ord:{pedido.order}</span> </div>  
      <div>{pedido.order_date}</div>

      <div className={status}>
        <div>${pedido.total}</div>
        
      </div>
      <div>
       

        <Button styles="background-color:black" className="me-2" onClick={() => togglePedido()} >
            Siguiente
          </Button>

 
         {/*  <input
            checked={pedido.is_closed}
            type="checkbox"
            id={pedido.id}
            onChange={togglePedido}
          /> */}
         
      </div>

      <div> 
        <ModalCommand order={pedido.order} />
      </div>
     
      {/* 
      <button className="closeBtn" onClick={removePedido}>
        x
      </button>   */}

       
    </li>

    
  );
};

export default TodoItem;
