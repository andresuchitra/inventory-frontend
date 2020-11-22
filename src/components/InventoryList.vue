<template>
  <v-flex column class="px-4">
    <v-flex v-if="loading" class="d-flex justify-center pa-12">
      <v-progress-circular indeterminate :size="70" color="primary"></v-progress-circular>
    </v-flex>
    <v-form ref="form" v-model="valid" lazy-validation @submit.prevent="createItem">
      <v-data-table
        v-model="selected"
        fixed-header
        :hide-default-footer="true"
        show-select
        single-select
        item-key="id"
        :headers="headers"
        disable-pagination
        :items="items"
        :height="'65vh'"
        :style="'overflow-x: auto;'"
        class="elevation-1 pb-4"
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
        <template v-slot:body.append>
          <tr id='#new-row' class="new-row" v-if="newItemActive" >
            <td></td>
            <td colspan="2" class="d-flex align-center justify-space-between pa-0">
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    icon color="error"
                    @click.prevent="cancelNewItem"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon>
                      mdi-delete
                    </v-icon>
                  </v-btn>
                </template>
                Delete
              </v-tooltip>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    icon color="light"
                    @click="resetNewItem"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon>
                      mdi-close
                    </v-icon>
                  </v-btn>
                </template>
                Clear fields
              </v-tooltip>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    icon color="success"
                    v-bind="attrs"
                    v-on="on"
                    type="submit"
                  >
                    <v-icon>
                      mdi-check
                    </v-icon>
                  </v-btn>
                </template>
                Submit
              </v-tooltip>
            </td>
            <td>
              <v-text-field
                clearable
                v-model="newItem.vin"
                label="newItemVin"
                placeholder="Set Vin#"
                single-line
                required
                :rules="rules.vin"
              ></v-text-field>
            </td>
            <td>
              <v-text-field
                v-model="newItem.model"
                label="newItemModel"
                placeholder="Set Model"
                single-line
                :rules="rules.model"
              ></v-text-field>
            </td>
            <td>
              <v-text-field
                v-model="newItem.make"
                label="newItemMake"
                placeholder="Set Make"
                single-line
                :rules="rules.make"
              ></v-text-field>
            </td>
            <td>
              <v-text-field
                number
                v-model="newItem.year"
                label="newItemYear"
                placeholder="Set Year"
                single-line
                :rules="rules.year"
              ></v-text-field>
            </td>
            <td>
              <v-text-field
                v-model="newItem.msrp"
                label="newItemMsrp"
                placeholder="Set MSRP / Price"
                single-line
                :rules="rules.msrp"
              ></v-text-field>
            </td>
            <td>
              <v-select
                :items="filtersData.statuses"
                label="Status"
                v-model="newItem.status"
                single-line
                hide-details
              ></v-select>
            </td>
            <td>
              <v-select
                :items="filtersData.booleans"
                label="Booked"
                single-line
                v-model="newItem.booked"
                hide-details
              ></v-select>
            </td>
            <td>
              <v-flex>
                <v-select
                  label="Listed"
                  :items="filtersData.booleans"
                  v-model="newItem.listed"
                  single-line
                  hide-details
                ></v-select>
              </v-flex>
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-form>
  </v-flex>
</template>

<script>
import api from '@/api';
import { mapState } from 'vuex';
import carRules from '../rules';
import fillDefaultData from '../helpers/form';

export default {
  name: 'InventoryList',
  props: {
    newRowActive: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      valid: false,
      selected: undefined,
      loading: true,
      newItem: {
        vin: undefined,
        model: undefined,
        make: undefined,
        year: undefined,
        msrp: undefined,
        status: undefined,
        booked: undefined,
        listed: undefined
      },
      rules: carRules,
    };
  },
  computed: {
    ...mapState({
      items: (state) => state.items,
      filtersData: (state) => state.filtersData,
      newItemActive: (state) => state.newItemActive,
    }),
    headers() {
      const compInstance = this;
      return [
        {
          text: 'No',
          value: 'id',
        },
        {
          text: 'Vin#',
          value: 'vin',
          filter: (value) => compInstance.checkExists(value, 'vin'),
        },
        {
          text: 'Model',
          value: 'model',
          filter: (value) => compInstance.checkExists(value, 'model'),
        },
        {
          text: 'Make',
          value: 'make',
          filter: (value) => compInstance.checkExists(value, 'make'),
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
          filter: (value) => compInstance.checkExists(value, 'status'),
        },
        {
          text: 'Booked',
          value: 'booked',
          filter: (value) => compInstance.checkEqual(value, 'booked'),
        },
        {
          text: 'Listed',
          value: 'listed',
          filter: (value) => compInstance.checkEqual(value, 'listed'),
        },
      ];
    },
  },
  methods: {
    getItems() {
      this.loading = true
      api.get('/cars')
        .then(({ data }) => {
          this.loading = false;

          this.$store.commit('SET_ITEMS', data?.data || []);
        })
        .catch((e) => {
          this.loading = false;
          this.$store.dispatch('SHOW_ERROR', e || e.error || 'Unexpected errror. Sorry for the inconvenience');
        });
    },
    itemSelected(ev) {
      if (ev.value) {
        this.$store.commit('SET_SELECTED_ITEM', ev.item);
      } else {
        this.$store.commit('SET_SELECTED_ITEM', {});
      }
    },
    checkExists(value, attribute) {
      const key = this.$store.state.filterForm[attribute];
      if (!key) return true;
      return value?.toLowerCase().includes(key.toLowerCase());
    },
    checkEqual(value, attribute) {
      const key = this.$store.state.filterForm[attribute];
      if (!key) return true;
      return value === key;
    },
    resetNewItem() {
      this.$refs.form.resetValidation();
      this.$refs.form.reset();
    },
    cancelNewItem() {
      this.$store.commit('SET_NEW_ITEM_ACTIVE', false);
      this.resetNewItem();
    },
    createItem() {
      const isValid = this.$refs.form.validate();

      if(isValid) {
        this.newItem = fillDefaultData(this.newItem)

        api.post('/cars', this.newItem)
          .then(({ data }) => {
            this.$store.commit('ADD_ITEM', data.data);
            this.$store.dispatch('SHOW_SUCCESS', 'Item is successfully created!')
            this.$store.commit('SET_NEW_ITEM_ACTIVE', false);
          })
          .catch((e) => {
            this.$store.dispatch('SHOW_ERROR', e || e.error || 'Unexpected Error')
          });
      }
    },
  },
  created() {
    this.getItems();
  },
};
</script>
<style lang="scss" scoped>
.theme--light.v-data-table > .v-data-table__wrapper > table > thead > tr > th {
  font-size: 18px;
}
.v-text-field {
  padding: 0;
  margin: 0;
}
.v-data-table ::v-deep .v-data-table__wrapper {
  width: 100vw;
  padding-bottom: 120px;
}
.new-row {
  &::v-deep .v-input {
    font-size: 0.875rem;
  }

  &::v-deep .v-select__slot {
    font-size: 0.875rem;

    label {
      font-size: 0.875rem;
    }
  }
}
</style>
