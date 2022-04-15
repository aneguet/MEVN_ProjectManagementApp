import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
const getTodos = () => {
  const route = useRoute();
  const router = useRouter();
  const todoId = computed(() => route.params.id);
  const state = ref({
    newAuthor: '',
    newTodoItem: '',
    todos: {},
  });
  // GET ALL > GET
  const GetAllTodos = async () => {
    try {
      await fetch('http://localhost:4000/api/todos')
        .then((res) => res.json())
        .then((data) => {
          state.value.todos = data; // When retrieving ref value, we need to use .value
        });
    } catch (error) {
      console.log(error);
    }
  };
  const todo = ref({});
  // GET TODO BY ID > GET
  const GetTodoById = async () => {
    try {
      // We can also call to the api method that gets a specific todo by id, providing the id, and not filtering later all the todos after retrieving all
      await fetch('http://localhost:4000/api/todos')
        .then((res) => res.json())
        .then((data) => {
          todo.value = data.filter((t) => t._id === todoId.value);
        });
    } catch (error) {
      console.log(error);
    }
  };
  // NEW TODO > POST
  const newTodo = () => {
    const requestOptions = {
      method: 'POST',
      headers: {
        // we declare that we are sending a json object
        'Content-Type': 'application/json',
        // 'auth-token': state.token
      },
      body: JSON.stringify({
        // JSON.stringify converts the key value objects into a JSON object
        author: state.value.newAuthor,
        todo: state.value.newTodoItem,
      }),
    };
    try {
      fetch('http://localhost:4000/api/todos/new', requestOptions).then(
        GetAllTodos()
      );
    } catch (error) {
      console.log(error);
    }
  };
  // const newTodo = () => {
  //   try {
  //     fetch('http://localhost:4000/api/todos/new', { method: 'POST' });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // DELETE TODO BY ID > DELETE
  const deleteTodo = (_id) => {
    try {
      // _id = '625836e63464999697bf4c80';
      fetch('http://localhost:4000/api/todos/delete/' + _id, {
        method: 'DELETE',
      }).then(GetAllTodos()); // reload not working, only if we set a debug breakpoint on GetAllTodos() function
    } catch (error) {
      console.log(error);
    }
  };
  // UPDATE TODO BY ID > PUT
  const updateTodo = () => {
    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        author: state.value.newAuthor,
        todo: state.value.newTodoItem,
      }),
    };
    try {
      fetch(
        'http://localhost:4000/api/todos/update/' + todoId.value,
        requestOptions
      )
        .then((res) => res.json())
        .then((res) => console.log(res)); // For possible errors
      router.push('/todos');
    } catch (error) {
      console.log(error);
    }
  };
  return {
    state,
    GetAllTodos,
    newTodo,
    deleteTodo,
    updateTodo,
    todo,
    todoId,
    GetTodoById,
  };
};
export default getTodos;
