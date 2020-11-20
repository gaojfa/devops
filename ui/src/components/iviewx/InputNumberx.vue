<template>
  <InputNumber
    :value="value"
    :max="max"
    :min="min"
    :step="step"
    :formatter="value => `${value}${unit}`"
    :parser="value => value.replace(unit, '')"
    style="border-radius: 0;"
    @on-change="onChange"
  />
</template>
<script>
export default {
  name: 'InputNumberx',
  props: {
    numObjData: {
      type: Object,
      default: () => null
    },
    max: {
      type: Number,
      default: Infinity
    },
    min: {
      type: Number,
      default: -Infinity
    },
    unit: {
      type: String,
      default: ''
    },
    value: {
      type: Number,
      default: 1
    },
    step: {
      type: Number,
      default: 1
    },
    disabled: {
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
    },
    format (value) {
      return value
    }
  }
}
</script>
<style scoped>
  /* .bk-group-details{
    width: 100%;
    display: inline-table;
    margin-bottom: 10px;
  } */
</style>
