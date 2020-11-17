<template>
  <v-app>
    <sidebar></sidebar>
    <v-app-bar app>
      <div class="title">Inventory List</div>
    </v-app-bar>

    <v-main>
      <v-layout class="overflow-auto mx-2">
        <router-view></router-view>
      </v-layout>
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
