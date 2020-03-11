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
    monthly: false,
    weekday: moment.weekdays()[0],
    monthday: '01',
    time: null
  }),
  computed: {
    weekdays() {
      return moment.weekdays()
    },
    monthdays() {
      const days = []
      for (let i = 1; i <= 31; i++) {
        days.push(`${i}`.padStart(2, '0'))
      }
      return days
    }
  }
}
</script>
