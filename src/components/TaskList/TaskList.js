import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './TaskList.css';
import Task from '../Task';

export default class TaskList extends Component {
  static defaultProps = {
    todoProps: [],
    onToggleDone: () => {},
    deleteItem: () => {},
  };

  static propTypes = {
    todoProps: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        created: PropTypes.number.isRequired,
        done: PropTypes.bool.isRequired,
        editable: PropTypes.bool.isRequired,
        id: PropTypes.string.isRequired,
      })
    ),
    onToggleDone: PropTypes.func,
    deleteItem: PropTypes.func,
  };

  render() {
    const { todos, onToggleDone, onDeleted, onToggleImportant } = this.props;
    const elements = todos.map((todo) => {
      const { id, ...todoProps } = todo;
      return (
        <li key={id}>
          <Task
            {...todoProps}
            onDeleted={() => onDeleted(id)}
            onToggleImportant={() => onToggleImportant(id)}
            onToggleDone={() => onToggleDone(id)}
          />
        </li>
      );
    });

    return (
      <ul id="ul-task" className="todo-list">
        {elements}
      </ul>
    );
  }
}
