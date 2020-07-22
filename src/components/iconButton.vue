<template>
  <v-btn
    :class="btnClass"
    :color="btnColor"
    :dark="!disabled"
    block
    :width="width"
    :loading="loading"
    :disabled="disabled"
    @click="click"
  >
    <v-icon class="mr-2 float-left" :color="iconColor" width="20" height="20">
      {{ icon }}
    </v-icon>
    {{ text }}
  </v-btn>
</template>

<script>
export default {
  name: 'IconBtn',
  props: {
    text: { type: String, default: '' },
    width: { type: Number, default: 50 },
    icon: { type: String, default: undefined },
    iconColor: { type: String, default: undefined },
    loading: { type: Boolean, default: false },
    btnColor: { type: String, default: 'default' },
    btnClass: { type: String, default: undefined },
    disabled: { type: Boolean, default: false }
  },
  methods: {
    click() {
      this.$emit('click')
    }
  }
}
</script>
