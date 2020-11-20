<!--

value : [
  {
    header1:header1-value
    header2:header2-value
    header3:header3-value
    ...
  },
  {
    header1:header1-value
    header2:header2-value
    header3:header3-value
    ...
  }
  ...
]
-->
<template>
  <div>
    <table class="dynamic-input-table ">
      <tr class="dynamic-input-table-head">
        <th
          v-for="(head, index) in heads"
          :key="`head_${head}_${index}`"
          :style="{width:colWidth}"
        >
          {{ headNames[index] || head }}
        </th>
        <th>
          <Button
            type="primary"
            :shape="'circle'"
            icon="md-add"
            @click="appendTableRow"
          />
        </th>
      </tr>
      <tbody>
        <tr
          v-for="(row, rowIndex) in value"
          :key="`row_${rowIndex}`"
        >
          <td
            v-for="(col, colIndex) in heads"
            :key="`col_${col}_${colIndex}`"
            :style="{width:colWidth}"
          >
            <Inputx
              v-model="row[col]"
              style="padding:10px 0;"
              @on-change="updateValue"
            />
          </td>
          <td>
            <Button
              type="primary"
              style="margin-top:-6px;"
              :shape="'circle'"
              icon="md-trash"
              @click="deleteTableRow(rowIndex)"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  name: 'DynamicTableInputx',
  props: {
    value: {
      type: Array,
      default: () => ([])
    },
    heads: {
      type: Array,
      default: () => ([])
    },
    headNames: {
      type: Array,
      default: () => ([])
    }
  },
  data () {
    return {
      rows: 0
    }
  },
  computed: {
    colWidth () {
      if (this.heads.length > 0) {
        return `${90 / this.heads.length}%`
      }
      return '90%'
    }
  },
  methods: {
    renderSlot (cell) {
      // 通过 slot 缓存起 vnode 结构
      this.$slots.cellRender = cell
    },
    appendTableRow () {
      const headObj = {}
      this.heads.forEach((head) => {
        headObj[head] = undefined
      })
      this.value.push(headObj)
    },
    deleteTableRow (index) {
      if (!index && index !== 0) index = this.value.length - 1
      this.value.splice(index, 1)
    },
    updateValue () {
      this.$emit('input', this.value)
      this.$emit('on-change', this.value)
    }
  }
}
</script>
<style lang="less" scoped>
  .dynamic-input-table{
    text-align: left;
    border: 1px solid #dfdfdf;
    border-collapse: collapse;
    th,td{
      padding: 5px 10px;
    }
  }
  .dynamic-input-table-head{
    background-color: #eee;
    border-bottom: navajowhite;
    padding: 5px 0;
  }
  .dynamic-input-table-body{
    border-top: navajowhite;
  }
</style>
