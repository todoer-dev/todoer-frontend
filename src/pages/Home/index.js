import React, { useState, useEffect, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Folders, { defaultFolders } from '../../components/Folders';
import TaskList from '../../components/TaskList';
import EditTask from '../../components/EditTask';

// const availableFolders = ['Label 1', 'Label 2', 'Label 10'];

const sampletasks = [
  {
    id: 1,
    title: 'Task 1',
    completed: false,
    dueDate: '2020-12-12',
    labels: [],
  },
  {
    id: 2,
    title: 'Task 2',
    completed: true,
    dueDate: '2020-12-12',
    completedAt: new Date().toLocaleDateString(),
    labels: ['Label 2'],
  },
  {
    id: 3,
    title: 'Task 3',
    completed: true,
    dueDate: '2020-12-12',
    completedAt: new Date().toLocaleDateString(),
    labels: ['Label 2', 'Label 10'],
  },
  {
    id: 4,
    title: 'Task 4',
    completed: false,
    dueDate: '2020-12-12',
    labels: ['Label 10'],
  },
  {
    id: 5,
    title: 'Task 5',
    completed: false,
    dueDate: '2020-12-12',
    labels: [],
  },
];

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
}));

const Home = props => {
  const classes = useStyles();
  const [activeLabel, setActiveLabel] = useState('All');
  const [allTasks, setAllTasks] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [selectedTaskId, setSelectedTaskId] = useState();
  const [availableFolders, setAvailableFolders] = useState([]);

  useEffect(() => {
    setAllTasks(sampletasks);
  }, []);

  useEffect(() => {
    if (activeLabel === 'All') {
      setTasks(allTasks);
    } else if (activeLabel === 'Active') {
      setTasks(allTasks.filter(t => !t.completed));
    } else if (activeLabel === 'Completed') {
      setTasks(allTasks.filter(t => !!t.completed));
    } else if (activeLabel === 'Starred') {
      setTasks(allTasks.filter(t => t.starred));
    } else {
      setTasks(allTasks.filter(t => t.labels.includes(activeLabel)));
    }
  }, [activeLabel, allTasks]);

  useEffect(() => {
    const folders = allTasks.reduce(
      (acc, task) => new Set([...acc, ...task.labels]),
      new Set()
    );
    setAvailableFolders([...folders].sort());
  }, [allTasks]);

  const onTaskComplete = useCallback(
    taskId => {
      setAllTasks(
        allTasks.map(t =>
          t.id === taskId
            ? {
                ...t,
                completed: !t.completed,
                completedAt: new Date().toLocaleDateString(),
              }
            : t
        )
      );
    },
    [allTasks]
  );

  const createTask = useCallback(
    taskData => {
      const newTask = {
        ...taskData,
        completed: false,
        id: allTasks[allTasks.length - 1].id + 1,
        labels: taskData.labels.filter(l => !defaultFolders.includes(l)),
      };
      setAllTasks([...allTasks, newTask]);
    },
    [allTasks]
  );

  const onTaskDelete = useCallback(
    taskId => {
      setAllTasks(allTasks.filter(task => task.id !== taskId));
      setSelectedTaskId();
    },
    [allTasks]
  );

  const onTaskStarred = useCallback(
    taskId => {
      setAllTasks(
        allTasks.map(t => (t.id === taskId ? { ...t, starred: !t.starred } : t))
      );
    },
    [allTasks]
  );

  const editTask = useCallback(
    ({ title, note, dueDate, id }) => {
      setAllTasks(
        allTasks.map(t =>
          t.id === id
            ? {
                ...t,
                title,
                note,
                dueDate,
              }
            : t
        )
      );
    },
    [allTasks]
  );

  const addLabel = useCallback(
    ({ taskId, label }) => {
      setAllTasks(
        allTasks.map(t =>
          t.id === taskId ? { ...t, labels: [...t.labels, label] } : t
        )
      );
    },
    [allTasks]
  );

  const removeLabel = useCallback(
    ({ taskId, label }) => {
      setAllTasks(
        allTasks.map(t =>
          t.id === taskId
            ? { ...t, labels: t.labels.filter(l => l !== label) }
            : t
        )
      );
    },
    [allTasks]
  );

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
        onTaskSelect={taskId => setSelectedTaskId(taskId)}
        onTaskStarred={onTaskStarred}
        selectedTaskId={selectedTaskId}
      />
      {selectedTaskId && tasks.find(t => t.id === selectedTaskId) && (
        <EditTask
          task={tasks.find(t => t.id === selectedTaskId)}
          onTaskComplete={onTaskComplete}
          onTaskDelete={onTaskDelete}
          onTaskStarred={onTaskStarred}
          editTask={editTask}
          addLabel={addLabel}
          removeLabel={removeLabel}
        />
      )}
    </div>
  );
};

export default Home;
