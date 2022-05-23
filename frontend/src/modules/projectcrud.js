import { ref, computed } from 'vue';
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';

const getProjects = () => {
  const route = useRoute();
  const router = useRouter();
  const userProjects = ref({});
  const projectLeader = ref({});
  const project = ref({});
  const timeSchedule = ref({});
  const remainingHours = ref(0);
  const remainingHPercentage = ref(0);
  const projectId = computed(() => route.params.id);
  let projectState = ref('Ongoing');
  let projectStateClass = ref('info');
  let requestError = ref('');
  let newTaskProjectMembers = ref([]);

  const GetProjectState = () => {
    // We define the project state depending on the time schedule and the current date and time
    let nowDate = new Date();
    nowDate = nowDate.toISOString(); // We convert the date to the mongodb type to compare it

    if (remainingHours.value == 0) {
      if (nowDate > timeSchedule.value.due_date) {
        projectState.value = 'Complete';
      }
    } else {
      if (nowDate > timeSchedule.value.due_date) {
        projectState.value = 'Overdue';
      }
    }
  };
  const SetProjectStateClass = (projectState) => {
    switch (projectState) {
      case 'Complete':
        projectStateClass.value = 'success';
        break;
      case 'Ongoing':
        projectStateClass.value = 'info';
        break;
      case 'Overdue':
        projectStateClass.value = 'warning';
        break;
      default:
        break;
    }
  };
  const CreateNewProject = async (data) => {
    try {
      await axios
        .post('/projects/project', data, {
          headers: { 'auth-token': localStorage.getItem('token') },
        })
        .then((res) => {
          console.log(res.data);
          router.push('/project/' + res.data._id);
        });
    } catch (err) {
      console.log(err);
      requestError.value = err;
    }
  };
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
  // Get project by project Id
  const GetProjectById = async () => {
    try {
      await axios
        .get('/projects/project', {
          headers: {
            'auth-token': localStorage.getItem('token'),
            id: projectId.value,
          },
        })
        .then((res) => {
          project.value = res.data;
          console.log(res.data);
          // Save leader
          projectLeader.value = res.data.leader._id;
          // Save time schedule array
          timeSchedule.value = res.data.time_schedule;
          // Save remaining hours and calculate percentage
          remainingHours.value =
            timeSchedule.value.estimated_hours - timeSchedule.value.spent_hours;
          remainingHPercentage.value =
            remainingHours.value == 0
              ? 0
              : (remainingHours.value * 100) /
                timeSchedule.value.estimated_hours;
        })
        .then(() => {
          // Save project state depending on the time schedule
          GetProjectState();
        })
        .then(() => {
          SetProjectStateClass(projectState.value);
          SetNewTaskProjectMembers();
        });
    } catch (err) {
      console.log(err);
    }
  };

  const SetNewTaskProjectMembers = () => {
    let aux;
    aux = project.value.members;
    newTaskProjectMembers.value = aux.map((el) => ({
      _id: el.member_id._id,
      email: el.member_id.email,
    }));
  };

  return {
    userProjects,
    GetProjectsByUser,
    GetAllProjects,
    GetProjectById,
    project,
    projectLeader,
    timeSchedule,
    remainingHours,
    remainingHPercentage,
    projectState,
    projectStateClass,
    CreateNewProject,
    requestError,
    newTaskProjectMembers,
  };
};
export default getProjects;
