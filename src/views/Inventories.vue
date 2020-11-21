<template>
  <div>
    <v-alert class="ma-4" v-model="alert.show"
      dense
      dismissible
      outlined
      prominent
      text
      :type="alert.type"
    >
      {{ alert.message }}
    </v-alert>
    <filter-panel />
    <inventory-list />
    <v-flex class="pa-3 pb-10">
      <v-btn color="primary" class="op-btn" @click="$store.commit('SET_NEW_ITEM_ACTIVE', true)">+</v-btn>
      <v-btn color="error" class="op-btn" @click.prevent="deleteItem">-</v-btn>
      <v-btn class="op-btn">Input File</v-btn>
    </v-flex>
  </div>
</template>

<script>
import InventoryList from '@/components/InventoryList.vue';
import FilterPanel from '@/components/FilterPanel.vue';
import { mapState } from 'vuex';

export default {
  name: 'Inventories',
  components: {
    InventoryList,
    FilterPanel,
  },
  data() {
    return {
      alert: {
        message: '',
        type: 'success',
        show: false,
      },
      loading: false,
      selected: -1,
      newRowActive: false,
    };
  },
  mounted() {
    this.loading = true;
  },
  computed: {
    ...mapState({
      items: (state) => state.items,
    }),
  },
  methods: {
    showError(errorData) {
      this.alert.message = errorData || errorData.error || 'Unexpected Error';
      this.alert.type = 'error';
      this.alert.show = true;
    },
    showSuccess(msg) {
      this.alert.message = msg;
      this.alert.type = 'success';
      this.alert.show = true;
    },
    deleteItem() {
      const deleteId = this.selectedItem?.id;

      if (deleteId) {
        api.delete(`/cars/${deleteId}`)
          .then(() => {
            this.loading = false;
            this.$store.commit('DELETE_ITEM', deleteId);
          })
          .catch((e) => {
            this.loading = false;
            this.showError(e);
          });
      }
    },
    createItem(formData) {
      api.create('/cars', formData)
        .then(({ data }) => {
          this.$store.commit('SET_NEW_ITEM_ACTIVE', false);
          this.showSuccess('Item is successfully created!')
        })
        .catch((e) => {
          this.showError(e);
        });
    }
  },
};
</script>
<style lang="scss" scoped>
.op-btn {
  margin-right: 30px;
  font-size: 20px;
}
</style>
