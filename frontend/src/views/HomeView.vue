<template>
  <div class="rcolumn">
    <div id="welcomeuser">
      <p class="text-center">Hi, {{ user.first_name }}</p>
    </div>
    <div>
      <!-- Projects Table -->
      <DataTable :value="userProjects">
        <template #empty> No records found </template>
        <template #loading> Loading records, please wait... </template>
        <template #header>
          <div>List of Projects</div>
        </template>
        <Column field="name" header="Name" sortable></Column>
        <Column field="stakeholder" header="Stakeholder"></Column>
        <Column header="Leader">
          <template #body="{ data }">
            <img
              :alt="data.leader.first_name"
              :src="data.leader.avatar"
              width="32"
              style="vertical-align: middle; margin-right: 4px"
            />
            <span class="image-text"
              >{{ data.leader.first_name }} {{ data.leader.last_name }}</span
            >
          </template>
        </Column>
        <Column header="Actions">
          <template #body="slotProps">
            <Button
              icon="pi pi-eye"
              class="p-button-rounded p-button-success mx-2"
              @click="viewProject(slotProps.data._id)"
            />
            <Button
              icon="pi pi-trash"
              class="p-button-rounded p-button-danger"
              @click="deleteProject(slotProps.data._id)"
            />
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<script>
import usercrud from '../modules/usercrud'; // composable(reusable)
import projectcrud from '../modules/projectcrud'; // composable(reusable)
import utils from '../modules/utils';
import { onMounted } from 'vue';
export default {
  name: 'HomeView',
  setup() {
    const { user, GetUser } = usercrud();
    const { GetProjectsByUser, userProjects, GetAllProjects } = projectcrud();
    const { isUserLoggedIn, isUserAdmin } = utils();
    // Table
    const formatDate = (value) => {
      return value.toLocaleDateString('en-US', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });
    };
    const viewProject = (data) => {
      // project id
      console.log(data);
    };
    const deleteProject = (data) => {
      // project id
      console.log(data);
    };
    onMounted(() => {
      // If user is logged in, we get the data
      if (isUserLoggedIn()) {
        GetUser();
        // use role > user projects
        // admin role > all projects
        isUserAdmin() ? GetAllProjects() : GetProjectsByUser();
      }
    });

    return {
      user,
      userProjects,
      formatDate,
      viewProject,
      deleteProject,
    };
  },
};
</script>

<style scoped>
.table-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.rcolumn {
  margin: 56px 100px;
  /* background-color: green; */
  height: 100vh;
  flex: auto;
  width: auto;
}
</style>
