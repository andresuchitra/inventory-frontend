import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    selectedItem: {},
    newItemActive: false,
    dialog: false,
    items: [],
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
    alertMessage: '',
    alertType: 'success',
    alertShow: false,
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
    ADD_ITEM(state, data) {
      state.items.push(data)
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
    SET_ALERT_SHOW(state, data) {
      state.alertShow = data;
    },
    SET_ALERT_TYPE(state, data) {
      state.alertType = data;
    },
    SET_ALERT_MESSAGE(state, data) {
      state.alertMessage = data;
    },
  },
  actions: {
    SHOW_SUCCESS: ({ commit }, message) => {
      commit('SET_ALERT_SHOW', true)
      commit('SET_ALERT_TYPE', 'success')
      commit('SET_ALERT_MESSAGE', message)
    },
    SHOW_ERROR: ({ commit }, message) => {
      commit('SET_ALERT_SHOW', true)
      commit('SET_ALERT_TYPE', 'error')
      commit('SET_ALERT_MESSAGE', message)
    },
  },
});
