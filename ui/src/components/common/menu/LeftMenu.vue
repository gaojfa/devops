<template>
  <div
    class="menu"
    :style="{ width: width + 'px' }"
  >
    <div
      v-if="title"
      class="menu-top"
    >
      <div class="logo-name">
        {{ title }}
      </div>
    </div>

    <Menu
      ref="menu"
      :accordion="accordion"
      :open-names="subMenuOpen"
      :active-name="menuActiveName"
      :width="width + 'px'"
      mode="vertical"
    >
      <LeftMenuItem
        v-for="d in menus"
        :key="d.name"
        :menu="d"
        :margin-left="marginLeft"
      />
    </Menu>
  </div>
</template>

<script>
import LeftMenuItem from './LeftMenuItem.vue'

export default {
  name: 'LeftMenu',
  components: {
    LeftMenuItem
  },
  props: {
    width: {
      type: Number,
      default: 184
    },
    logo: {
      type: String,
      default: undefined
    },
    accordion: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: undefined
    },
    menus: {
      type: Array,
      default: () => []
    },
    marginLeft: {
      type: Number,
      default: 5
    },
    // 同InnerFrame的pageNode
    pageMode: {
      type: String,
      default: 'console'
    }
  },
  data () {
    return {
      subMenuOpen: [],
      menuActiveName: ''
    }
  },
  watch: {
    menus () {
      this.subMenuOpen = this.getOpenedNamesByActiveName(this.$route, this.menus)
      this.$nextTick(() => {
        this.$refs.menu.updateActiveName()
      })
    },
    $route (to) {
      if (to.fullPath.indexOf('=') > 0) {
        this.menuActiveName = to.fullPath.substring(to.fullPath.lastIndexOf('=') + 1, to.fullPath.length) + '_temp'
      } else {
        this.menuActiveName = to.meta.menuActiveName || to.name
      }
      // this.menuActiveName = to.meta.menuActiveName || to.name
      this.subMenuOpen = this.getOpenedNamesByActiveName(to, this.menus)
    },
    menuActiveName () {
      this.$nextTick(() => {
        this.$refs.menu.updateActiveName()
      })
    },
    subMenuOpen () {
      this.$nextTick(() => {
        this.$refs.menu.updateOpened()
      })
    }
  },
  mounted () {
    this.menuActiveName = this.$route.meta.menuActiveName || this.$route.name
    this.subMenuOpen = this.getOpenedNamesByActiveName(this.$route, this.menus)
  },
  methods: {
    onClick (name) {
      this.$emit('on-click', name)
    },
    /**
     * @description 获取当前路由的上级路由名称
     * @param name
     * @returns {string[]}
     */
    getOpenedNamesByActiveName (route, menuList) {
      for (const d of menuList) {
        if (d.name && d.name === route.name) {
          return [d.name]
        } if (d.children && d.children.length) {
          const temp = this.getOpenedNamesByActiveName(route, d.children)
          if (temp && temp.length) {
            return [d.name, ...temp]
          }
        }
      }
      return []
    }
  }
}
</script>

<style lang="less" scoped>
  @import "../css/main";

  .portal-frame .menu {
    color: #666;
    position: relative;

    &-top {
      padding-top: 20px;
      margin-bottom: 24px;
      text-align: center;
    }

    .logo-con {
      font-size: 60px;
      font-family: SourceHanSansSC;
      line-height: 50px;
    }

    .logo-name {
      font-size: 16px;
    }
  }

  .xadmin-frame .menu {
    position: relative;

    &-top {
      // padding: 18px 8px 0 20px;
      padding: 26px 8px 0 20px;
    }

    .logo-name {
      font-size: 18px;
      color: #333;
      // height: 40px;
      // line-height: 40px;
      padding-bottom: 14px;
      border-bottom: 1px solid #e5ebf0;
      font-weight: 900;
    }
  }

  .wathet .logo-con {
      color: #2C50A0;
  }
  .wathet .logo-name {
      color: #000;
  }

  .intro{
    .menu {
      color: #666;
      position: relative;

      &-top {
        padding-top: 20px;
        margin-bottom: 24px;
        text-align: center;
      }

      .logo-con {
        color: #666;
        font-size: 60px;
        font-family: SourceHanSansSC;
        line-height: 50px;
      }

      .logo-name {
        font-size: 16px;
        color: #666;
      }
    }
  }
</style>
