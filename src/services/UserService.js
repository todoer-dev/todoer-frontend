import { apiBase } from '../config';

export const userService = {
  isAuthenticated: () => !!userService.authToken,
  signup: ({ email, password }) => {
    return fetch(`${apiBase}/users`, {
      method: 'POST',
      body: JSON.stringify({
        user: {
          email,
          password,
        },
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },
  login: async ({ email, password }) => {
    const { auth_token: authToken } = await fetch(`${apiBase}/authentication`, {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(res => res.json());
    userService.authToken = authToken;
    localStorage.setItem('token', authToken);
  },
  logout: () => {
    localStorage.removeItem('token');
  },
  authToken: null,
};

const token = localStorage.getItem('token');
userService.authToken = token;
