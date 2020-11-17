<template>
  <v-row class="text-center">
    <v-col class="my-4">
      <h1 class="display-2 font-weight-bold mb-3">
        Welcome to Car Inventory
      </h1>
    </v-col>

    <v-col
      class="mb-5"
      cols="12"
    >
      <h2 class="headline font-weight-bold mb-3">
        Simple Car Inventory App
      </h2>
      <router-link to="/cars">Go to Cars List</router-link>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'Home',
};
</script>
