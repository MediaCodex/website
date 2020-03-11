<template>
  <v-dialog v-model="show" persistent width="290px">
    <template v-slot:activator="{ on }">
      <v-text-field
        v-bind="textFieldProps"
        :readonly="readonly"
        :value="value"
        :append-icon="appendIcon"
        :prepend-icon="prependIcon"
        :label="label"
        :placeholder="placeholder"
        :loading="loading"
        :outlined="outlined"
        :rounded="rounded"
        :flat="flat"
        v-on="on"
      ></v-text-field>
    </template>
    <v-card>
      <v-card-title>{{ datetime }}</v-card-title>

      <!-- tabs -->
      <v-tabs v-model="tab" slider-size="4" grow>
        <v-tab key="date"><v-icon>event</v-icon></v-tab>
        <v-tab key="time"><v-icon>query_builder</v-icon></v-tab>
      </v-tabs>

      <!-- pickers -->
      <v-tabs-items v-model="tab">
        <v-tab-item key="date">
          <v-date-picker v-model="date" scrollable no-title class="picker" />
        </v-tab-item>
        <v-tab-item key="time">
          <v-time-picker
            v-model="time"
            format="24hr"
            scrollable
            no-title
            class="picker"
          />
        </v-tab-item>
      </v-tabs-items>

      <!-- actions -->
      <v-card-actions>
        <v-btn text color="primary" @click="close">
          {{ cancelBtn }}
        </v-btn>
        <v-btn text color="primary" @click="save">
          {{ saveBtn }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import moment from 'moment'
export default {
  name: 'Datetime',
  props: {
    saveBtn: { type: String, default: 'Save' },
    cancelBtn: { type: String, default: 'Cancel' },
    value: { type: [Date, String], default: null },
    readonly: { type: Boolean, default: true },
    // VTextField passthrough (only stylistic ones are defined manually)
    textFieldProps: { type: Object, default: () => ({}) },
    appendIcon: { type: String, default: undefined },
    prependIcon: { type: String, default: undefined },
    label: { type: String, default: undefined },
    placeholder: { type: String, default: undefined },
    loading: { type: Boolean, default: false },
    outlined: { type: Boolean, default: false },
    rounded: { type: Boolean, default: false },
    flat: { type: Boolean, default: false }
  },
  data: () => ({
    oldData: {},
    show: false,
    tab: 'date',
    date: '',
    time: ''
  }),
  computed: {
    datetime() {
      const time = this.time || '00:00:00'
      return moment(`${this.date} ${time}`).format('L LT')
    }
  },
  methods: {
    close() {
      this.date = this.oldData.date
      this.time = this.oldData.time
      this.oldData = {}
      this.show = false
    },
    save() {
      // TODO: fix persistence
      this.oldData = { date: this.date, time: this.time }
      this.$emit('input', this.datetime)
      this.close()
    }
  }
}
</script>

<style scoped>
.picker {
  padding: 0 !important;
  box-shadow: none;
  -webkit-box-shadow: none;
}
</style>
