import React from 'react';

import TodoInput from './TodoInput';
import TodoClosedList from './TodoClosedList';

const TodoClosedWrapper = () => {
  return (
    <div className="todoWrapper">
      <div className="sectionHeader">Órdenes Cerradas (Real-Time)</div>

      {/*  <TodoInput /> */}
      <TodoClosedList />
    </div>
  );
};

export default TodoClosedWrapper;
