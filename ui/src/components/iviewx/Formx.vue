<template>
  <Form
    ref="formx"
    :model="model"
    :rules="rules"
    :label-width="labelWidth"
  >
    <slot />
  </Form>
</template>

<script>
export default {
  name: 'Formx',
  props: {
    model: {
      type: Object,
      default: undefined
    },
    labelWidth: {
      type: Number,
      default: 95
    },
    rules: {
      type: Object,
      default: undefined
    }
  },
  methods: {
    resetFields () {
      this.$refs.formx.resetFields()
    },
    validate (callback) {
      return this.$refs.formx.validate(callback)
    },
    validateField (prop, callback) {
      this.$refs.formx.validateField(prop, callback)
    }
  }
}
</script>
