<template>
  <div>
    <h1>All Todos</h1>
    <button @click="newTodo()">➕ New todo (static)</button>
    <br />
    <!-- We can bind data with two different types: 
    one way binding 
    and two way binding (v-model) -->
    <!-- AUTHOR Input -->
    <span>New author: {{ state.newAuthor }}</span>
    <br />
    <input type="text" placeholder="Author" v-model="state.newAuthor" />
    <br />
    <!-- TODO Input -->
    <span>New todo: {{ state.newTodoItem }}</span>
    <br />
    <input type="text" placeholder="Todo" v-model="state.newTodoItem" />
    <div v-for="item in state.todos" :key="item._id">
      <!-- Instead of router-link, we could also send the info with a prop or using params-->
      <!-- Investigate Dynamic Route Matching with Params, Named routes -->
      <router-link :to="`/todo/${item._id}`">
        <h4>{{ item.author }}</h4>
        <p>{{ item.todo }}</p>
        <button @click="updateTodo(item._id)">🔃 Update</button>
      </router-link>
      <button @click="deleteTodo(item._id)">❌ Delete</button>
    </div>
  </div>
</template>

<script>
import todocrud from '../modules/todocrud'; // composable(reusable)
import { onMounted } from 'vue';
export default {
  setup() {
    const { state, GetAllTodos, newTodo, deleteTodo, updateTodo } = todocrud();
    // const state = reactive({
    //   todos: {},
    // });
    // function GetAll() {
    //   fetch('http://localhost:4000/api/todos')
    //     .then((res) => res.json())
    //     .then((data) => {
    //       state.todos = data;
    //     });
    // }

    onMounted(() => {
      // When page is load we load the data
      // GetAll();
      GetAllTodos();
    });
    return { state, GetAllTodos, newTodo, deleteTodo, updateTodo };
  },
};
</script>

<style lang="scss"></style>
