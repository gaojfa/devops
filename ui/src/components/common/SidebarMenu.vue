<template>
  <div
    class="sidebar-menu"
    :class="{'sidebar-menu-shrink':isShrink}"
  >
    <div class="sidebar-wrapper">
      <div class="sidebar-menu-cont">
        <div class="service-menu">
          <a
            href="javascript:void(0)"
            class="menu"
            @mouseover="showOverview = true"
          >
            <span class="menu-icon">
              <Icon
                slot="trigger"
                type="md-menu"
                :size="35"
                class="icon"
              />
            </span>
            <span class="menu-text">
              服务列表
              <!-- <FontAwesomeIcon
                :icon="['fas','chevron-right']"
                class="menu-text-icon"
              /> -->
            </span>
          </a>
        </div>
        <ul class="platform-menus">
          <li
            v-for="(item,index) in platformMenu.platformList"
            :key="index"
            class="menu"
            @click.stop="onClick(item)"
          >
            <a
              href="javascript:void(0)"
              class="menu"
            >
              <span class="menu-icon">
                <Icon
                  :type="item.icon"
                  :size="35"
                  class="icon"
                />
              </span>
              <span class="menu-text">
                {{ item.title }}
              </span>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <AllOverviewMenu
      slot="overviewMenu"
      v-model="showOverview"
      :menus="overviewMenu"
    />
  </div>
</template>

<script>
import AllOverviewMenu from './AllOverviewMenu.vue'
import overviewMenu from '../../menu/overview'
import platformMenu from '../../menu/platform'

export default {
  name: 'SidebarMenu',
  components: { AllOverviewMenu },
  props: {
    isShrink: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      showOverview: false,
      overviewMenu,
      platformMenu
    }
  },
  methods: {
    onClick (d) {
      if (d.name === 'WarningMonitor') {
        window.open(this.$properties.monitoruiUrl)
        return false
      }
      this.$emit('changeShrink', true)
      this.$router.push({ name: d.name })
      return false
    }
  }
}
</script>

<style lang="less" scoped>
.sidebar-menu-shrink {
  width: 46px!important;
  overflow-x: hidden;
}
.sidebar-menu {
    width: 230px;
    height: 100vh;
    transition: all .3s ease-out 0s;
    position: absolute;
    left:0;
    top: 0;
    &::before{
      content: '';
      display: inline-block;
      width: 184px;
      margin-left: 46px;
      height: calc(100% - 50px);
      background: #fff;
    }
    .sidebar-wrapper {
      position: absolute;
      left: 0;
      top: 0;
      height:calc(100% - 50px);
    }
    .menu-icon {
      width: 46px;
      height: 46px;
      line-height: 46px;
      text-align: center;
      display: inline-block;
      border-bottom: 1px solid #eef0f0;
      .icon {
        font-size: 20px!important;
      }
    }
    .menu-text {
      width: 184px;
      height: 46px;
      line-height: 46px;
      padding: 0 18px;
      display: inline-block;
      .menu-text-icon{
        float: right;
        margin-top: 16px;
        font-size: 12px;
      }
    }
    .service-menu {
      width: 230px;
      height: 46px;
    }
    .platform-menus {
      li {
        width: 230px;
        height: 46px;
      }
    }
    .menu {
      display: block;
      color: #333;
      &:hover {
        color: #0083fe;
        background: #e5f3fe;
        .menu-icon {
          background: #0083fe;
          color: #fff;
        }
      }
    }
}
</style>
