import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import AllInclusiveIcon from '@material-ui/icons/AllInclusive';
import DoneIcon from '@material-ui/icons/Done';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import User from '../User';

const drawerWidth = 240;

export const defaultFolders = ['All', 'Completed', 'Active', 'Starred'];

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  elem: {
    marginLeft: 10,
  },
  elemActive: {
    backgroundColor: '#eeeeee',
  },
}));

const FolderIcon = props => {
  const { label } = props;
  switch (label) {
    case 'All':
      return <AllInclusiveIcon />;
    case 'Completed':
      return <DoneIcon />;
    case 'Active':
      return <CheckBoxOutlineBlankIcon />;
    case 'Starred':
      return <StarBorderIcon />;
    default:
      return <FormatListBulletedIcon />;
  }
};

const Folders = props => {
  const classes = useStyles();
  const { labels, active, setActive } = props;

  return (
    <Drawer
      className={classes.drawer}
      variant='permanent'
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor='left'
    >
      <div className={classes.toolbar}>
        <User />
      </div>
      <Divider />
      <List>
        {[...defaultFolders, ...labels].map((text, index) => (
          <ListItem
            button
            key={text}
            selected={active === text}
            onClick={() => setActive(text)}
          >
            <FolderIcon label={text} />
            <ListItemText className={classes.elem} primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
    </Drawer>
  );
};

export default Folders;
