<template>
  <div class="select-input">
    <div
      class="my-input"
      @mouseover="mouseover"
      @mouseleave="mouseleave"
    >
      <i-input
        ref="input"
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
        @click.native="click"
        @keydown.down.native="onKeyDown"
        @keydown.up.native="onKeyUp"
        @keydown.enter.native="onKeyEnter"
      >
        <span
          v-if="unit"
          slot="append"
        >
          {{ unit }}
        </span>
      </i-input>
      <div
        v-if="!(clearable && isFocus && value)"
        class="select-icon"
        @click="()=>{!disabled?panelShow= !panelShow:undefined}"
      >
        <Icon
          style="vertical-align: top"
          :type="panelShow?'ios-arrow-up':'ios-arrow-down'"
        />
      </div>
    </div>
    <transition name="slide-fade">
      <div
        v-if="panelShow "
        class="select-panel"
        :style="getPanelClass"
      >
        <ul>
          <template v-if="selectOptions.length">
            <li
              v-for="(d,i) in selectOptions"
              :key="'item_' + i"
              :class="{active : selectIndex === i}"
              @click="setValue(d)"
            >
              {{ d }}
            </li>
          </template>
          <li
            v-else
            class="emptyText"
          >
            {{ emptyText }}
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  name: 'SelectInput',
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
      default: true
    },
    emptyText: {
      type: String,
      default: '暂无选项'
    },
    // options 为字符串数组 例：["admin","myself"]
    options: {
      type: Array,
      default: () => []
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
    },
    maxHeight: {
      type: [Number, String],
      default: undefined
    }
  },
  data () {
    return {
      panelShow: false,
      isFocus: false,
      selectIndex: -1,
      selectOptions: []
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
    },
    // 计算选项面板位置信息
    getPanelClass () {
      if (this.$refs.input.$el) {
        const el = this.$refs.input.$el
        const top = el.offsetHeight + el.offsetTop + 5 + 'px'
        const left = el.offsetLeft + 'px'
        const width = el.offsetWidth + 'px'
        const maxHeight = this.maxHeight ? this.maxHeight + 'px' : undefined
        const result = {
          width,
          left,
          top,
          maxHeight
        }
        return result
      }
      return {}
    }
  },
  watch: {
    options (val) {
      this.selectOptions = val
      this.selectIndex = -1
    },
    disabled (val) {
      if (val) {
        this.panelShow = false
      }
    },
    value () {
      if (this.isFocusInput()) {
        this.panelShow = true
      } else {
        this.panelShow = false
      }
      this.panelShow = this.disabled ? false : this.panelShow
      this.setSelectOptions(this.isFocusInput())
    },
    selectOptions (val) {
      if (!val.length) {
        this.panelShow = false
      }
    }
  },
  mounted () {
    this.selectOptions = this.options
  },
  methods: {
    // 上下选择选项
    onKeyDown () {
      this.selectIndex += this.selectIndex < this.selectOptions.length - 1 ? 1 : 0
    },
    onKeyUp () {
      this.selectIndex += this.selectIndex > 0 ? -1 : 0
    },
    onKeyEnter () {
      if (this.selectIndex >= 0) {
        const val = this.selectOptions[this.selectIndex]
        this.setValue(val)
        this.inputToFocus()
      }
    },
    // 鼠标焦点是否在输入框上
    mouseover () {
      this.isFocus = true
    },
    mouseleave () {
      this.isFocus = false
    },

    // 设置选择列表
    setSelectOptions () {
      let select = [].concat(this.options)
      if (this.value) {
        select = select.filter(item => item.indexOf(this.value) >= 0)
      }
      this.selectOptions = select
    },
    // 设置输入框值并向上抛出change事件
    setValue (val) {
      this.$refs.input.setCurrentValue(val)
      this.panelShow = false
      this.inputToFocus()

      this.$nextTick(() => {
        this.hidePanel()
      })
      this.$emit('input', val)
      this.$emit('on-change', val)
      if (this.$parent && typeof this.$parent.validate === 'function') {
        this.$parent.validate()
      }
    },
    onChange (event) {
      this.$emit('input', event.target.value)
      this.$emit('on-change', event.target.value)
      if (this.$parent && typeof this.$parent.validate === 'function') {
        this.$parent.validate()
      }
    },
    /* 焦点到输入框 */
    inputToFocus () {
      this.isFocus = true
      this.$refs.input.focus()
    },
    /* 隐藏选项面板 */
    hidePanel () {
      this.panelShow = false
      this.selectIndex = -1
    },
    onSearch (val) {
      this.$emit('on-search', val)
    },
    click (event) {
      this.$emit('on-click', event)
      this.panelShow = true
    },
    onFocus (event) {
      this.$emit('on-focus', event)
      this.panelShow = true
    },
    onBlur (event) {
      this.$emit('on-blur', event)
      this.hidePanel()
    },
    // 判断焦点是否在当前组件的输入框中
    isFocusInput () {
      const focus = document.activeElement
      const parent = this.$refs.input.$el
      const child = focus
      if (child && parent) {
        let { parentNode } = child
        while (parentNode) {
          if (parent === parentNode) {
            return true
          }
          parentNode = parentNode.parentNode ? parentNode.parentNode : undefined
        }
      }
      return false
    }
  }
}
</script>
<style lang="less" scoped>
  .select-input{
    position: relative;
    cursor: pointer;
    .my-input{
      z-index: 99;
    }
    .select-panel{
      max-height: 200px;
      overflow: auto;
      background: #fff;
      position: absolute;
      border-radius: 4px;
      box-sizing: border-box;
      box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
      z-index: 100;
      ul{
        margin: 0;
        padding: 5px 0;
        li{
          list-style: none;
          margin: 0;
          line-height: normal;
          padding: 7px 16px;
          clear: both;
          color: #111;
          font-size: 12px !important;
          white-space: nowrap;
          cursor: pointer;
          transition: background 0.2s ease-in-out;
          &.emptyText{
            padding: 2px 16px;
            font-size: 12px;
            color: #c5c8ce;;
          }
          &:hover{
            background: #dce0e6;
          }
          &.active{
          background: #dce0e6;;
          }
        }
      }
    }
    .select-icon{
      text-align: center;
      position: absolute;
      color: #6a6a6a;
      top: 0px;
      right: 12px;
      font-size: 16px;
      padding-top: 3px;
      vertical-align: top;
      z-index: 2;
    }
  }
  /* vue 动画 */
  .slide-fade-enter-active {
    transition: all .4s ease-in-out;
  }
  .slide-fade-leave-active {
    transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active for below version 2.1.8 */ {
    transform: translateY(-5px);
    opacity: 0;
  }

  .input-select/deep/.ivu-input{
    padding-right: 28px;
  }
</style>
