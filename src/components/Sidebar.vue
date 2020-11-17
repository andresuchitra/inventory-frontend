<template>
  <v-navigation-drawer app width="256" v-model="drawer">
      <div class="d-flex justify-center py-2">
        <v-avatar height="100" width="100">
          <v-img src="~@/assets/logo.svg" width="inherit"/>
        </v-avatar>
      </div>
      <v-list
        nav
        dense
      >
        <v-list-item-group>
          <v-list-item @click="$router.push('/cars').catch(err => {})">
            <v-list-item-title>Inventories</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Markets</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Report Setting</v-list-item-title>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item @click="$router.push('/').catch(err => {})">
            <v-list-item-title>Sign Out</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
</template>

<script>
export default {
  name: 'Sidebar',
  data() {
    return {
      drawer: true,
    };
  },
};
</script>

<style>

</style>
