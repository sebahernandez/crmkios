import React from 'react';

const TaskItem = ({ index, pedido }) => {
  return (
    <li>
      {/* <div className="userInfoPublic" title={pedido.id}>
        # {pedido.order}
      </div> */}

      {/*      <div className={"labelContent" + (pedido.is_closed ? " closed" : "")}>
        <div># {pedido.order}</div>
      </div> */}

      <div className={'labelContent' + (pedido.is_received ? ' received' : '')}>
        <div>&nbsp;Ord.: &nbsp;{pedido.order}</div>
        <div>&nbsp;&nbsp;</div>
        <div>{pedido.order_date}</div>
      </div>
    </li>
  );
};

export default TaskItem;
