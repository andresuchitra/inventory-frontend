<template>
  <v-layout column style="height: 70vh;" class="overflow-auto">
    <v-layout column style="width: 100vw;" class="px-4">
      <v-data-table
        v-model="selected"
        fixed-header
        :hide-default-footer="true"
        show-select
        single-select
        :items-per-page="200"
        :headers="headers"
        :items="items"
        :height="'65vh'"
        class="elevation-1 pb-12"
        @item-selected="itemSelected"
        :footer-props="{
          disableItemsPerPage: true,
        }"
      >
        <template v-slot:item.booked="{ item }">
          <v-chip
            :color="item.booked ? 'green' : 'red'"
            dark
          >
            {{ item.booked }}
          </v-chip>
        </template>
        <template v-slot:item.listed="{ item }">
          <v-chip
            :color="item.listed ? 'green' : 'red'"
            dark
          >
            {{ item.listed }}
          </v-chip>
        </template>
      </v-data-table>
    </v-layout>
  </v-layout>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'InventoryList',
  data() {
    return {
      selected: undefined,
    };
  },
  computed: {
    headers() {
      return [
        {
          text: 'No',
          value: 'id',
        },
        {
          text: 'Vin#',
          value: 'vin',
          filter: (value) => {
            const key = this.$store.state.filterForm.vin;
            if (!key) return true;
            return value.toLowerCase().includes(key.toLowerCase());
          },
        },
        {
          text: 'Model',
          value: 'model',
          filter: (value) => {
            const key = this.$store.state.filterForm.model;
            return value.toLowerCase().includes(key.toLowerCase());
          },
        },
        {
          text: 'Make',
          value: 'make',
          filter: (value) => {
            const key = this.$store.state.filterForm.make;
            if (!key) return true;
            return value.toLowerCase().includes(key.toLowerCase());
          },
        },
        {
          text: 'Year',
          value: 'year',
        },
        {
          text: 'MSRP',
          value: 'msrp',
        },
        {
          text: 'Status',
          value: 'status',
          filter: (value) => {
            const key = this.$store.state.filterForm.status;
            if (!key) return true;
            return value.toLowerCase().includes(key.toLowerCase());
          },
        },
        {
          text: 'Booked',
          value: 'booked',
          filter: (value) => {
            const key = this.$store.state.filterForm.booked;
            if (!key) return true;
            return key === value;
          },
        },
        {
          text: 'Listed',
          value: 'listed',
          filter: (value) => {
            const key = this.$store.state.filterForm.listed;
            if (!key) return true;
            return key === value;
          },
        },
      ];
    },
    ...mapState({
      items: (state) => state.items,
    }),
  },
  methods: {
    itemSelected(ev) {
      if (ev.value) {
        this.$store.commit('SET_SELECTED_ITEM', ev.item);
      } else {
        this.$store.commit('SET_SELECTED_ITEM', {});
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.theme--light.v-data-table > .v-data-table__wrapper > table > thead > tr > th {
  font-size: 18px;
}
</style>
