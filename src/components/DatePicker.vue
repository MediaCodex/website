<template>
  <v-menu
    ref="airedFromMenu"
    v-model="show"
    :close-on-content-click="false"
    :return-value.sync="date"
    transition="scale-transition"
    offset-y
    min-width="290px"
  >
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
      />
    </template>
    <v-date-picker v-model="date" no-title scrollable>
      <v-spacer></v-spacer>
      <v-btn text color="primary" @click="close">
        {{ cancelBtn || this.$t('cancel') }}
      </v-btn>
      <v-btn text color="primary" @click="save">
        {{ saveBtn || this.$t('save') }}
      </v-btn>
    </v-date-picker>
  </v-menu>
</template>

<script>
export default {
  name: 'DatePicker',
  props: {
    saveBtn: { type: String, default: null },
    cancelBtn: { type: String, default: null },
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
    show: false,
    date: null
  }),
  methods: {
    close() {
      this.show = false
    },
    save() {
      this.$emit('input', this.date)
      this.show = false
    }
  }
}
</script>
