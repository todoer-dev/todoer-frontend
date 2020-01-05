import { apiBase } from '../config';
import { userService } from './UserService';

const dateFields = ['completedAt', 'dueDate'];

const parseDates = task => {
  const newTask = { ...task };
  dateFields.forEach(f => {
    newTask[f] = newTask[f] ? new Date(newTask[f]).toLocaleDateString() : null;
  });
  return newTask;
};

const mapTask = task =>
  parseDates({
    id: task.id,
    ...task.attributes,
  });

export const TaskService = {
  headers: {
    Authorization: userService.authToken,
    'Content-Type': 'application/json',
  },
  fetchAll: async () => {
    return fetch(`${apiBase}/tasks`, {
      method: 'GET',
      headers: TaskService.headers,
    })
      .then(res => res.json())
      .then(res => res.data.map(mapTask));
  },
  create: async data => {
    return fetch(`${apiBase}/tasks`, {
      method: 'POST',
      headers: TaskService.headers,
      body: JSON.stringify(data),
    })
      .then(res => res.json())
      .then(res => mapTask(res.data));
  },
  delete: async id => {
    return fetch(`${apiBase}/tasks/${id}`, {
      method: 'DELETE',
      headers: TaskService.headers,
    });
  },
  patch: async (id, data) => {
    return fetch(`${apiBase}/tasks/${id}`, {
      method: 'PATCH',
      headers: TaskService.headers,
      body: JSON.stringify({
        task: data,
      }),
    }).then(res => res.json());
  },
};
