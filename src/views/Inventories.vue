<template>
  <div style="width: 82vw;">
    <v-alert class="ma-4" style="width: 80vw;" v-model="showAlert"
      dense
      dismissible
      outlined
      prominent
      text
      type="error"
    >
      {{ errorMessage }}
    </v-alert>
    <h3 class="pt-4 px-2">Filters</h3>
    <v-row class="px-4" style="width: 82vw;">
        <v-flex xs12 sm12 lg3 md6 class="px-4">
        <v-text-field
          v-model="filterVin"
          append-icon="mdi-magnify"
          label="Search"
          placeholder="Search Vin#"
          single-line
          hide-details
        ></v-text-field>
      </v-flex>
      <v-flex xs12 sm12 lg3 md6 class="px-4">
        <v-text-field
          v-model="filterModel"
          append-icon="mdi-magnify"
          label="Search"
          placeholder="Search Model"
          single-line
          hide-details
        ></v-text-field>
      </v-flex>
      <v-flex xs12 sm12 lg3 md6 class="px-4">
        <v-text-field
          v-model="filterMake"
          append-icon="mdi-magnify"
          label="Search"
          placeholder="Search Make"
          single-line
          hide-details
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
    <v-flex v-if="loading" class="d-flex justify-center pa-12">
      <v-progress-circular indeterminate :size="70" color="primary"></v-progress-circular>
    </v-flex>
    <!-- Actual table  -->
    <inventory-list :items="$store.state.items" v-else />
    <v-flex class="pa-3 pb-10">
      <v-btn color="primary" class="op-btn">+</v-btn>
      <v-btn color="error" class="op-btn" @click.prevent="deleteItem">-</v-btn>
      <v-btn class="op-btn">Input File</v-btn>
    </v-flex>
  </div>
</template>

<script>
import InventoryList from '@/components/InventoryList.vue';
import api from '@/api';
import { mapState } from 'vuex';

export default {
  name: 'Inventories',
  data() {
    return {
      errorMessage: '',
      showAlert: false,
      loading: false,
      items: [],
      selected: -1,
      filtersData: {
        statuses: ['in_stock', 'ordered', 'sold'],
        booleans: [true, false],
      },
      msrpMax: 1000000,
    };
  },
  components: {
    InventoryList,
  },
  mounted() {
    this.loading = true;
    this.getItems();
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
    ...mapState({
      selectedItem: (state) => state.selectedItem,
    }),
    filterMsrp: {
      get() {
        return this.$store.state.filterForm.msrp;
      },
      set(val) {
        this.$store.commit('SET_MSRP', val);
      },
    },
    ...mapState({
      selectedItem: (state) => state.selectedItem,
    }),
  },
  methods: {
    getItems() {
      api.get('/cars')
        .then(({ data }) => {
          this.loading = false;

          this.$store.commit('SET_ITEMS', data?.data || []);
        })
        .catch((e) => {
          this.loading = false;
          this.showToast(e.error || 'Unexpected errror. Sorry for the inconvenience');
        });
    },
    showToast(msg) {
      this.errorMessage = msg;
      this.showAlert = true;
    },
    deleteItem() {
      const deleteId = this.selectedItem.id;

      if (deleteId) {
        api.delete(`/cars/${deleteId}`)
          .then(() => {
            this.loading = false;
            this.$store.commit('DELETE_ITEM', deleteId);
          })
          .catch((e) => {
            this.loading = false;
            this.showToast(e.error || 'Unexpected errror. Sorry for the inconvenience');
          });
      }
    },
    resetFilter() {
      this.filterSearch = undefined;
      this.filterStatus = undefined;
      this.filterBooked = undefined;
      this.filterListed = undefined;
      this.filterMsrp = [0, this.msrpMax];
    },
  },
};
</script>
<style lang="scss" scoped>
.op-btn {
  margin-right: 30px;
  font-size: 20px;
}
</style>
