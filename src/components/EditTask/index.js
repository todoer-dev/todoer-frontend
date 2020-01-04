import React, { useState, useCallback, useEffect } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import { TextField, Card, makeStyles } from '@material-ui/core';
import CardActions from '@material-ui/core/CardActions';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import Star from '../StarIcon';

const useStyles = makeStyles({
  root: {
    marginTop: 20,
    marginLeft: 20,
    paddingLeft: 10,
    paddingRight: 10,
    display: 'flex',
    flexDirection: 'column',
    maxHeight: 400,
    position: 'sticky',
    top: 20,
  },
  field: {
    width: '95%',
  },
  textarea: {
    marginTop: 20,
    width: '95%',
  },
  main: {
    flex: 1,
  },
  titleField: {
    width: '75%',
  },
});

const EditTask = props => {
  const { task, onTaskComplete, onTaskDelete, onTaskStarred, editTask } = props;
  const classes = useStyles();
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    setTitle(task.title);
    setDueDate(task.dueDate || '');
    setNote(task.note || '');
    console.log(task);
  }, [task]);

  const saveTask = useCallback(() => {
    console.log('editing', title, note, dueDate);
    editTask({
      title,
      note,
      dueDate,
      id: task.id,
    });
  }, [title, note, dueDate, editTask, task.id]);

  return (
    <Card className={classes.root}>
      <div>
        <Checkbox
          edge='start'
          checked={task.completed}
          tabIndex={-1}
          disableRipple
          onChange={() => onTaskComplete(task.id)}
        />
        <TextField
          className={classes.titleField}
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
      </div>
      <div className={classes.main}>
        <TextField
          label='Set due date'
          type='date'
          InputLabelProps={{
            shrink: true,
          }}
          value={dueDate}
          className={classes.field}
          disabled={task.completed}
          onChange={e => setDueDate(e.target.value)}
        />
        <TextField
          label='Add a note...'
          multiline
          rows='4'
          value={note}
          variant='outlined'
          className={classes.textarea}
          onChange={e => setNote(e.target.value)}
        />
      </div>
      <CardActions disableSpacing>
        <IconButton aria-label='save' onClick={saveTask}>
          <SaveIcon />
        </IconButton>
        <IconButton aria-label='star' onClick={() => onTaskStarred(task.id)}>
          <Star starred={task.starred} />
        </IconButton>
        <IconButton onClick={() => onTaskDelete(task.id)}>
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default EditTask;
