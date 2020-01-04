import React from 'react';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  activeIcon: {
    color: '#f3f347',
  },
}));

const Star = props => {
  const classes = useStyles();
  const { starred } = props;

  if (starred) {
    return <StarIcon className={classes.activeIcon} />;
  }

  return <StarBorderIcon />;
};

export default Star;
