<template>
  <div id="sidebar" class="lcolumn">
    <!-- Sidebar -->
    <PanelMenu :model="items" />
  </div>
</template>

<script>
import { ref } from 'vue';
import utils from '../modules/utils';
export default {
  name: 'SidebarComponent',
  setup() {
    const { isUserAdmin } = utils();
    // Menu
    let items = ref([]);
    if (isUserAdmin()) {
      // admin
      items = ref([
        {
          key: '0',
          label: 'Settings',
          icon: 'pi pi-fw pi-cog',
          to: '/settings',
        },
        {
          key: '1',
          label: 'Users',
          icon: 'pi pi-fw pi-user',
          to: '/users',
        },
        {
          key: '2',
          label: 'Projects',
          icon: 'pi pi-th-large ',
          to: '/',
        },
        {
          key: '3',
          label: 'Tasks',
          icon: 'pi pi-fw pi-fw pi-file',
          to: '/tasks',
        },
      ]);
    } else {
      // user
      items = ref([
        {
          key: '0',
          label: 'Settings',
          icon: 'pi pi-fw pi-cog',
          to: '/settings',
        },

        {
          key: '1',
          label: 'Projects',
          icon: 'pi pi-th-large ',
          to: '/',
        },
      ]);
    }

    return {
      items,
    };
  },
};
</script>

<style>
#sidebar .p-panelmenu {
  width: 22rem;
}

#sidebar .p-panelmenu.p-component,
#sidebar .p-panelmenu-panel {
  /* height: 100vh; */
  background-color: white;
  width: 200px;
}
.lcolumn {
  width: 212px;
  height: auto;
  margin-top: 56px;
  background-color: #fff;
}
</style>
