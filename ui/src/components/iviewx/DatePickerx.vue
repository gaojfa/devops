<template>
  <DatePicker
    :value="value"
    :disabled="disabled"
    :editable="editable"
    :clearable="clearable"
    :confirm="confirm"
    :type="type"
    :format="format"
    :placeholder="placeholder"
    :size="size"
    :transfer="transfer"
    :options="options"
    @on-change="onChange"
    @on-ok="onOk"
    @on-clear="onClear"
  />
</template>

<script>
export default {
  name: 'DatePickerx',
  props: {
    value: {
      type: [Date, String, Array],
      default: undefined
    },
    disabled: {
      type: Boolean,
      default: false
    },
    editable: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: true
    },
    confirm: {
      type: Boolean,
      default: true
    },
    type: {
      type: String,
      default: 'datetime'
    },
    format: {
      type: String,
      default: ''
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
      default: undefined
    },
    options: {
      type: Object,
      default: undefined
    }

  },
  methods: {
    onChange (val) {
      this.$emit('input', val)
    },
    onOk () {
      this.$emit('on-ok')
      this.$emit('on-search')

      if (this.$parent && typeof this.$parent.validate === 'function') {
        this.$parent.validate()
      }
    },
    onClear () {
      this.$emit('input', '')
      this.$emit('on-clear')
      this.$emit('on-search')

      if (this.$parent && typeof this.$parent.validate === 'function') {
        this.$parent.validate()
      }
    }
  }
}
</script>
