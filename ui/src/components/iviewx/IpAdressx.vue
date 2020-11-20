<!--
  Author：wubw@g-cloud.com.cn
  ip输入组件，支持Iview FormItem 规则校验
-->
<template>
  <div :class="wrapClasses">
    <Tooltip
      :disabled="!segmentTips[0]"
      placement="top"
    >
      <input
        ref="segment1"
        v-model="ip4.segment1"
        class="ip4-segment"
        :class="inputClasses"
        :maxlength="3"
        :disabled="getDisabledStatus(0)"
        @input="(value) => ip4.segment1=strictInputToNumber(value, $refs.segment2)"
        @keyup="(event) => judeSwitch(event, $refs.segment1, $refs.segment2)"
        @keypress="handleKeypress"
        @focus="handleFocus"
        @blur="handleBlur"
      >
      <div
        slot="content"
        class="input-tip"
      >
        {{ segmentTips[0] }}
      </div>
    </Tooltip>
    <div class="divider">
      <div class="dot-divider" />
    </div>
    <Tooltip
      :disabled="!segmentTips[1]"
      placement="top"
    >
      <input
        ref="segment2"
        v-model="ip4.segment2"
        class="ip4-segment"
        :class="inputClasses"
        :maxlength="3"
        :disabled="getDisabledStatus(1)"
        @input="(value) => ip4.segment2=strictInputToNumber(value, $refs.segment3)"
        @keyup="(event) => judeSwitch(event, $refs.segment2,$refs.segment3)"
        @keypress="handleKeypress"
        @focus="handleFocus"
        @blur="handleBlur"
      >
      <div
        slot="content"
        class="input-tip"
      >
        {{ segmentTips[1] }}
      </div>
    </Tooltip>
    <div class="divider">
      <div class="dot-divider" />
    </div>
    <Tooltip
      :disabled="!segmentTips[2]"
      placement="top"
    >
      <input
        ref="segment3"
        v-model="ip4.segment3"
        class="ip4-segment"
        :class="inputClasses"
        :maxlength="3"
        :disabled="getDisabledStatus(2)"
        @input="(value) => ip4.segment3=strictInputToNumber(value, $refs.segment4)"
        @keyup="(event) => judeSwitch(event, $refs.segment3, $refs.segment4)"
        @keypress="handleKeypress"
        @focus="handleFocus"
        @blur="handleBlur"
      >
      <div
        slot="content"
        class="input-tip"
      >
        {{ segmentTips[2] }}
      </div>
    </tooltip>
    <div class="divider">
      <div class="dot-divider" />
    </div>
    <Tooltip
      :disabled="!segmentTips[3]"
      placement="top"
    >
      <input
        ref="segment4"
        v-model="ip4.segment4"
        class="ip4-segment"
        :maxlength="3"
        :class="inputClasses"
        :disabled="getDisabledStatus(3)"
        @input="(value) => ip4.segment4=strictInputToNumber(value, $refs.mask)"
        @keyup="(event) => judeSwitch(event, $refs.segment4, $refs.mask)"
        @keypress="handleKeypress"
        @focus="handleFocus"
        @blur="handleBlur"
      >
      <div
        slot="content"
        class="input-tip"
      >
        {{ segmentTips[3] }}
      </div>
    </Tooltip>
    <template v-if="showMask">
      <div class="divider">
        <div class="slash-divider" />
      </div>
      <Selectx
        v-if="parentCidr"
        ref="mask"
        v-model="ip4.mask"
        class="ip4-mask"
        :disabled="disabled"
        :transfer="true"
        :clearable="false"
        @on-change="handleMaskChange"
      >
        <Option
          v-for="d in getMaskRange"
          :key="d"
          :value="d"
          :label="d"
        />
      </Selectx>
      <input
        v-else
        ref="mask"
        v-model="ip4.mask"
        class="ip4-segment"
        :class="inputClasses"
        :maxlength="2"
        :disabled="disabled"
        @input="(value) => ip4.mask=strictInputToNumber(value)"
        @keypress="handleKeypress"
        @focus="handleFocus"
        @blur="handleBlur"
      >
    </template>
  </div>
</template>

<script>

const prefixCls = 'ivu-input'

