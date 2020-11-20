<template>
  <div :class="$colorTheme">
    <div class="topic-wrapper">
      <div class="topic topic-bg">
        <slot name="trigger" />
        <Logo class="logo" />
        <div class="entrance">
          <slot name="entrance" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from './Logo.vue'

export default {
  name: 'Topic',
  components: { Logo },
  props: {},
  data () {
    return {}
  },
  watch: {
    // $route (val) {
    //   if (val.name.indexOf(this.currentMenu) !== 0) {
    //     this.routerIdentify(val.path)
    //   }
    //   this.isShowProduct = false
    // }
  },
  mounted () {
    // 首次加载时给currentMenu赋值
    // this.$nextTick(() => {
    //   this.routerIdentify(this.$route.path)
    // })
  },
  methods: {
    // 根据当前路由path来识别当前菜单
    // routerIdentify (path) {
    //   this.currentMenu = 'undefinedMenu'
    //   const menuRouterRoot = {
    //     Home: '/home',
    //     Business: '/business',
    //     Monitor: '/monitor',
    //     Analysis: '/analysis',
    //     System: '/system',
    //     Partner: '/partner',
    //     TermsOfService: '/termsofservice'
    //   }
    //   Object.entries(menuRouterRoot).forEach((item) => {
    //     if (path.indexOf(item[1]) === 0) {
    //       [this.currentMenu] = item
    //     }
    //   })
    // }
  }
}
</script>

<style lang="less" scoped>
@import "./css/main";

// 配色方案1
.skyblue {
  .topic-bg {
    background-color: @skyblue-color !important;
  }
}
// 配色方案2
.dark {
  .topic-bg {
    background-color: @dark-color !important;
  }
}
// 配色方案3
.wathet {
  .topic-bg {
    background-color: @wathet-color !important;
  }
}
// 配色方案4
.white {
  .topic-bg {
    background-color: @white-color !important;
  }
}
.topic-wrapper {
  position: relative;
}
.topic {
  height: 50px;
  line-height: 50px;
  padding-left: 20px;
  white-space: nowrap;

  .logo {
    margin-right: 30px;
    display: inline;
  }

  .entrance {
    position: absolute;
    right: 0px;
    top: 0px;
  }
}


</style>
