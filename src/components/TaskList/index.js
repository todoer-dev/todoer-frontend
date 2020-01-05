import React, { useState, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import TextField from '@material-ui/core/TextField';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Star from '../StarIcon';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: '40vw',
    backgroundColor: theme.palette.background.paper,
  },
  textField: {
    width: '90%',
    marginLeft: 20,
  },
  emptyMessage: {
    width: '90%',
    marginLeft: 20,
    marginTop: 20,
  },
}));

export default function TaskList(props) {
  const classes = useStyles();
  const {
    tasks,
    onTaskComplete,
    activeLabel,
    createTask,
    onTaskSelect,
    onTaskStarred,
    selectedTaskId,
  } = props;
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const createTaskHandler = useCallback(
    e => {
      e.preventDefault();
      createTask({
        title: newTaskTitle,
        labels: [activeLabel],
      });
    },
    [newTaskTitle, activeLabel, createTask]
  );

  return (
    <div className={classes.root}>
      <form onSubmit={createTaskHandler}>
        <TextField
          className={classes.textField}
          label={`Add task to ${activeLabel}`}
          value={newTaskTitle}
          onChange={e => setNewTaskTitle(e.target.value)}
        />
      </form>
      {tasks && tasks.length ? (
        <List className={classes.root}>
          {tasks.map(task => {
            const labelId = `checkbox-list-label-${task.id}`;

            return (
              <ListItem
                key={task.id}
                dense
                button
                onClick={() => onTaskSelect(task.id)}
                selected={task.id === selectedTaskId}
              >
                <ListItemIcon>
                  <Checkbox
                    edge='start'
                    checked={!!task.completedAt}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                    onChange={() => onTaskComplete(task.id)}
                  />
                </ListItemIcon>
                <ListItemText
                  id={labelId}
                  primary={task.title}
                  secondary={
                    !!task.completedAt ? task.completedAt : task.dueDate
                  }
                />
                <ListItemSecondaryAction>
                  <IconButton
                    edge='end'
                    aria-label='comments'
                    onClick={() => onTaskStarred(task.id)}
                  >
                    <Star starred={task.isStarred} />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
        </List>
      ) : (
        <div className={classes.emptyMessage}>No tasks.</div>
      )}
    </div>
  );
}
