<template>
  <div class="frame-body">
    <div
      v-show="!collapsed"
      class="frame-body-left-wrap"
      :style="{ width: presentLeftWidth + 'px' }"
    >
      <div
        v-if="$slots.left"
        :style="{width: calcLeftWidth + 'px'}"
        class="frame-body-left"
      >
        <div
          v-if="showLeftSlider"
          ref="slider"
          class="slider"
          :style="{left: presentLeftWidth+'px'}"
          @mousedown="handleTriggerMousedown"
        >
          <div class="slider-move-trigger">
            <div class="slider-move-trigger-point">
              <i /><i /><i /><i /><i />
            </div>
          </div>
        </div>
        {{ renderSlot( $slots.left ) }}
        <slot name="cellRender" />
      </div>
    </div>
    <div
      class="frame-body-right"
      :style="{marginLeft: frameRightLeft, width: frameRightWidth}"
    >
      <Card
        class="frame-body-right-card"
        :dis-hover="true"
      >
        <template v-if="$slots.title">
          <p slot="title">
            <Icon
              v-if="$slots.left"
              :type="collapsed ? 'ios-arrow-dropright' : 'ios-arrow-dropleft'"
              size="24"
              class="collapsed-btn"
              @click="onCollapse"
            />
            <slot name="title" />
          </p>
        </template>

        <template v-if="$slots.desc">
          <p class="desc">
            <slot name="desc" />
          </p>
        </template>

        <slot />
      </Card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FrameBody',
  props: {
    leftWidth: {
      type: Number,
      default: 150
    },
    showLeftSlider: {
      type: Boolean,
      default: false
    },
    maxSilderExtraWidth: {
      type: Number,
      default: 250
    }
  },
  data () {
    return {
      canMove: false,
      collapsed: false,
      extraleftWidth: 0
    }
  },
  computed: {
    presentLeftWidth () {
      return this.leftWidth + this.extraleftWidth
    },
    calcLeftWidth () {
      return this.presentLeftWidth + 17
    },
    frameRightLeft () {
      return !this.collapsed && this.$slots.left ? this.presentLeftWidth + 'px' : '0px'
    },
    frameRightWidth () {
      return !this.collapsed && this.$slots.left ? 'calc(100% - ' + this.presentLeftWidth + 'px)' : '100%'
    }
  },
  mounted () {
    document.addEventListener('mouseup', e => this.handleMouseup(e))
    document.addEventListener('mousemove', e => this.handleMousemove(e))
  },
  beforeDestroy () {
    document.removeEventListener('mouseup', e => this.handleMouseup(e))
    document.removeEventListener('mousemove', e => this.handleMousemove(e))
  },
  methods: {
    renderSlot (cell) {
      // 设置left的宽度
      if (this.showLeftSlider && cell[0].elm)cell[0].elm.style.width = this.presentLeftWidth + 'px'
      this.$slots.cellRender = cell
    },
    onCollapse () {
      this.collapsed = !this.collapsed
    },
    // 左侧菜单宽度为150px,因此在此基础上加减150
    handleMousemove (event) {
      if (!this.canMove) return
      const nextLeftWidth = (event.movementX + this.presentLeftWidth)
      // 最小宽度限制
      if (nextLeftWidth < this.leftWidth) {
        return
        // 最大宽度限制
      } if (nextLeftWidth > (this.leftWidth + this.maxSilderExtraWidth)) {
        return
      }
      // 动态调整拖拽控件位置
      this.$refs.slider.style.left = nextLeftWidth + 'px'
      this.$emit('left-width-change', nextLeftWidth)
      this.extraleftWidth += event.movementX
    },
    handleMouseup () {
      this.canMove = false
    },
    handleTriggerMousedown () {
      this.canMove = true
      // 防止鼠标选中文字，造成拖动trigger触发浏览器原生拖动行为
      window.getSelection().removeAllRanges()
    }
  }
}
</script>

<style lang="less" scoped>
  .frame-body {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;

    .frame-body-left-wrap {
      height: 100%;
      overflow: hidden;
      position: relative;
    }

    .frame-body-left {
      position: absolute;
      left: 0px;
      top: 0px;
      height: 100%;
      overflow-x: hidden;
      overflow-y: auto;
      z-index: 2;
    }

    .frame-body-right {
      position: absolute;
      height: 100%;
      overflow-x: hidden;
      overflow-y: auto;
      z-index: 1;
      top: 0;
    }
    .frame-body-right-card {
     /deep/ .ivu-card-head{
        padding: 24px 34px 16px;
      }
      /deep/ .ivu-card-body{
        padding: 30px 34px;
      }
    }

    .collapsed-btn {
      cursor: pointer;
      float: left;
      font-size: 16px !important;
      // margin-right: 6px;
      // margin-top: 2px;
    }

    .ivu-card-bordered {
      /* background: url("../../../../../assets/default/common/main-bg.jpg") 90% -3% no-repeat; */
      border: none;
      border-radius: 5px;
    }

    .desc {
      margin: 5px 0px 20px 0px;
      color: #515a6e;
      font-size: 12px;
    }

    .slider{
      position: absolute;
      width: 0;
      height: 100%;

      .slider-move-trigger{
        position: fixed;
        top: 50%;
        width: 10px;
        height: 100px;
        line-height: 100px;
        background: #f3f3f3;
        transform: translate(5%,-50%);
        border-radius: 0px 16px 16px 0px;
        box-shadow: 0 0 1px 1px rgba(0,0,0,.2);
        cursor: col-resize;

        .slider-move-trigger-point{
          display: inline-block;
          width: 50%;
          transform: translateX(50%);

          i {
            display: block;
            border-bottom: 1px solid silver;
            padding-bottom: 2px;
          }
        }
      }
    }
  }
</style>
<style scoped>
  .frame-body >>> .ivu-card-bordered:first-child {
    border-bottom: 0px;
    /* min-height: 645px; */
    height: 100%;
  }

  .frame-body >>> .ivu-card-body {
    padding-bottom: 0px;
    height: calc(100% - 59px);
  }

</style>
<style lang="less" scoped>
  .frame-body-right{
    /deep/ .ivu-card-head>p {
        color: #515a6e;
        height: 16px;
        line-height: 16px;
        text-indent: 4px;
        border-left: 3px solid #2d8cf0;
    }
    /deep/ .ivu-card-head>p>p{
        height: 16px;
        line-height: 16px;
    }
  }
</style>
