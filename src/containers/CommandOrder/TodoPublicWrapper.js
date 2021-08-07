import React from 'react';

import TodoInput from './TodoInput';
import TodoPublicList from './TodoPublicList';

const TodoPublicWrapper = () => {
  return (
    <div className="todoWrapper">
      <div className="sectionHeader">Ordenes Recibidas(Real-Time)</div>

      {/*   <TodoInput isPublic /> */}
      <TodoPublicList />
    </div>
  );
};

export default TodoPublicWrapper;
