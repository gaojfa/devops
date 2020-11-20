<!--
  使用 v-model 时，值为数组，表示为：[开始时间, 结束时间]
-->
<template>
  <span>
    <div class="search">
      <span v-if="beginTitle">
        {{ beginTitle }}
      </span>

      <DatePickerx
        v-model="beginTime"
        :disabled="disabled"
        :editable="editable"
        :clearable="clearable"
        :confirm="confirm"
        :type="type"
        :format="format"
        :size="size"
        :transfer="transfer"
        :options="beginOptions"
        :placeholder="placeholder || beginPlaceholder"
        @on-search="search"
        @on-ok="onOk"
        @on-clear="onClear"
      />
    </div>

    <div class="search">
      <span v-if="endTitle">
        {{ endTitle }}
      </span>

      <DatePickerx
        v-model="endTime"
        :disabled="disabled"
        :editable="editable"
        :clearable="clearable"
        :confirm="confirm"
        :type="type"
        :format="format"
        :size="size"
        :transfer="transfer"
        :options="endOptions"
        :placeholder="placeholder || endPlaceholder"
        @on-search="search"
        @on-ok="onOk"
        @on-clear="onClear"
      />
    </div>
  </span>
</template>

<script>
export default {
  name: 'DateRangeSearchPickerx',
  props: {
    value: {
      type: Array,
      default: () => []
    },
    // DatePickerx配置项
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
      default: null
    },
    size: {
      type: String,
      default: undefined
    },
    transfer: {
      type: Boolean,
      default: undefined
    },
    // DateRangeSearchPickerx配置项
    beginPlaceholder: {
      type: String,
      default: '请选择开始时间'
    },
    endPlaceholder: {
      type: String,
      default: '请选择结束时间'
    },
    beginTitle: {
      type: String,
      default: '开始时间'
    },
    endTitle: {
      type: String,
      default: '至'
    }
  },
  data () {
    return {
      beginTime: undefined,
      endTime: undefined,
      beginOptions: {
        disabledDate: date => date.valueOf() > new Date().getTime()
      },
      endOptions: {
        disabledDate: date => date.valueOf() > new Date().getTime()
      }
    }
  },
  watch: {
    value (val) {
      [this.beginTime, this.endTime] = val
    },
    // 时间段选择处理
    endTime (val) {
      this.$emit('input', [this.beginTime, val])
      // 选择日期时,时分秒默认为00：00：00,同步一下
      if (this.beginTime && val && new Date(val).getTime() < new Date(this.beginTime).getTime()) {
        this.endTime = this.beginTime
      }
      this.beginOptions.disabledDate = (date) => {
        const isOverNowTime = date.valueOf() > new Date().getTime()

        if (val) {
          return (date.valueOf() >= new Date(val).getTime())
        }
        return isOverNowTime
      }
    },
    beginTime (val) {
      this.$emit('input', [val, this.endTime])
      this.endOptions.disabledDate = (date) => {
        const isOverNowTime = date.valueOf() > new Date().getTime()
        if (val) {
          if (this.endTime) {
            return (date.valueOf() < new Date(val).getTime()) || isOverNowTime
          }
          // 时分秒默认为00：00：00,加上23:59:59的毫秒数
          return ((date.valueOf() + 86399000) < new Date(val).getTime()) || isOverNowTime
        }
        return isOverNowTime
      }
    }
  },
  methods: {
    search () {
      this.$emit('set-search-time', [this.beginTime, this.endTime])
      this.$emit('on-search-time-change')
    },
    onOk () {
      this.$emit('on-ok')
    },
    onClear () {
      this.$emit('on-clear')
    }
  }
}
</script>

<style scoped>
  .search {
    display: block;
  }

  @media (min-width: 768px) {
    .search {
      display: inline-block;
    }
  }

  .search > span {
    margin: 0px 4px 0px 6px;
    font-size: 12px;
  }

  .search >>> .ivu-date-picker {
    width: 208px;
  }
</style>
