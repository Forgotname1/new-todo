import React, { Component } from 'react';

import './App.css';
import NewTaskForm from '../NewTaskForm';
import TaskList from '../TaskList';
import Footer from '../Footer';

export default class App extends Component {
  maxId = 1;

  constructor() {
    super();
    this.state = {
      todoData: [],
      filter: 'all',
    };
  }

  onToggleDone = (id) => {
    this.setState((state) => ({ todoData: this.toggleProperty(state.todoData, id, 'done') }));
  };

  addItem = (text) => {
    const newItem = this.createTodoItem(text);
    this.setState(({ todoData }) => {
      const newArray = [...todoData, newItem];
      return { todoData: newArray };
    });
  };

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];
      return {
        todoData: newArray,
      };
    });
  };

  onToggleVisible = (selector) => {
    this.setState(() => ({ filter: selector }));
  };

  onToggleSelect = (btn) => {
    this.setState(() => ({ filter: btn }));
    this.onToggleVisible(btn);
  };

  showList = (visible) => {
    const { todoData } = this.state;
    switch (visible) {
      case 'all':
        return todoData;
      case 'active':
        return todoData.filter((data) => !data.done);
      default:
        return todoData.filter((data) => data.done);
    }
  };

  deleteCompletedItems = () => {
    this.setState(({ todoData }) => {
      const newArr = todoData.filter((data) => !data.done);
      return { todoData: newArr };
    });
  };

  onToggleImportant = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const oldItem = todoData[idx];
      const newItem = { ...oldItem, important: !oldItem.important };
      const newArray = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)];
      return {
        todoData: newArray,
      };
    });
  };

  // eslint-disable-next-line class-methods-use-this
  toggleProperty(arr, id, propName) {
    const idx = arr.findIndex((el) => el.id === id);
    const oldItem = arr[idx];
    const newItem = { ...oldItem, [propName]: !oldItem[propName] };
    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
  }

  createTodoItem(label) {
    return {
      label,
      important: false,
      done: false,
      created: Date.now(),
      // eslint-disable-next-line no-plusplus
      id: this.maxId++,
      editable: false,
    };
  }

  render() {
    const { todoData, filter } = this.state;
    const doneCount = todoData.filter((el) => el.done).length;
    const todoCount = todoData.length - doneCount;
    const visibleList = this.showList(filter);
    return (
      <div className="todoapp">
        <NewTaskForm onItemAdded={this.addItem} onSubmit={this.onSubmit} />

        <TaskList
          todos={visibleList}
          onDeleted={this.deleteItem}
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone}
        />
        <Footer
          filter={filter}
          todoCount={todoCount}
          onDeleteCompleted={this.deleteCompletedItems}
          onToggleVisible={this.onToggleVisible}
          onToggleSelect={this.onToggleSelect}
        />
      </div>
    );
  }
}
