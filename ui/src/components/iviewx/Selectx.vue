<template>
  <Select
    :value="value"
    :disabled="disabled"
    :clearable="clearable"
    :multiple="multiple"
    :placeholder="placeholder"
    :size="size"
    :filterable="filterable"
    :transfer="transfer"
    :label-in-value="labelInValue"
    @on-change="onChange"
  >
    <slot />
  </Select>
</template>

<script>
export default {
  name: 'Selectx',
  props: {
    value: {
      type: [String, Number, Array],
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: true
    },
    multiple: {
      type: Boolean,
      default: false
    },
    filterable: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: undefined
    },
    size: {
      type: String,
      default: undefined
    },
    transfer: {
      type: Boolean,
      default: true
    },
    labelInValue: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onChange (value) {
      this.$emit('input', value)
      this.$emit('on-change', value)

      if (this.$parent && typeof this.$parent.validate === 'function') {
        this.$parent.validate()
      }
    }
  }
}
</script>
