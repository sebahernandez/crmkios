import React from 'react';

import TodoInput from './TodoInput';
import TodoPrivateList from './TodoPrivateList';

const TodoPrivateWrapper = () => {
  return (
    <div className="todoWrapper">
      <div className="sectionHeader">Proceso de Órdenes (Real-Time)</div>

      {/*  <TodoInput /> */}
      <TodoPrivateList />
    </div>
  );
};

export default TodoPrivateWrapper;
