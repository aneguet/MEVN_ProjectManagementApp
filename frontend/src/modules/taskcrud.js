import { ref, computed } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
const getTasks = () => {
  const route = useRoute();
  const router = useRouter();
  const projectTasks = ref({});
  const todoTasks = ref({});
  const doingTasks = ref({});
  const doneTasks = ref({});
  let requestError = ref('');
  const pId = computed(() => route.params.id);

  const CreateNewTask = async (data) => {
    data.project_id = pId.value;
    try {
      await axios
        .post('/tasks/task', data, {
          headers: { 'auth-token': localStorage.getItem('token') },
        })
        .then((res) => {
          console.log(res.data);
          router.push('/project/' + pId.value);
        });
    } catch (err) {
      console.log(err);
      requestError.value = err;
    }
  };

  const GetTasksByProject = async () => {
    try {
      await axios
        .get('/tasks/byProject', {
          headers: {
            'auth-token': localStorage.getItem('token'),
            id: pId.value,
          },
        })
        .then((res) => {
          projectTasks.value = res.data;
          setTasksByStatus();
          console.log(res.data);
        });
    } catch (err) {
      console.log(err);
    }
  };
  // We save the tasks in different arrays depending on the status
  const setTasksByStatus = () => {
    todoTasks.value = projectTasks.value.filter(
      (task) => task.task_status === 'Todo'
    );
    doneTasks.value = projectTasks.value.filter(
      (task) => task.task_status === 'Done'
    );
    doingTasks.value = projectTasks.value.filter(
      (task) => task.task_status === 'Doing'
    );
  };
  return {
    projectTasks,
    GetTasksByProject,
    todoTasks,
    doingTasks,
    doneTasks,
    CreateNewTask,
    requestError,
    pId,
  };
};
export default getTasks;
