<template>
  <div class="tablex">
    <Spinx :spinning="loading">
      <Table
        ref="table"
        :row-key="rowKey"
        :indent-size="indenSize"
        :data="data"
        :columns="columns"
        :loading="false"
        :no-data-text="noDataText"
        :stripe="stripe"
        :border="false"
        :style="minWidthStyle"
        :class="{'table-overflowx':overflowx}"
        :height="height"
        :load-data="loadData"
        @on-sort-change="onSortChange"
        @on-selection-change="onSelectionChange"
        @on-row-click="onRowClick"
      />
    </Spinx>
  </div>
</template>

<script>
export default {
  name: 'Tablex',
  props: {
    data: {
      type: Array,
      default: () => []
    },
    columns: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    },
    rowKey: {
      type: String,
      default: 'id'
    },
    indenSize: {
      type: Number,
      default: 10
    },
    noDataText: {
      type: String,
      default: undefined
    },
    stripe: {
      type: Boolean,
      default: false
    },
    border: {
      type: Boolean,
      default: true
    },
    columnMinWidth: {
      type: Number,
      default: 100
    },
    autoHeight: {
      type: Boolean,
      default: false
    },
    overflowx: {
      type: Boolean,
      default: false
    },
    height: {
      type: Number,
      default: null
    }
  },
  data () {
    return {
      minWidth: 0,
      autoHeightCounter: 0,
      intervalKey: undefined,
      highlightRows: new Set(),
      highlightCol: 0,
      tdStyleDomNode: document.createElement('style') // 用于控制高亮区遮挡块的高度
    }
  },
  computed: {
    listenstage () { return this.$store.state.app.activateTaskChange },
    minWidthStyle () {
      return 'min-width:' + this.minWidth + 'px'
    },
    tableRows () {
      if (!this.data && this.data.length < 1) return [] // 用于依赖响应式属性，清除缓存
      const tbody = this.$refs.table.$refs.body.getElementsByClassName('ivu-table-tbody')
      if (tbody.length === 0) return []
      return Array.from(tbody[0].children)
    }
  },
  watch: {
    // 监听是否有任务执行，如果有则调用search()
    listenstage () {
      if (typeof (this.$parent.$parent.$parent.$parent.search) === 'function') {
        this.$parent.$parent.$parent.$parent.search()
        return
      }
      if (typeof (this.$parent.$parent.$parent.search) === 'function') {
        this.$parent.$parent.$parent.search()
        return
      }
      if (typeof (this.$parent.$parent.search) === 'function') {
        this.$parent.$parent.search()
        return
      }
      if (typeof (this.$parent.$parent.$parent.$parent.$parent.search) === 'function') {
        this.$parent.$parent.$parent.$parent.$parent.search()
      }
    },
    columns () {
      this.autoMinWidth()
    },
    data () {
      this.$nextTick()
        .then(() => {
          this.autoMaxHeight(true)
        })
    }
  },
  updated () {
    this.highlightCurrent()
  },
  mounted () {
    this.intervalKey = setInterval(() => {
      this.autoHeightCounter = 0
    }, 500)

    this.autoMinWidth()
    this.autoMaxHeight(true)

    window.addEventListener('resize', this.autoMaxHeight)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.autoMaxHeight)

    if (this.intervalKey) {
      clearInterval(this.intervalKey)
    }
  },
  methods: {
    onSortChange (meta) {
      this.$emit('on-sort-change', meta)
    },
    loadData (item, callback) {
      this.$emit('load-data', item, callback)
    },
    onSelectionChange (selection) {
      this.$emit('on-selection-change', selection)
    },
    onRowClick (data, index) {
      this.$emit('on-row-click', data, index)
    },
    autoMinWidth () {
      /*
      let minWidth = 0
      if ((this.columns || []).length > 0) {
        for (let i = 0; i < this.columns.length; i++) {
          minWidth += (this.columns[i].width || this.columnMinWidth)
        }
      }
      this.minWidth = minWidth
      */
    },
    autoMaxHeight () {
    },
    // autoMaxHeight (force = false) {
    //   if (!this.autoHeight) {
    //     return
    //   }

    //   if (this.autoHeightCounter !== 0 && !force) {
    //     return
    //   }

    //   this.autoHeightCounter++

    //   let actualTop = this.$el.offsetTop
    //   let current = this.$el.offsetParent

    //   while (current !== null) {
    //     actualTop += current.offsetTop
    //     current = current.offsetParent
    //   }

    //   if (actualTop !== 0) {
    //     this.$el.parentElement.style.height = 'auto'
    //     const pagingHeight = (this.$el.parentElement.clientHeight - this.$el.clientHeight) || 0
    //     const maxHeight = (document.documentElement.clientHeight || document.body.clientHeight) - actualTop - 48 - pagingHeight
    //     this.$el.getElementsByClassName('ivu-table-body')[0].style['max-height'] = maxHeight + 'px'
    //     this.$el.parentElement.style.height = (document.documentElement.clientHeight || document.body.clientHeight) - actualTop - 7 + 'px'
    //   }
    // },
    exportCsv () {
      const params = {
        columns: this.columns,
        data: this.data
      }

      this.$refs.table.exportCsv(params)
    },
    highlightByParams (params, parallel = false) {
      let colNum = -1
      this.columns.forEach((el, index) => {
        if (el.key === params.column.key && colNum === -1) colNum = index
      })
      this.highlight(params.index, colNum, parallel)
    },
    highlight (rowNum, colNum, parallel = false) {
      if (this.highlightRows.size === 0) {
        setTimeout(() => {
          if (!parallel) this.disHighlightAll()
          this.highlightRows.add(rowNum)
          this.highlightCol = colNum
          this.highlightCurrent()
        }, 300)
      } else {
        if (!parallel) this.disHighlightAll()
        this.highlightRows.add(rowNum)
        this.highlightCol = colNum
        this.highlightCurrent()
      }
    },
    highlightCurrent () {
      this.tableRows.forEach((row, index) => { // 高亮所有选中
        if (this.highlightRows.has(index)) {
          const tds = Array.from(row.children)
            .filter(el => el.localName === 'td')
          tds.forEach((el, i) => {
            // 向【高亮单元格】之前的单元格叠加阴影
            if (i < this.highlightCol && !el.className.includes('before-float')) el.className += ' before-float'
            //
            if (i === this.highlightCol && !el.className.includes('float')) el.className += ' float'
          })

          row.setAttribute('highlighted', 'true')

          // 控制遮挡块高度-------
          this.tdStyleDomNode.innerText = `td.float:after{height:${tds[this.highlightCol].offsetHeight - 1}px!important; }`
          row.insertBefore(this.tdStyleDomNode, tds[index])
          // ----------------
        } else {
          row.setAttribute('highlighted', 'false')
        }
      })
    },
    disHighlightAll () {
      this.highlightRows.clear()
      this.tableRows.forEach((row) => {
        row.setAttribute('highlighted', 'false')
        const tds = Array.from(row.children)
          .filter(el => el.localName === 'td')
        tds.forEach((td) => {
          td.className = td.className.split(' ')
            .filter(className => className !== 'before-float' && className !== 'float')
            .join(' ')
        })
      })
    }
  }
}
</script>
<style lang="less" scoped>
    .tablex {
        overflow: hidden;
        width: 100%;

        .ivu-table-wrapper {
            border-color: #dbe4ec;
        }

        /deep/ .ivu-table {
            color: #3d3d3d;
            &:before {
              background: none;
            }
            &:after {
              background-color: #dbe4ec;
            }
        }

        .table-overflowx /deep/ .ivu-table-body {
            overflow-x: auto;
        }

        /deep/ .ivu-table-body {
            overflow-x: hidden;
            overflow-y: auto;

            .ivu-table-row {
                position: relative;
            }
        }

        /deep/ .ivu-table th {
            background: #f0f6fe;
            color: #333;
            height: 48px;
            font-size: 12px;
            border-bottom-color: #dbe4ec;
        }

        /deep/ .ivu-table-row[highlighted=true] {
            &:after {
                content: '';
                height: 5px;
                position: absolute;
                width: 100%;
                left: 0;
                background: linear-gradient(0deg, rgba(204, 204, 204, 0.5), rgba(255, 255, 255, 0));
                transform: translateY(-6px);
            }

            td.float {
                position: relative;
                border-color: #dfdfdf;
                background: white;

                .ivu-table-cell {
                    a:nth-child(1), span a:nth-child(1) {
                        margin-left: 7px;
                        transition: transform 200ms ease-in-out;
                        transform: translateX(8px);
                    }

                    &:before {
                        content: '\F3A0';
                        font-size: 20px;
                        color: #3366cc;
                        display: inline;
                        font-family: "Ionicons";
                        vertical-align: middle;
                        line-height: 1;
                        margin-left: -12px;
                        margin-right: 10px;
                        position: absolute;
                    }
                }

                &:before {
                    content: '';
                    height: 5px;
                    position: absolute;
                    width: 100%;
                    left: 0;
                    bottom: -6px;
                    background: linear-gradient(0deg, rgba(255, 255, 255, 0), rgba(204, 204, 204, 0.5));
                    z-index: 99;
                }

                &:after {
                    content: '';
                    height: 57px;
                    /*-----10+2px 浏览器兼容问题 -------*/
                    width: 12px;
                    right: -2px;
                    /*-----------*/
                    top: 0px;
                    background: white;
                    // z-index: 9990;
                    position: absolute;
                }
            }

            td.before-float {
                &:after {
                    content: '';
                    height: 5px;
                    position: absolute;
                    width: 100%;
                    left: 0;
                    bottom: -6px;
                    background: linear-gradient(0deg, rgba(255, 255, 255, 0), rgba(204, 204, 204, 0.5));
                    z-index: 99
                }
            }

            td {
                transition: background-color 0ms;
                position: relative;
                background: white;
            }
        }

        /deep/ .ivu-table td {
            height: 48px;
            font-size: 14px;
            border-bottom-color: #dbe4ec;
        }

        /deep/ tr.ivu-table-row-hover td  {
            // background: #e7f0f8;
            background: #e2e9f5;
        }
    }
</style>
