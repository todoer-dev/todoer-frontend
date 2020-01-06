import React, { useState, useEffect, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Folders, { defaultFolders } from '../../components/Folders';
import TaskList from '../../components/TaskList';
import EditTask from '../../components/EditTask';
import { TaskService } from '../../services/TaskService';

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
    const fetchData = async () => {
      const res = await TaskService.fetchAll();
      setAllTasks(res);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (activeLabel === 'All') {
      setTasks(allTasks);
    } else if (activeLabel === 'Active') {
      setTasks(allTasks.filter(t => !t.completedAt));
    } else if (activeLabel === 'Completed') {
      setTasks(allTasks.filter(t => !!t.completedAt));
    } else if (activeLabel === 'Starred') {
      setTasks(allTasks.filter(t => t.isStarred));
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
    async taskId => {
      const task = allTasks.find(t => t.id === taskId);
      if (!task) {
        return;
      }
      await TaskService.patch(taskId, {
        completed_at: task.completedAt ? null : new Date(),
      });
      setAllTasks(
        allTasks.map(t =>
          t.id === taskId
            ? {
                ...t,
                completedAt: t.completedAt
                  ? null
                  : new Date().toLocaleDateString(),
              }
            : t
        )
      );
    },
    [allTasks]
  );

  const createTask = useCallback(
    async taskData => {
      const newTask = {
        ...taskData,
        completed_at: taskData.labels.includes('Completed') ? new Date() : null,
        labels: taskData.labels.filter(l => !defaultFolders.includes(l)),
        is_tarred: taskData.labels.includes('Starred'),
      };
      const nt = await TaskService.create(newTask);
      setAllTasks([...allTasks, nt]);
    },
    [allTasks]
  );

  const onTaskDelete = useCallback(
    async taskId => {
      await TaskService.delete(taskId);
      setAllTasks(allTasks.filter(task => task.id !== taskId));
      setSelectedTaskId();
    },
    [allTasks]
  );

  const onTaskStarred = useCallback(
    async taskId => {
      const task = allTasks.find(t => t.id === taskId);
      if (!task) {
        return;
      }
      await TaskService.patch(taskId, {
        is_starred: !task.isStarred,
      });
      setAllTasks(
        allTasks.map(t =>
          t.id === taskId ? { ...t, isStarred: !t.isStarred } : t
        )
      );
    },
    [allTasks]
  );

  const editTask = useCallback(
    async ({ title, description, dueDate, id }) => {
      await TaskService.patch(id, {
        title,
        description,
        due_date: new Date(dueDate),
      });
      setAllTasks(
        allTasks.map(t =>
          t.id === id
            ? {
                ...t,
                title,
                description,
                dueDate,
              }
            : t
        )
      );
    },
    [allTasks]
  );

  const addLabel = useCallback(
    async ({ taskId, label }) => {
      const task = allTasks.find(t => t.id === taskId);
      if (!task) {
        return;
      }
      await TaskService.patch(taskId, {
        labels: [...task.labels, label],
      });
      setAllTasks(
        allTasks.map(t =>
          t.id === taskId ? { ...t, labels: [...t.labels, label] } : t
        )
      );
    },
    [allTasks]
  );

  const removeLabel = useCallback(
    async ({ taskId, label }) => {
      const task = allTasks.find(t => t.id === taskId);
      if (!task) {
        return;
      }
      await TaskService.patch(taskId, {
        labels: task.labels.filter(l => l !== label),
      });
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
