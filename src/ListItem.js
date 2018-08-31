import React from "react";

const ListItem = (props) => {
  return (
    <li className="list-group-item" key={props.item.id}>
      <button
        className="btn-sm btn-info float-left"
        onClick={props.editTodo}
      >
        U
      </button>
      {props.item.name}

      <button
        className="btn-sm btn-danger float-right"
        onClick={props.deleteTodo}
      >
        X
      </button>
    </li>
  );
};


export default ListItem;