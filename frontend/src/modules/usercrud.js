import { ref } from 'vue';

import axios from 'axios';

// Reusable functions
const getUsers = () => {
  const user = ref({});
  const users = ref({});
  const newProjectUsers = ref({});

  // Get Logged in User (for login only)
  const GetUser = async () => {
    try {
      await axios
        .get('/users/userLogin', {
          headers: { 'auth-token': localStorage.getItem('token') },
        })
        .then((res) => {
          console.log(res.data);
          user.value = res.data;
          console.log(user.value);
        });
    } catch (err) {
      console.log(err);
      user.value = null;
    }
  };
  // Get all users
  const GetAllUsers = async () => {
    try {
      await axios
        .get('/users', {
          headers: { 'auth-token': localStorage.getItem('token') },
        })
        .then((res) => {
          users.value = res.data;
        })
        .then(() => {
          SetNewProjectUsers();
        });
    } catch (err) {
      console.log(err);
    }
  };

  const SetNewProjectUsers = () => {
    newProjectUsers.value = users.value.map((element) => ({
      role: element.role,
      email: element.email,
      _id: element._id,
    }));
    let aux = newProjectUsers.value;
    newProjectUsers.value = aux.filter(
      (u) => u._id != localStorage.getItem('user_id')
    );
    if (localStorage.getItem('role') == 'user') {
      // We don't show the admins if the user doesn't have the rights
      newProjectUsers.value = newProjectUsers.value.filter(
        (u) => u.role != 'admin'
      );
    }

    newProjectUsers.value = [newProjectUsers.value, []];
    // console.log(newProjectUsers.value);
  };

  // Get User by ID (Admin)
  // Get all users
  // Update user by ID
  // Delete user by ID
  return {
    user,
    users,
    newProjectUsers,
    GetUser,
    GetAllUsers,
  };
};
export default getUsers;
