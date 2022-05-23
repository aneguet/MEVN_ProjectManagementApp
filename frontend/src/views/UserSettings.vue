<template>
  <div id="sidebar-main">
    <div id="sidebar" class="lcolumn">
      <!-- Sidebar -->
      <PanelMenu :model="items" />
    </div>
    <div class="rcolumn">
      <div id="page-title"><p>User settings</p></div>
    </div>
  </div>
</template>

<script>
import utils from '../modules/utils';
import { onMounted } from 'vue';
export default {
  name: 'UserSettings',
  setup() {
    const { isUserAdmin } = utils();

    onMounted(() => {});
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
      items,
    };
  },
};
</script>

<style scoped></style>
