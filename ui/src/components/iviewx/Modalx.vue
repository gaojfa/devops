<template>
  <Modal
    :value="value"
    :closable="closable"
    :mask-closable="maskClosable"
    :loading="submitting"
    :title="title"
    :width="width"
    class="modalx"
    @on-visible-change="onVisibleChange"
    @on-hidden="onHidden"
    @submit.native.prevent
  >
    <template
      v-if="$slots.header"
      slot="header"
    >
      <slot name="header" />
    </template>

    <template
      v-if="$slots.footer"
      slot="footer"
    >
      <slot name="footer" />
    </template>
    <template
      v-else-if="tabCount"
      slot="footer"
    >
      <Buttonx
        title="关闭"
        style="float: left"
        @on-click="onCancel"
      />
      <Buttonx
        v-if="showPrev"
        v-show="!submitting"
        title="上一步"
        @on-click="onPrev"
      />
      <Buttonx
        v-if="showNext"
        :disabled="waiting || (errorText? true: false)"
        title="下一步"
        type="primary"
        @on-click="onNext"
      />
      <Buttonx
        v-if="showSubmit"
        :disabled="waiting || (errorText? true: false)"
        :loading="submitting"
        :title="submitting ? '提交中' : okText"
        type="primary"
        @on-click="onOk"
      />
    </template>
    <template
      v-else
      slot="footer"
    >
      <Buttonx
        title="关闭"
        @on-click="onCancel"
      />
      <Buttonx
        :disabled="waiting || (errorText? true: false)"
        :loading="submitting"
        :title="submitting ? '提交中' : okText"
        type="primary"
        @on-click="onOk"
      />
    </template>

    <template
      v-if="$slots.close"
      slot="close"
    >
      <slot name="close" />
    </template>

    <template v-if="waiting">
      <div class="text-center">
        <span>{{ $t('message.requestLoading') }}</span>
      </div>
    </template>
    <template v-else-if="errorText">
      <div class="text-center red">
        <span>{{ errorText }}</span>
      </div>
    </template>
    <template v-else>
      <slot />
    </template>
  </Modal>
</template>

<script>
export default {
  name: 'Modalx',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    waiting: {
      type: Boolean,
      default: false
    },
    submitting: {
      type: Boolean,
      default: false
    },
    errorText: {
      type: String,
      default: undefined
    },
    closable: {
      type: Boolean,
      default: true
    },
    maskClosable: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: undefined
    },
    width: {
      type: [Number, String],
      default: 520
    },
    okText: {
      type: String,
      default: '确定'
    },
    tabCount: {
      type: Number,
      default: 0
    },
    tabIndex: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      options: {
        trigger: '.ivu-modal-header',
        body: '.ivu-modal',
        recover: true
      },
      defaultStyle: null
    }
  },
  computed: {
    showPrev () {
      return this.tabIndex > 0
    },
    showNext () {
      return this.tabIndex >= 0 && this.tabIndex < this.tabCount - 1
    },
    showSubmit () {
      return this.tabIndex === this.tabCount - 1
    }
  },
  mounted () {
    this.bindDragEvent()
  },
  methods: {
    onOk () {
      this.$emit('on-ok')
    },
    onCancel () {
      this.$emit('on-cancel')
      this.$emit('input', false)
    },
    onVisibleChange (state) {
      const modalDom = this.$el.querySelector('.ivu-modal')
      if (state && !this.defaultStyle) {
        this.defaultStyle = {
          position: modalDom.style.position,
          left: modalDom.style.left,
          top: modalDom.style.top
        }
      }
      this.$emit('input', state)
      this.$emit('on-visible-change', state)
    },
    onHidden () {
      const modalDom = this.$el.querySelector('.ivu-modal')
      modalDom.style.position = this.defaultStyle.position
      modalDom.style.left = this.defaultStyle.left
      modalDom.style.top = this.defaultStyle.top
      this.defaultStyle = null
    },
    onNext () {
      this.$emit('on-tab-change', this.tabIndex + 1)
    },
    onPrev () {
      this.$emit('on-tab-change', this.tabIndex - 1)
    },
    on (element, event, handler) {
      if (document.addEventListener) {
        element.addEventListener(event, handler)
      } else {
        element.attachEvent('on' + event, handler)
      }
    },
    bindDragEvent () {
      const triggerDom = this.$el.querySelector(this.options.trigger)
      triggerDom.style.cursor = 'move'
      const bodyDom = this.$el.querySelector(this.options.body)

      let canMove = false
      let clientX = 0
      let clientY = 0
      const initBodyInfo = {}
      const handleMousedown = (e) => {
        ({ clientX, clientY } = e)
        canMove = true
        if (!initBodyInfo.defaultTop) initBodyInfo.defaultTop = bodyDom.offsetTop
        if (!initBodyInfo.defaultLeft) initBodyInfo.defaultLeft = bodyDom.offsetLeft

        bodyDom.style.left = bodyDom.offsetLeft + 'px'
        bodyDom.style.top = bodyDom.offsetTop + 'px'
        bodyDom.style.position = 'absolute'
      }
      const handleMousemove = (e) => {
        if (!canMove) return
        if (canMove) {
          bodyDom.style.left = (initBodyInfo.defaultLeft + e.clientX - clientX) + 'px'
          bodyDom.style.top = (initBodyInfo.defaultTop + e.clientY - clientY) + 'px'
        }
      }
      const handleMouseup = () => {
        if (initBodyInfo.defaultTop) initBodyInfo.defaultTop = parseFloat(bodyDom.style.top.replace('px', ''))
        if (initBodyInfo.defaultLeft) initBodyInfo.defaultLeft = parseFloat(bodyDom.style.left.replace('px', ''))
        canMove = false
      }

      this.on(triggerDom, 'mousedown', handleMousedown)
      this.on(document, 'mousemove', handleMousemove)
      this.on(document, 'mouseup', handleMouseup)
    }
  }
}
</script>

<style scoped>
  * >>> table {
    width: 100%;
  }

  .text-center {
    text-align: center;
  }

  .red {
    color: red;
  }

  .modalx >>> .ivu-tabs {
    margin-top: -25px;
  }

  .modalx >>> .ivu-tabs .ivu-tabs-tabpane {
    padding-top: 15px;
  }
</style>
