<template>
  <div
    class="inner-frame"
    :class="$colorTheme"
  >
    <div
      v-show="!collapsed"
      class="frame-left-wrap"
      :style="{ width: leftWidth + 'px' }"
    >
      <div
        class="frame-left"
      >
        <slot name="left" />
      </div>
    </div>
    <div
      class="frame-right"
      :style="{marginLeft: frameRightLeft, width: frameRightWidth}"
    >
      <Breadcrumb
        v-if="curBreadcrumb && curBreadcrumb.length"
        class="breadcrumb"
      >
        <BreadcrumbItem
          v-for="(d, i) in curBreadcrumb"
          :key="i"
        >
          {{ d }}
        </BreadcrumbItem>
      </Breadcrumb>

      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'InnerFrame',
  props: {
    leftWidth: {
      type: Number,
      default: 184
    },
    breadcrumbs: {
      type: Object,
      default: () => ({})
    },
    showCollapsed: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      collapsed: false
    }
  },
  computed: {
    curBreadcrumb () {
      return this.breadcrumbs[this.$route.name] || []
    },
    calcLeftWidth () {
      return this.leftWidth + 17
    },
    frameRightLeft () {
      return (!this.collapsed) ? this.leftWidth + 'px' : '0px'
    },
    frameRightWidth () {
      return (!this.collapsed) ? 'calc(100% - ' + this.leftWidth + 'px)' : '100%'
    }
  },
  methods: {
    onCollapse () {
      this.collapsed = !this.collapsed
    }
  }
}
</script>

<style lang="less" scoped>
  @import "../css/main";
  .skyblue{
    .frame-left {
      background-color: @skyblue-left-color;
    }
  }
  .dark{
    .frame-left {
      background-color: @dark-left-color;
    }
  }

  .wathet{
      .frame-left {
          background-color: @wathet-left-color;
      }
  }

  .inner-frame {
    position: relative;
    height: 100%;
    width: 100%;
    overflow: hidden;

    .frame-left-wrap {
      height: 100%;
      overflow: hidden;
      position: relative;
    }

    .frame-left {
      position: absolute;
      left: 0px;
      top: 0px;
      height: 100%;
      overflow-x: hidden;
      overflow-y: auto;
      z-index: 2;
    }

    .frame-right {
      // background-color: white;
      background-color: #e4e9ee;
      padding: 20px;
      position: absolute;
      height: 100%;
      /*overflow-x: hidden;
      overflow-y: auto;*/
      z-index: 1;
      top: 0;

      & > * {
        display: inline-block;
      }

      .menu-btn {
        cursor: pointer;
        color: #666;
        margin: 0px 4px;
      }

      .breadcrumb {
        margin: 0px 0px 10px 4px;
      }
    }
    .frame-rancher {
      padding: 0;
    }
  }
</style>
