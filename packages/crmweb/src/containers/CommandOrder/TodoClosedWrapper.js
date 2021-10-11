import React from 'react';

import TodoInput from './TodoInput';
import TodoClosedList from './TodoClosedList';

const TodoClosedWrapper = () => {
  return (
    <div className="todoWrapper cerradas">
      <h5 className="sectionHeader">Órdenes Cerradas (Real-Time)</h5>
 
      {/*  <TodoInput /> */}
      <TodoClosedList />
    </div>
  );
};

export default TodoClosedWrapper;
