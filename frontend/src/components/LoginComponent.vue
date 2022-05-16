<template>
  <div class="generic-card">
    <div class="auth-wrapper">
      <div class="auth-inner">
        <div>
          <img
            src="../assets/logo.png"
            alt="Logo of time fly that consists of a fly"
            width="150"
            class="text-center"
          />
        </div>
        <form
          @submit.prevent="handleLoginSubmit"
          class="p-fluid"
          autocomplete="off"
        >
          <p class="logo-text">Welcome to Timefly</p>
          <!-- <h3>Login</h3> -->
          <Message v-if="errors.message" severity="error" :closable="false">{{
            errors.message
          }}</Message>
          <!-- Email -->
          <div class="field">
            <div class="p-float-label p-input-icon-right">
              <i class="pi pi-envelope" />
              <InputText
                id="email"
                type="email"
                v-model="loginUser.email"
                :class="{ 'p-invalid': errors.email && submitted }"
                autocomplete="off"
              />
              <label for="email">Email*</label>
            </div>
          </div>
          <!-- Password -->
          <div class="field">
            <div class="p-float-label">
              <Password
                id="password"
                type="password"
                v-model="loginUser.password"
                :class="{ 'p-invalid': errors.password && submitted }"
                autocomplete="off"
                :feedback="false"
                toggleMask
              >
              </Password>
              <label for="password">Password*</label>
            </div>
          </div>
          <Button type="submit" label="Login" class="p-button submit-btn" />
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
export default {
  name: 'LoginComponent',
  emits: ['userstate'],
  setup(props, { emit }) {
    const loginUser = reactive({
      email: '',
      password: '',
    });
    const errors = reactive({
      email: '',
      password: '',
      message: '',
    });
    const submitted = ref(false);
    const router = useRouter();
    const handleLoginSubmit = async () => {
      resetErrors();
      submitted.value = true;
      const data = {
        email: loginUser.email,
        password: loginUser.password,
      };
      console.log(data);
      if (areFieldsValid()) {
        try {
          const res = await axios.post('/users/login', data);
          console.log(res.data.data);
          // Store user token in localStorage
          localStorage.setItem('token', res.data.data.token);
          localStorage.setItem('role', res.data.data.user.role);
          localStorage.setItem('avatar', res.data.data.user.avatar);
          // We send the state new state of the user as a custom event to the parent
          // Since props cannot be changed in child components
          emit('userstate', res.data.data.user);

          // Redirect to Home page
          router.push({ path: '/' });
        } catch (err) {
          errors.message = err.response ? err.response.data.error : err;
          console.log(errors);
        }
      }
    };
    const resetErrors = () => {
      errors.email = '';
      errors.password = '';
      errors.message = '';
      submitted.value = false;
    };
    // validate fields
    let areFieldsValid = () => {
      if (!loginUser.email || loginUser.email == '') {
        errors.email = 'Email cannot be empty';
        errors.message = errors.email;
        return false;
      } else if (!loginUser.password || loginUser.password == '') {
        errors.password = 'Password cannot be empty';
        errors.message = errors.password;
        return false;
      } else {
        return true;
      }
    };
    return { loginUser, errors, submitted, handleLoginSubmit };
  },
};
</script>

<style>
.generic-card {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  min-height: 100%;
  padding: 20px;
}
.logo-text {
  font-size: 31px;
  color: #323232;
  margin-bottom: 0.5em;
  margin-top: 1px;
  font-family: 'Damion', cursive;
}

.generic-card .card {
  min-width: 450px;
}

.generic-card .field {
  margin-bottom: 1.5rem;
}
form .submit-btn {
  width: 100%;
}

@media screen and (max-width: 960px) {
  .card {
    width: 80%;
  }
}
</style>
