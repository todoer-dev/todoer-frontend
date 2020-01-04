import React, { useState, useEffect, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Folders from '../../components/Folders';
import TaskList from '../../components/TaskList';
import EditTask from '../../components/EditTask';

const availableFolders = [
  'Label 1',
  'Label 2',
  'Label 10'
];

const sampletasks = [
  {
    id: 1,
    title: 'Task 1',
    completed: false,
    dueDate: '12-12-2020',
    labels: [],
  },
  {
    id: 2,
    title: 'Task 2',
    completed: true,
    dueDate: '12-12-2020',
    completedAt: new Date().toLocaleDateString(),
    labels: ['Label 2']
  },
  {
    id: 3,
    title: 'Task 3',
    completed: true,
    dueDate: '12-12-2020',
    completedAt: new Date().toLocaleDateString(),
    labels: ['Label 2', 'Label 10']
  },
  {
    id: 4,
    title: 'Task 4',
    completed: false,
    dueDate: '12-12-2020',
    labels: ['Label 10'],
  },
  {
    id: 5,
    title: 'Task 5',
    completed: false,
    dueDate: '12-12-2020',
    labels: [],
  }
];

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
  },
}));

const Home = (props) => {
  const classes = useStyles();
  const [activeLabel, setActiveLabel] = useState('All');
  const [tasks, setTasks] = useState(sampletasks);
  const [selectedTaskId, setSelectedTaskId] = useState();

  useEffect(() => {
    if(activeLabel === 'All') {
      setTasks(sampletasks);
    } else if (activeLabel === 'Active') {
      setTasks(sampletasks.filter(t => !t.completed));
    } else if (activeLabel === 'Completed') {
      setTasks(sampletasks.filter(t => !!t.completed));
    } else {
      setTasks(sampletasks.filter(t => t.labels.includes(activeLabel)));
    }
    setSelectedTaskId(null);
  }, [activeLabel]);

  const onTaskComplete = useCallback((taskId) => {
    setTasks(tasks.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t));
  }, [tasks]);

  const createTask = useCallback((taskData) => {
    const newTask = {
      ...taskData,
      completed: false,
      id: sampletasks[sampletasks.length - 1].id + 1,
    };
    sampletasks.push(newTask);
    setTasks([...tasks, newTask]);
  }, [tasks]);

  return (
    <div className={classes.root}>
      <Folders
        labels={availableFolders}
        active={activeLabel}
        setActive={setActiveLabel}
      />
      <TaskList
        tasks={tasks}
        onTaskComplete={onTaskComplete}
        activeLabel={activeLabel}
        createTask={createTask}
        onTaskSelect={(taskId) => setSelectedTaskId(taskId)}
      />
      {selectedTaskId && (
        <EditTask
          task={tasks.find(t => t.id === selectedTaskId)}
        />
      )}
    </div>
  );
};

export default Home;