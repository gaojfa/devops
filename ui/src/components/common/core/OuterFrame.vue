<template>
  <div
    class="outer-frame"
  >
    <div class="frame-top">
      <slot name="top" />
      <slot name="overviewMenu" />
    </div>
    <div class="frame-sidebar">
      <slot name="menu" />
    </div>
    <div class="frame-body">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'OuterFrame'
}
</script>

<style lang="less" scoped>
    .outer-frame {
        height: 100%;
        width: 100%;
        position: relative;

        .frame-top {
            position: fixed;
            left: 0px;
            top: 0px;
            width: 100%;
            z-index: 4;
        }

        .frame-body {
            width: 100%;
            height: 100vh!important;
            overflow: auto;
            z-index: 3;
            padding: 50px 0 0 46px;
        }

        .frame-sidebar {
          position: fixed;
          top: 50px;
          left: 0;
          z-index: 3;
          &::before{
            content: '';
            display: inline-block;
            width: 46px;
            height: 100vh!important;
            background: #f7f9fa;
            border-right: 1px solid #eef0f0;
          }
        }
    }
</style>
