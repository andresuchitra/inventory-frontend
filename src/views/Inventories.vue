<template>
  <div>
    <v-alert class="ma-4" v-model="alertShow"
      dense
      dismissible
      outlined
      prominent
      text
      :type="alertType"
    >
      {{ alertMessage }}
    </v-alert>
    <filter-panel />
    <inventory-list />
    <v-flex class="pa-3 pb-10">
      <v-btn color="primary" class="op-btn" @click="$store.commit('SET_NEW_ITEM_ACTIVE', true)">
        <span style="font-size: 20px; font-weight: 700;">+</span>
      </v-btn>
      <v-btn color="error" class="op-btn" @click.prevent="deleteItem">
        <span style="font-size: 20px; font-weight: 700;">-</span>
      </v-btn>
      <v-dialog
        v-model="dialog"
        max-width="600px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            v-on="on"
          >
            Input File
          </v-btn>
        </template>
        <Form v-on:create="handleCreate" v-on:update="handleUpdate" />
      </v-dialog>
    </v-flex>
  </div>
</template>

<script>
import InventoryList from '@/components/InventoryList.vue';
import FilterPanel from '@/components/FilterPanel.vue';
import Form from '@/components/Form.vue';
import { mapState } from 'vuex';
import api from '../api/index';

export default {
  name: 'Inventories',
  components: {
    InventoryList,
    FilterPanel,
    Form,
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
      selectedItem: (state) => state.selectedItem,
      alertType: (state) => state.alertType,
      alertMessage: (state) => state.alertMessage,
    }),
    dialog: {
      get() {
        return this.$store.state.dialog;
      },
      set(value) {
        this.$store.commit('SET_DIALOG', value);
      },
    },
    alertShow: {
      get() {
        return this.$store.state.alertShow;
      },
      set(value) {
        this.$store.commit('SET_ALERT_SHOW', value);
      },
    }
  },
  methods: {
    deleteItem() {
      const deleteId = this.selectedItem?.id;

      if (deleteId) {
        api.delete(`/cars/${deleteId}`)
          .then(() => {
            this.loading = false;

            this.$store.commit('SET_SELECTED_ITEM', undefined);
            this.$store.commit('DELETE_ITEM', deleteId);

            this.$store.dispatch('SHOW_SUCCESS', 'Item is successfully deleted!')
          })
          .catch((e) => {
            this.loading = false;
            this.$store.dispatch('SHOW_ERROR', e || e.error || 'Unexpected Error')
          });
      }
    },
    handleCreate(formData) {
      api.post('/cars', formData)
        .then(({ data }) => {
          this.$store.commit('ADD_ITEM', data.data);

          this.dialog = false;
          this.$store.dispatch('SHOW_SUCCESS', 'Item is successfully created!')
        })
        .catch((e) => {
          this.$store.dispatch('SHOW_ERROR', e || e.error || 'Unexpected Error')
        });
    },
    handleUpdate(formData) {
      const id = formData.id;
      formData = delete formData.id;

      api.put(`/cars/${id}`, formData)
        .then(({ data }) => {
          this.$store.dispatch('SHOW_SUCCESS', 'Item is successfully updated!')
          this.getItems()
        })
        .catch((e) => {
          this.$store.dispatch('SHOW_ERROR', e || e.error || 'Unexpected Error')
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