export default {
  name: 'IpAdressx',
  props: {
    value: {
      type: String,
      default: ''
    },
    showMask: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    parentCidr: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      ip4: {
        segment1: '',
        segment2: '',
        segment3: '',
        segment4: '',
        mask: ''
      },
      disabledSeg: [false, false, false, false],
      segmentTips: ['', '', '', '']
    }
  },
  computed: {
    wrapClasses () {
      return [
        `${prefixCls}-wrapper`,
        {
          [`${prefixCls}-wrapper-${this.size}`]: !!this.size,
          [`${prefixCls}-type`]: this.type,
          [`${prefixCls}-group`]: this.prepend || this.append || (this.search && this.enterButton),
          [`${prefixCls}-group-${this.size}`]: (this.prepend || this.append || (this.search && this.enterButton)) && !!this.size,
          [`${prefixCls}-group-with-prepend`]: this.prepend,
          [`${prefixCls}-group-with-append`]: this.append || (this.search && this.enterButton),
          [`${prefixCls}-hide-icon`]: this.append, // #554
          [`${prefixCls}-with-search`]: (this.search && this.enterButton)
        }
      ]
    },
    inputClasses () {
      return [
        `${prefixCls}`,
        {
          [`${prefixCls}-${this.size}`]: !!this.size,
          [`${prefixCls}-disabled`]: this.disabled,
          [`${prefixCls}-with-prefix`]: this.showPrefix,
          [`${prefixCls}-with-suffix`]: this.showSuffix || (this.search && this.enterButton === false)
        }
      ]
    },
    /**
     * 设置了父级cidr之后，设置的子网ip受制于父级掩码
     * 掩码最小值为父级 掩码+1
     */
    minimumMaskDigit () {
      return this.parentCidr ? parseInt(this.parentCidr.split('/')[1], 10) + 1 : null
    },
    parentMaskDigit () {
      return this.parentCidr ? parseInt(this.parentCidr.split('/')[1], 10) : null
    },
    parentIpSegments () {
      return this.parentCidr ? this.parentCidr.split('/')[0].split('.') : null
    },
    getMaskRange () {
      const start = this.minimumMaskDigit || 8
      const end = 29
      const length = end - start + 1
      return Array.from({ length }, (item, index) => (index + start) + '')
    }
  },
  mounted () {
    this.setValue(this.value)
    if (this.parentCidr) {
      if (!this.value) {
        this.setValue(this.parentCidr)
        this.updateValue()
      }
      // 默认掩码位+1，防止跟vpc一样导致都为disabled
      this.ip4.mask = (parseInt(this.ip4.mask, 10) + 1) + ''
      this.handleMaskChange(this.ip4.mask)
    }
  },

  methods: {
    getDisabledStatus (seg) {
      if (this.disabled) {
        return true
      }
      if (this.parentCidr) {
        return this.disabledSeg[seg]
      }
      return false
    },
    /**
     * 限制只能输入数字
     */
    strictInputToNumber (event, nextSegmentRef) {
      const { value, maxLength } = event.target
      let jump = false
      let strictedVal = value

      if (!RegExp('^[0-9]+$').test(value)) {
        strictedVal = value.replace(/[^0-9]/ig, '')
        this.$nextTick(() => { event.target.value = strictedVal })
      }
      if (strictedVal.length >= maxLength) {
        jump = !!nextSegmentRef // 转换成boolean值,避免空异常
      }

      if (jump) {
        nextSegmentRef.focus()
        nextSegmentRef.select()
      }
      this.updateValue()
      return strictedVal
    },
    /**
     * 判断是否需要切换下一个输入框
     */
    judeSwitch (keyEvent, segmentRef, nextSegmentRef) {
      const { code } = keyEvent
      let jump = false
      if (code === 'NumpadDecimal' || code === 'Period') jump = true
      if (nextSegmentRef && segmentRef && segmentRef.value && jump) {
        nextSegmentRef.focus()
        nextSegmentRef.select()
      }
      this.$emit('on-keyup', keyEvent)
    },
    /**
     * 抛出输入事件更新绑定的value
     */
    updateValue () {
      let result = `${this.ip4.segment1}`
      if (this.ip4.segment2) {
        result += `.${this.ip4.segment2}`
        if (this.ip4.segment3) {
          result += `.${this.ip4.segment3}`
          if (this.ip4.segment4) {
            result += `.${this.ip4.segment4}`
            if (this.showMask) result += `/${this.ip4.mask}`
          }
        }
      }
      this.$emit('input', result)
      this.$emit('on-change', result)
      if (this.$parent && typeof this.$parent.validate === 'function') {
        this.$parent.validate()
      }
    },
    /**
     * 接受ip值填入框中
     */
    setValue (val) {
      if (val) {
        if (this.showMask) {
          // 显示网络号
          const array = val.split('/')
          if (array.length === 0) {
            [this.ip4.segment1, this.ip4.segment2, this.ip4.segment3, this.ip4.segment4] = ['', '', '', '', '']
          } else {
            const ipSegs = array[0].split('.');
            [this.ip4.segment1, this.ip4.segment2, this.ip4.segment3, this.ip4.segment4] = ipSegs
            if (array.length === 2) {
              [array[0], this.ip4.mask] = array
            }
          }
        } else {
          const array = val.split('/')[0].split('.')
          if (array.length === 0) {
            [this.ip4.segment1, this.ip4.segment2, this.ip4.segment3, this.ip4.segment4] = ['', '', '', '', '']
          } else {
            [this.ip4.segment1, this.ip4.segment2, this.ip4.segment3, this.ip4.segment4] = array
          }
        }
      }
    },
    handleKeypress (event) {
      this.$emit('on-keypress', event)
    },
    handleFocus (event) {
      this.$emit('on-focus', event)
    },
    handleBlur (event) {
      this.$emit('on-blur', event)
      if (this.$parent && typeof this.$parent.validate === 'function') {
        this.$parent.validate()
      }
    },
    /**
     * 获取可修改的ip段，disabled不可编辑的ip输入段
     * 1、获取vpc的掩码位，判断（除8）前面几位是不可编辑的
     * 2、根据子网选择的掩码位判断第几位可编辑
     * @param maskVal 掩码位
     */
    handleMaskChange (maskVal) {
      if (this.minimumMaskDigit) {
        const markParent = parseInt(this.minimumMaskDigit / 8, 10) - 1
        const markSubnet = (maskVal % 8 === 0 ? maskVal / 8 : maskVal / 8 + 1) - 1
        // 若父级掩码不能整除8
        // 开放该Segment的输入
        let availableSegment = -1
        if (maskVal > this.parentMaskDigit && this.parentMaskDigit % 8 > 0) { availableSegment = parseInt(this.parentMaskDigit / 8 + (this.parentMaskDigit % 8 > 0 ? 1 : 0), 10) - 1 }
        this.disabledSeg = [true, true, true, true].map((d, i) => i !== availableSegment && !(i > markParent && i <= markSubnet))
        this.updateTooltip(maskVal)
      }
      this.updateValue()
    },
    updateTooltip (maskVal) {
      const vm = this
      if (this.parentCidr) {
        let availableSegment = -1
        if (maskVal > this.parentMaskDigit && this.parentMaskDigit % 8 > 0) { availableSegment = parseInt(this.parentMaskDigit / 8 + (this.parentMaskDigit % 8 > 0 ? 1 : 0), 10) - 1 }
        const segmentMasks = Array.from({ length: 4 },
          (item, i) => {
            const res = maskVal - (8 * i)
            if (res >= 8) return 8
            if (res > 0 && res < 8) return res
            return 0
          })
        this.disabledSeg.forEach((isSegmentDisabled, index) => {
          const currSegMask = segmentMasks[index]
          /**
           * 计算取值范围，当父级掩码不能被8整除
           * 该ip段取值需要基于父级ip限制范围
           */
          if (!isSegmentDisabled) {
            // 符合规则的二进制数
            let regexp = RegExp(`[0-1]{${currSegMask}}0{${8 - currSegMask}}`)
            if (availableSegment === index) {
              const segmentBinary = vm.pad(parseInt(vm.parentIpSegments[index], 10).toString(2), 8)
              const parentSegMask = Array.from({ length: 4 },
                (item, i) => {
                  const res = vm.parentMaskDigit - (8 * i)
                  if (res >= 8) return 8
                  if (res > 0 && res < 8) return res
                  return 0
                })[index]
              regexp = RegExp(`${segmentBinary.substr(0, parentSegMask)}[0-1]{${currSegMask - parentSegMask}}[0]{${8 - currSegMask}}`)
            }

            const availableInputs = Array.from({ length: 256 }, (item, i) => i)
              .filter(item => regexp.test(vm.pad(parseInt(item, 10).toString(2), 8)))
            if (availableInputs.length === 256) vm.segmentTips[index] = '可输入0-255'
            else vm.segmentTips[index] = `可输入${availableInputs}`
          } else {
            vm.segmentTips[index] = ''
          }
        })
      } else {
        this.segmentTips.map(() => '')
      }
    },
    /**
     * iview formitem组件查找父级组件的方法
     * @param componentName
     * @param eventName
     * @param params
     */
    dispatch (componentName, eventName, params) {
      let parent = this.$parent || this.$root
      let { name } = parent.$options

      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent

        if (parent) {
          ({ name } = parent.$options)
        }
      }
      if (parent) {
        parent.$emit(eventName, params)
      }
    },
    pad (num, n, padSign = 0) {
      return (Array(n).join(padSign) + num).slice(-n)
    }
  }
}
</script>

<style lang="less" scoped>
  @divider-color: #aaa;

  .input-tip{
    white-space: normal;
  }

  .ip4-segment, .ip4-mask{
    display: inline-block;
    width: 44px;
    height: 30px;
    text-align: center;

    &[disabled] {
      color: #666;
    }
  }
  .ip4-mask{
    width: 65px;
  }
  .divider {
    display: inline-block;
    position: relative;
    width: 10px;
    vertical-align: middle;
    line-height: normal;
    height: 30px;
    margin: 0 1px;
    .dot-divider{
      width: 3px;
      height: 3px;
      border-radius: 50%;
      background-color: @divider-color;
      position: absolute;
      bottom: 5px;
      left: 0;
      right: 0;
      margin: 0 auto;
    }
    .slash-divider{
      position: absolute;
      left: 0;
      right: 0;
      top: 50%;
      margin:0 auto;
      width: 100%;
      box-sizing: border-box;
      border-bottom: 1px solid @divider-color;
      transform-origin: bottom center;
      transform: rotateZ(-75deg) scale(1.5);
    }
  }
</style>
