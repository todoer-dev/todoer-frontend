import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { TextField, Button, Card, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    marginTop: 20,
    marginLeft: 20,
  }
});

const EditTask = (props) => {
  const { task, onTaskComplete } = props;
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <div>
        <Checkbox />
        <TextField value={task.title} />
        <Button>
          <StarBorderIcon />
        </Button>
      </div>
    </Card>
  );
};

export default EditTask;