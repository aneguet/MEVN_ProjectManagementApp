import { ref, computed } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';
const getProjects = () => {
  const route = useRoute();
  const userProjects = ref({});
  const projectLeader = ref({});
  const project = ref({});
  const timeSchedule = ref({});
  const remainingHours = ref(0);
  const remainingHPercentage = ref(0);
  const projectId = computed(() => route.params.id);
  let projectState = ref('Ongoing');
  let projectStateClass = ref('info');

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
  const setProjectStateClass = (projectState) => {
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
    console.log(projectStateClass.value);
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
          setProjectStateClass(projectState.value);
        });
    } catch (err) {
      console.log(err);
    }
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
  };
};
export default getProjects;
