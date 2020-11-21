import Vue from 'vue';
import Vuex from 'vuex';
import api from '@/api/index';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    selectedItem: {},
    newItemActive: false,
    dialog: false,
    items: [],
    showToast: false,
    filterForm: {
      booked: undefined,
      listed: undefined,
      status: '',
      vin: '',
      make: '',
      model: '',
      msrp: [],
    },
    filtersData: {
      statuses: ['in_stock', 'ordered', 'sold'],
      booleans: [true, false],
    },
  },
  mutations: {
    SET_NEW_ITEM_ACTIVE(state, data) {
      state.newItemActive = data;
    },
    SET_DIALOG(state, data) {
      state.dialog = data;
    },
    SET_ITEMS(state, data) {
      state.items = [...data];
    },
    SET_SELECTED_ITEM(state, data) {
      state.selectedItem = data;
    },
    DELETE_ITEM(state, id) {
      const copyItems = [...state.items];
      state.items = copyItems.filter((item) => item.id !== id);
    },
    SET_VIN(state, data) {
      state.filterForm = { ...state.filterForm, vin: data };
    },
    SET_MODEL(state, data) {
      state.filterForm = { ...state.filterForm, model: data };
    },
    SET_MAKE(state, data) {
      state.filterForm = { ...state.filterForm, make: data };
    },
    SET_STATUS(state, data) {
      state.filterForm = { ...state.filterForm, status: data };
    },
    SET_BOOKED(state, data) {
      state.filterForm = { ...state.filterForm, booked: data };
    },
    SET_LISTED(state, data) {
      state.filterForm = { ...state.filterForm, listed: data };
    },
    SET_MSRP(state, data) {
      state.filterForm = { ...state.filterForm, msrp: data };
    },
  },
});
