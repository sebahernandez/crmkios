import React, { useState } from 'react';

import { useMutation, gql } from '@apollo/client';
import { FETCH_PRIVATE_ORDER } from './TodoPrivateList';

const INSERT_TODO_MUTATION = gql`
  mutation($todo: String!, $isPublic: Boolean!) {
    insert_todos(objects: { title: $todo, is_public: $isPublic }) {
      affected_rows
      returning {
        id
        title
        created_at
        is_completed
      }
    }
  }
`;
const TodoInput = ({ isPublic = false }) => {
  const [todoInput, setTodoInput] = useState('');
  const updateCache = (cache, { data }) => {
    // leer data de cache
    const existingTodos = cache.readQuery({
      query: FETCH_PRIVATE_ORDER,
    });
    // leer el nuevo dato
    const newTodo = data.insert_todos.returning[0];

    // caching
    cache.writeQuery({
      query: FETCH_PRIVATE_ORDER,
      data: { todos: [...existingTodos.todos, newTodo] },
    });

    setTodoInput('');
  };
  const [addTodo] = useMutation(INSERT_TODO_MUTATION, { update: updateCache });
  return (
    <form
      className="formInput"
      onSubmit={(e) => {
        e.preventDefault();
        addTodo({
          variables: { todo: todoInput, isPublic: isPublic },
        });
      }}
    >
      <input
        className="input"
        onChange={(e) => setTodoInput(e.target.value)}
        value={todoInput}
        placeholder="Que órden necesitas pasar a Recibida?"
      />
      <i className="inputMarker fa fa-angle-right" />
    </form>
  );
};

export default TodoInput;
