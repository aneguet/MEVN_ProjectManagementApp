<template>
  <div>
    <h1>Update a Todo</h1>
    <div v-for="item in todo" :key="item._id">
      <h4>Author: {{ item.author }}</h4>
      <h4>Todo Item: {{ item.todo }}</h4>
    </div>
    <hr />
    <!-- AUTHOR Input -->
    <span>New author: {{ state.newAuthor }}</span>
    <br />
    <input type="text" placeholder="Author" v-model="state.newAuthor" />
    <br />
    <!-- TODO Input -->
    <span>New todo: {{ state.newTodoItem }}</span>
    <br />
    <input type="text" placeholder="Todo" v-model="state.newTodoItem" />
    <button @click="updateTodo()">🔃 Update Todo</button>
    <hr />
  </div>
</template>

<script>
import todocrud from '../modules/todocrud'; // composable(reusable)
export default {
  setup() {
    const { state, updateTodo, GetTodoById, todo, todoId } = todocrud();
    GetTodoById();
    return { state, updateTodo, todo, todoId };
  },
};
</script>

<style lang="scss"></style>
