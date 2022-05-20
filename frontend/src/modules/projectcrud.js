import { ref } from 'vue';

import axios from 'axios';

const getProjects = () => {
  const userProjects = ref({});

  const GetProjectsByUser = async () => {
    try {
      await axios
        .get('/projects/byUser', {
          headers: { 'auth-token': localStorage.getItem('token') },
        })
        .then((res) => {
          userProjects.value = res.data;
          console.log(res.data);
        });
    } catch (err) {
      console.log(err);
    }
  };
  // Gets all projects (admin)
  const GetAllProjects = async () => {
    try {
      await axios
        .get('/projects', {
          headers: { 'auth-token': localStorage.getItem('token') },
        })
        .then((res) => {
          userProjects.value = res.data;
          console.log(res.data);
        });
    } catch (err) {
      console.log(err);
    }
  };
  return {
    userProjects,
    GetProjectsByUser,
    GetAllProjects,
  };
};
export default getProjects;
