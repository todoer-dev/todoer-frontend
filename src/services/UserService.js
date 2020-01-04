const apiBase = 'https://todoer-app.herokuapp.com/api';

export const userService  = {
  isAuthenticated: () => true,
  signup: ({ email, password }) => {
    return fetch(`${apiBase}/users`, {
      method: 'POST',
      body: JSON.stringify({
        user: {
          email, password,
        },
      })
    });
  },
};
