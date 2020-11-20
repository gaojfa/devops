<template>
  <Tablex
    ref="tablex"
    :data="myTableCfg.data"
    :columns="myTableCfg.columns"
    :loading="myTableCfg.loading"
    :no-data-text="myTableCfg.noDataText"
    :height="273"
    @on-selection-change="tableSelectionChange"
  />
</template>

<script>
export default {
  name: 'CheckboxTableInputx',
  props: {
    /**
     * 存放与distinctKey字段的值[ id1, id2, id3 ] distinctKey='id'
     * 建议存放id数组
     */
    value: {
      type: Array,
      default: () => ([])
    },
    tableCfg: {
      type: Object,
      default: () => this.$util.table.createCfg()
    },
    distinctKey: {
      type: String,
      default: 'id'
    },
    /**
     * 从apiMethod 的返回结果中抽出list数据并返回
     */
    dataExtratMethod: {
      type: Function,
      default: res => res.data.data.list || res.data.data
    }
  },
  data () {
    return {
      myTableCfg: this.$util.table.createCfg(),
      selection: []
    }
  },
  mounted () {
    this.refreshTable(this.tableCfg)
  },
  methods: {
    /**
     * 处理选中变化
     * @param selection
     */
    tableSelectionChange (selection) {
      this.selection = selection
      this.$emit('input', selection.map(d => d[this.distinctKey]))
      this.$emit('on-selection-change', selection)
    },
    refreshTable (metaTableCfg) {
      const vm = this
      // 处理没有提供selection的列column
      vm.myTableCfg = Object.assign({}, metaTableCfg)
      if (metaTableCfg.columns[0] && metaTableCfg.columns[0].type !== 'selection') {
        vm.myTableCfg.columns = [{ type: 'selection', align: 'center', width: 36 }].concat(metaTableCfg.columns)
      }

      // 重写tablecfg中的渲染方法
      const originalRenderMethod = metaTableCfg.renderMethod || (() => {})
      vm.myTableCfg.renderMethod = (res) => {
        originalRenderMethod(res)

        const list = vm.dataExtratMethod(res)

        vm.myTableCfg.data = list.map((d) => {
          if (vm.value.indexOf(d[vm.distinctKey]) !== -1) {
            vm.selection.push(d)
            // eslint-disable-next-line no-underscore-dangle
            d._checked = true
          }
          return d
        })
        vm.$emit('input', this.selection.map(d => d[this.distinctKey]))
      }

      vm.$util.table.search(vm.myTableCfg)
    }
  }
}
</script>
