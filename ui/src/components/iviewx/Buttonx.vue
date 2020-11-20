<template>
  <Button
    :disabled="disabled"
    :size="size"
    :loading="loading"
    :icon="icon"
    :type="type"
    @click="onClick"
  >
    {{ title }}
    <slot v-if="$slots.default" />
  </Button>
</template>

<script>
export default {
  name: 'Buttonx',
  props: {
    disabled: {
      type: Boolean,
      default: undefined
    },
    type: {
      type: String,
      default: 'default'
    },
    size: {
      type: String,
      default: undefined
    },
    title: {
      type: String,
      default: ''
    },
    loading: {
      type: Boolean,
      default: undefined
    },
    icon: {
      type: String,
      default: undefined
    }
  },
  methods: {
    onClick () {
      this.$emit('on-click')
    }
  }
}
</script>
