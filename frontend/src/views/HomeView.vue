<template>
  <div id="sidebar-main">
    <div id="sidebar" class="lcolumn">
      <!-- Sidebar -->
      <PanelMenu :model="items" />
    </div>
    <div class="rcolumn">
      <div id="welcomeuser">
        <p class="text-center">Hi, {{ user.first_name }}</p>
        <Button
          label="New Project"
          icon="pi pi-plus"
          class="mr-2"
          id="new-project"
          @click="newProject()"
        />
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
                class="p-button-rounded p-button-info mx-2"
                @click="viewProject(slotProps.data._id)"
              />&nbsp;
              <Button
                icon="pi pi-pencil"
                class="p-button-rounded p-button-success mx-2"
                @click="editProject(slotProps.data._id)"
              />
              &nbsp;
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
  </div>
</template>

<script>
import usercrud from '../modules/usercrud'; // composable(reusable)
import projectcrud from '../modules/projectcrud'; // composable(reusable)
import utils from '../modules/utils';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
export default {
  name: 'HomeView',
  setup() {
    const router = useRouter();
    const { user, GetUser } = usercrud();
    const { GetProjectsByUser, userProjects, GetAllProjects } = projectcrud();
    const { isUserLoggedIn, isUserAdmin } = utils();

    const newProject = () => {
      router.push('/project/new');
    };
    const viewProject = (projectId) => {
      // project id
      console.log(projectId);
      router.push('/project/' + projectId);
    };
    const editProject = (projectId) => {
      // project id
      console.log(projectId);
    };
    const deleteProject = (projectId) => {
      // project id
      console.log(projectId);
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
    // Menu
    const items = [
      {
        label: 'Settings',
        icon: 'pi pi-fw pi-cog',
        to: '/settings',
      },
      {
        label: 'Users',
        icon: 'pi pi-fw pi-user',
        to: '/users',
        visible: () => isUserAdmin(),
      },
      {
        label: 'Projects',
        icon: 'pi pi-th-large ',
        to: '/',
      },
    ];

    return {
      user,
      userProjects,
      newProject,
      viewProject,
      deleteProject,
      editProject,
      items,
    };
  },
};
</script>

<style>
.table-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.rcolumn {
  margin: 27px 100px;
  height: 100%;
  min-height: 100%;
  flex: auto;
  width: auto;
}
#welcomeuser {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
#welcomeuser p {
  color: white;
  font-size: 20px;
}
</style>
