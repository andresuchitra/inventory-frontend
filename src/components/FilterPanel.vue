<template>
  <v-row class="px-4 pt-2">
    <v-flex xs12 sm12 lg2 md6 class="px-4">
      <v-text-field
        v-model="filterVin"
        append-icon="mdi-magnify"
        label="Search"
        placeholder="Search Vin#"
        single-line
        hide-details
        clearable
      ></v-text-field>
    </v-flex>
    <v-flex xs12 sm12 lg2 md6 class="px-4">
      <v-text-field
        v-model="filterModel"
        append-icon="mdi-magnify"
        label="Search"
        placeholder="Search Model"
        single-line
        hide-details
        clearable
      ></v-text-field>
    </v-flex>
    <v-flex xs12 sm12 lg2 md6 class="px-4">
      <v-text-field
        v-model="filterMake"
        append-icon="mdi-magnify"
        label="Search"
        placeholder="Search Make"
        single-line
        hide-details
        clearable
      ></v-text-field>
    </v-flex>
    <v-flex xs12 lg2 md3 class="px-4">
      <v-select
        :items="filtersData.statuses"
        label="Status"
        v-model="filterStatus"
      ></v-select>
    </v-flex>
    <v-flex xs12 lg2 md2 class="px-4">
      <v-select
        :items="filtersData.booleans"
        label="Booked"
        v-model="filterBooked"
      ></v-select>
    </v-flex>
    <v-flex xs12 lg2 md2 class="px-4">
      <v-select
        :items="filtersData.booleans"
        label="Listed"
        v-model="filterListed"
      ></v-select>
    </v-flex>
    <v-flex xs12 lg3 md3 class="px-4">
      <v-range-slider
        label="MSRP"
        thumb-size="50"
        v-model="filterMsrp"
        step="1000"
        min="0"
        :max="msrpMax"
      >
        <template v-slot:thumb-label="props">
          <div class="py-2 px-8">{{ props.value }}</div>
        </template>
      </v-range-slider>
    </v-flex>
    <v-flex xs12 lg2 md2 class="px-4">
      <v-btn color="light" @click="resetFilter">Reset Filter</v-btn>
    </v-flex>
  </v-row>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'FilterPanel',
  data() {
    return {
      msrpMax: 1000000,
    };
  },
  mounted() {
    this.filterMsrp = [0, this.msrpMax];
  },
  computed: {
    filterVin: {
      get() {
        return this.$store.state.filterForm.vin;
      },
      set(val) {
        this.$store.commit('SET_VIN', val);
      },
    },
    filterMake: {
      get() {
        return this.$store.state.filterForm.make;
      },
      set(val) {
        this.$store.commit('SET_MAKE', val);
      },
    },
    filterModel: {
      get() {
        return this.$store.state.filterForm.model;
      },
      set(val) {
        this.$store.commit('SET_MODEL', val);
      },
    },
    filterStatus: {
      get() {
        return this.$store.state.filterForm.status;
      },
      set(val) {
        this.$store.commit('SET_STATUS', val);
      },
    },
    filterBooked: {
      get() {
        return this.$store.state.filterForm.booked;
      },
      set(val) {
        this.$store.commit('SET_BOOKED', val);
      },
    },
    filterListed: {
      get() {
        return this.$store.state.filterForm.listed;
      },
      set(val) {
        this.$store.commit('SET_LISTED', val);
      },
    },
    filterMsrp: {
      get() {
        return this.$store.state.filterForm.msrp;
      },
      set(val) {
        this.$store.commit('SET_MSRP', val);
      },
    },
    ...mapState({
      filtersData: (state) => state.filtersData,
    })
  },
  methods: {
    resetFilter() {
      this.filterModel = undefined;
      this.filterVin = undefined;
      this.filterMake = undefined;
      this.filterStatus = undefined;
      this.filterBooked = undefined;
      this.filterListed = undefined;
      this.filterMsrp = [0, this.msrpMax];
    },
  },
}
</script>

<style>

</style>