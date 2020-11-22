<template>
  <v-card>
    <v-card-title>
      <span class="headline">{{ title }}</span>
    </v-card-title>
    <v-card-text>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-row>
          <v-col
            cols="12"
            sm="6"
          >
            <v-text-field
              v-model="internalData.vin"
              clearable
              label="Vin#"
              required
              :rules="rules.vin"
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            sm="6"
          >
            <v-text-field
              label="Model"
              clearable
              :rules="rules.model"
              v-model="internalData.model"
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            sm="6"
          >
            <v-text-field
              label="Make"
              clearable
              :rules="rules.model"
              v-model="internalData.make"
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            sm="6"
          >
            <v-text-field
              label="Year"
              type="number"
              :rules="rules.year"
              v-model="internalData.year"
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            sm="6"
          >
            <v-text-field
              label="MSRP"
              type="number"
              :rules="rules.msrp"
              v-model="internalData.msrp"
            >
              <span slot="prepend" style="font-size: 18px;">$</span>
            </v-text-field>
          </v-col>
          <v-col
            cols="12"
            sm="6"
          >
            <v-select
              :items="filtersData.statuses"
              label="Status"
              required
            ></v-select>
          </v-col>
          <v-col
            cols="12"
            sm="6"
          >
            <v-select
              v-model="internalData.booked"
              :items="filtersData.booleans"
              label="Booked"
            ></v-select>
          </v-col>
          <v-col
            cols="12"
            sm="6"
          >
            <v-select
              v-model="internalData.listed"
              :items="filtersData.booleans"
              label="Listed"
            ></v-select>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
    <v-card-actions class="pa-4">
      <v-spacer />
      <v-btn
        color="light"
        text
        @click="resetForm"
      >
        Clear
      </v-btn>
      <v-btn
        color="error"
        text
        @click.native="$store.commit('SET_DIALOG', false)"
      >
        Close
      </v-btn>
      <v-btn
        color="success"
        @click="checkAndSubmit"
      >
        {{ submitText }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import { mapState } from 'vuex';
import carRules from '../rules';
import fillDefaultData from '../helpers/form';

export default {
  name: 'Form',
  props: {
    formData: {
      type: Object,
      default: () => {},
    },
    title: {
      type: String,
      default: 'Create New Item',
    },
    isEdit: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      valid: false,
      internalData: {
        vin: undefined,
        model: undefined,
        make: undefined,
        year: undefined,
        msrp: undefined,
        status: undefined,
        booked: undefined,
        listed: undefined,
      },
      rules: carRules,
    };
  },
  computed: {
    submitText() {
      if (this.isEdit) {
        return 'Update';
      }
      
      return 'Save';
    },
    ...mapState({
      filtersData: (state) => state.filtersData,
    }),
  },
  methods: {
    initializeFormData() {
      if(this.isEdit) {
        this.internalData = Object.assign({}, this.formData);
      }
    },
    checkAndSubmit() {
      if(this.$refs.form.validate()) {
          this.internalData = fillDefaultData(this.internalData)

          if (!this.isEdit) {
            this.$emit('create', this.internalData)
          }
          else {
            this.$emit('update', this.internalData)
          }
      }
    },
    resetForm() {
      this.$refs.form.resetValidation();
      this.$refs.form.reset();
    },
  },
  create() {
    this.initializeFormData();
  },
}
</script>

<style>

</style>