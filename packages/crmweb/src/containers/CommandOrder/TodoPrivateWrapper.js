import TodoPrivateList from './TodoPrivateList';

const TodoPrivateWrapper = () => {
  return (
    <div className="todoWrapper">
      <h3 className="sectionHeader">Proceso de Órdenes (Real-Time)</h3>

      {/*  <TodoInput /> */}
      <TodoPrivateList />
    </div>
  );
};

export default TodoPrivateWrapper;
