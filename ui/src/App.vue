<template>
  <div id="app">
    <RouterView />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="less">
  .size {
    width: 100%;
    height: 100%;
  }

  html, body {
    .size;
    margin: 0;
    padding: 0;
    word-break: break-all;
    word-wrap: break-word;
  }

  #app {
    .size;
  }
</style>
