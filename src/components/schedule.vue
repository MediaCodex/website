<template>
  <div>
    <v-switch v-model="monthly" :label="$t('create.schedule.monthly')" />

    <!-- weekday -->
    <v-select
      v-if="!monthly"
      v-model="weekday"
      :items="weekdays"
      :label="$t('create.schedule.weekday')"
      :outlined="outlined"
      :rounded="rounded"
      :flat="flat"
    />

    <!-- monthday -->
    <v-select
      v-if="monthly"
      v-model="monthday"
      :items="monthdays"
      :label="$t('create.schedule.monthday')"
      :outlined="outlined"
      :rounded="rounded"
      :flat="flat"
    />

    <!-- time -->
    <v-menu
      ref="menu"
      v-model="showTimePicker"
      :close-on-content-click="false"
      :nudge-right="40"
      :return-value.sync="time"
      transition="scale-transition"
      offset-y
      min-width="290px"
      max-width="290px"
    >
      <template v-slot:activator="{ on }">
        <v-text-field
          v-model="time"
          :label="$t('create.schedule.time')"
          readonly
          :outlined="outlined"
          :rounded="rounded"
          :flat="flat"
          v-on="on"
        />
      </template>
      <v-time-picker
        v-if="showTimePicker"
        v-model="time"
        full-width
        @click:minute="$refs.menu.save(time)"
      />
    </v-menu>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'Schedule',
  props: {
    outlined: { type: Boolean, default: false },
    rounded: { type: Boolean, default: false },
    flat: { type: Boolean, default: false }
  },
  data: () => ({
    showTimePicker: false,
    // prettier-ignore
    monthdays: [
      '01', '02', '03', '04', '05', '06', '07',
      '08', '09', '10', '11', '12', '13', '14',
      '15', '16', '17', '18', '19', '20', '21',
      '22', '23', '24', '25', '26', '27', '28',
      '29', '30', '31'
    ],
    monthly: false,
    weekday: moment.weekdays()[0],
    monthday: '01',
    time: null
  }),
  computed: {
    weekdays() {
      return moment.weekdays()
    }
  }
}
</script>
