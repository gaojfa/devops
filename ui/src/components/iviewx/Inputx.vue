<template>
  <i-input
    :readonly="readonly"
    :value="value"
    :disabled="disabled"
    :search="search"
    :placeholder="placeholder"
    :size="size"
    :clearable="isClearable"
    :type="type"
    :rows="rows"
    @on-change="onChange"
    @on-search="onSearch"
    @on-focus="onFocus"
    @on-blur="onBlur"
    @on-keydown="onkeydown"
  >
    <span
      v-if="unit"
      slot="append"
    >
      {{ unit }}
    </span>
  </i-input>
</template>

<script>
export default {
  name: 'Inputx',
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    search: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: undefined
    },
    rows: {
      type: Number,
      default: 2
    },
    clearable: {
      type: Boolean,
      default: undefined
    },
    type: {
      type: String,
      default: undefined
    },
    unit: {
      type: String,
      default: undefined
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
    }
  },
  computed: {
    isClearable () {
      if (this.disabled) {
        return false
      }

      if (this.clearable === undefined) {
        return this.search === undefined || this.search === false
      }

      return this.clearable
    }
  },
  methods: {
    onChange (event) {
      this.$emit('input', event.target.value)
      this.$emit('on-change', event)

      if (this.$parent && typeof this.$parent.validate === 'function') {
        this.$parent.validate()
      }
    },
    onSearch (val) {
      this.$emit('on-search', val)
    },
    onFocus (val) {
      this.$emit('on-focus', val)
    },
    onBlur (val) {
      this.$emit('on-blur', val)
    },
    onkeydown (event) {
      this.$emit('on-keydown', event)
    }
  }
}
</script>
