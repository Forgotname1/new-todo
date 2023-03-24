import React, { Component } from 'react';
import './Footer.css';
import PropTypes from 'prop-types';

import TasksFilter from '../TasksFilter';

export default class Footer extends Component {
  static defaultProps = {
    todoCount: 0,
    onToggleVisible: () => {},
    onDeleteCompleted: () => {},
    onToggleSelect: () => {},
    filter: 'all',
  };

  static propTypes = {
    todoCount: PropTypes.number,
    onToggleVisible: PropTypes.func,
    onDeleteCompleted: PropTypes.func,
    onToggleSelect: PropTypes.func,
    filter: PropTypes.string,
  };

  render() {
    const { todoCount, filter, onToggleVisible, onToggleSelect, onDeleteCompleted } = this.props;
    return (
      <footer className="footer">
        <span className="todo-count">{todoCount} items left</span>
        <TasksFilter filter={filter} onToggleVisible={onToggleVisible} onToggleSelect={onToggleSelect} />
        <button type="button" className="clear-completed" onClick={onDeleteCompleted}>
          Clear completed
        </button>
      </footer>
    );
  }
}
