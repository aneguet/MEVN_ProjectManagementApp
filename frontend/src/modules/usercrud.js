import { ref } from 'vue';

import axios from 'axios';

// Reusable functions
const getUsers = () => {
  //   const route = useRoute();
  //   const router = useRouter();
  //   const state = reactive({
  //     role: '',
  //     first_name: '',
  //     last_name: '',
  //     email: '',
  //     password: '',
  //     password_confirm: '',
  //     phone: '',
  //     avatar: '',
  //     weekly_hours: '',
  //   });
  const user = ref({});

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

  // Get User by ID (Admin)
  // Get all users (Admin)
  // Update user by ID
  // Delete user by ID
  return {
    user,
    GetUser,
  };
};
export default getUsers;
