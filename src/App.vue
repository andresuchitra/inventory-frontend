<template>
  <v-app>
    <sidebar></sidebar>
    <v-app-bar app dense>
      <div class="title">Inventory List</div>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue';

export default {
  name: 'App',
  components: {
    Sidebar,
  },
  data: () => ({
    drawer: false,
  }),
};
</script>
