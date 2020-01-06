import React, { useCallback } from 'react';
import { userService } from '../../services/UserService';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '100%',
  },
});

const User = props => {
  const history = useHistory();
  const classes = useStyles();
  const logout = useCallback(() => {
    userService.logout();
    history.push('/login');
  }, [history]);

  return (
    <Button
      className={classes.root}
      onClick={logout}
      startIcon={<ExitToAppIcon />}
    >
      Logout
    </Button>
  );
};

export default User;
