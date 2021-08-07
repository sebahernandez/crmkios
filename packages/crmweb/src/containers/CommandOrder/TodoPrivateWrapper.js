import React from 'react';

import TodoInput from './TodoInput';
import TodoPrivateList from './TodoPrivateList';

const TodoPrivateWrapper = () => {
  return (
    <div className="todoWrapper">
      <TodoPrivateList />
    </div>
  );
};

export default TodoPrivateWrapper;
