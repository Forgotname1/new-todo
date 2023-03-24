import React, { Component } from 'react';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';

export default class Task extends Component {
  static defaultProps = {
    label: '',
    created: Date.now(),
    done: false,
    onToggleDone: () => {},
    onDeleted: () => {},
    onToggleImportant: () => {},
  };

  static propTypes = {
    label: PropTypes.string,
    created: PropTypes.number,
    done: PropTypes.bool,
    onToggleDone: PropTypes.func,
    onDeleted: PropTypes.func,
    onToggleImportant: PropTypes.func,
  };

  render() {
    const { label, onDeleted, onToggleImportant, onToggleDone, important, done, created } = this.props;
    const howMuchTime = formatDistanceToNow(created, { addSuffix: true });

    let classNames = 'view';
    if (done) {
      classNames += ' completed';
    }
    if (important) {
      classNames += ' important';
    }

    return (
      <div className="view">
        <input className="toggle" type="checkbox" onClick={onToggleDone} />
        <label>
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
          <span role="presentation" className={classNames} onClick={onToggleImportant}>
            {label}
          </span>
          <span className="created">
            created
            {howMuchTime}
          </span>
        </label>
        <button type="button" aria-label="Save" className="icon icon-edit" />
        <button type="button" aria-label="Save" className="icon icon-destroy" onClick={onDeleted} />
      </div>
    );
  }
}
