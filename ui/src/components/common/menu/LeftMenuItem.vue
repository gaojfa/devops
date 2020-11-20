<template>
  <div
    class="menu-item"
    :class="$colorTheme"
  >
    <Submenu
      v-if="menu.children && menu.children.length > 0"
      :key="getMenuName"
      class="left-menu-sub"
      :name="getMenuName"
    >
      <template
        slot="title"
        style="padding-left:10px;"
      >
        <span
          class="menu-text"
          :style="{ marginLeft: marginLeft + 'px' }"
        >
          <!-- <FontAwesomeIcon
            v-if="menu.iconSeries"
            :icon="[menu.iconSeries, menu.icon]"
            class="fa-fw"
            style="margin-right: 3px"
          />
          <FontAwesomeIcon
            v-else
            :icon="['fas', menu.icon]"
            class="fa-fw"
            style="margin-right: 3px"
          /> -->
          {{ menu.title }}
        </span>
      </template>

      <LeftMenuItem
        v-for="(child, i) in menu.children"
        :key="`${menu.title}_${i}`"
        :menu="child"
      />
    </Submenu>

    <MenuItem
      v-else
      :key="getMenuName"
      class="left-menu-item"
      :name="getMenuName"
      @click.native="onClick(menu)"
    >
      <span
        class="menu-text"
        :style="{ marginLeft: marginLeft + 'px' }"
      >
        <!-- <FontAwesomeIcon
          v-if="menu.iconSeries"
          :icon="[menu.iconSeries, menu.icon]"
          class="fa-fw"
          style="margin-right: 3px"
        />
        <FontAwesomeIcon
          v-else
          :icon="['fas', menu.icon]"
          class="fa-fw"
          style="margin-right: 3px"
        /> -->
        {{ menu.title }}
      </span>
    </MenuItem>
  </div>
</template>

<script>
export default {
  name: 'LeftMenuItem',
  props: {
    menu: {
      type: Object,
      required: true
    },
    marginLeft: {
      type: Number,
      default: 12
    }
  },
  computed: {
    getMenuName () {
      return this.menu.name || this.menu.title + '_temp'
    }
  },
  methods: {
    onClick (menu) {
    //   const url = this.$properties.monitoruiUrl.split('login')[0]
    //   this.$store.commit('app/updateRouterActiveTime')
    //   if (menu.title === '态势感知') {
    //     window.open('http://10.5.7.239:8181/#/nssa?tenantId=' + this.$store.state.app.tenant.tenantId + '&username=' + this.$store.state.app.tenant.userName, '_blank')
    //   } else if (menu.title === '安全平台') {
    //     window.open('http://10.5.7.239:8181/?tenantId=' + this.$store.state.app.tenant.tenantId + '&username=' + this.$store.state.app.tenant.userName, '_blank')
    //   } else if (menu.name === 'MonitorHomePage') {
    //     window.open(this.$properties.monitoruiUrl)
    //   } else if (menu.name === 'MonitorResourceManage') {
    //     window.open(this.$properties.monitoruiUrl, '_self')
    //     window.open(url + 'resourceManage/initResourceManage.do', '_self')
    //   } else if (menu.name === 'MonitorAlarmManage') {
    //     window.open(this.$properties.monitoruiUrl, '_self')
    //     window.open(url + 'warning/initWarningManage.do', '_self')
    //   } else if (menu.name === 'MonitorTopology') {
    //     window.open(this.$properties.monitoruiUrl, '_self')
    //     window.open(url.split('portal')[0] + 'si_topology3/topoinfoT/gotomain', '_self')
    //   } else if (menu.name === 'MonitorInspection') {
    //     window.open(this.$properties.monitoruiUrl, '_self')
    //     window.open(url + 'inspectionReport/queryPageReport.do', '_self')
    //   } else if (menu.name === 'MonitorReportForm') {
    //     window.open(this.$properties.monitoruiUrl, '_self')
    //     window.open(url + 'report/initReport.do', '_self')
    //   } else if (menu.name === 'MonitorSystemManage') {
    //     window.open(this.$properties.monitoruiUrl, '_self')
    //     window.open(url + 'componment/initComponment.do', '_self')
    //   } else {
    //     this.$router.push({ name: menu.name })
    //   }
      this.$router.push({ name: menu.name })
    }
  }
}
</script>

<style lang="less" scoped>
    @import "../css/main";
    .skyblue {
        // 展开的子菜单文本
        .left-menu-sub.ivu-menu-submenu.ivu-menu-opened{
            color:@skyblue-left-sub-opened-font-color;
            /deep/ .ivu-menu {
                background-color: @skyblue-left-sub-opened-color;
            }
        }
        .left-menu-sub.ivu-menu-submenu /deep/ .ivu-menu-submenu-title{
            color:@skyblue-font-color-a;
            &:hover{
                background-color: @skyblue-left-hover-color;
                color: @skyblue-left-font-hover-color;
                .menu-text{
                    color:@skyblue-left-font-hover-color;
                }
            }
        }
        // active状态的菜单单项
        .ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu){
            background-color: @skyblue-left-hover-color;
            &.ivu-menu-item-selected:before{
                background: @skyblue-left-sidebar-color;
            }
            .menu-text{
                color: @skyblue-left-font-hover-color;
            }
        }
        .ivu-menu-item:hover{
            background-color: @skyblue-left-hover-color;
            .ivu-menu-submenu-title, .menu-text{
                color: @skyblue-left-font-hover-color;
            }
        }
    }
    .dark{
        // 展开的子菜单文本
        .left-menu-sub.ivu-menu-submenu.ivu-menu-opened{
            color:@dark-left-sub-opened-font-color;
            /deep/ .ivu-menu{
                background-color: @dark-left-sub-opened-color;
            }
        }
        .left-menu-sub.ivu-menu-submenu /deep/ .ivu-menu-submenu-title{
            color:@dark-font-color-a;
            padding-left: 0px !important;
            &:hover{
                /* background-color: @dark-left-hover-color; */
                color: @dark-left-font-hover-color;
                .menu-text{
                    color:@dark-left-font-hover-color;
                }
            }
        }
        // active状态的菜单单项
        .ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu){
            background-color: @dark-left-hover-color;
            &.ivu-menu-item-selected:before{
                background: @dark-left-sidebar-color;
            }
            .menu-text{
                color: @dark-left-font-hover-color;
                font-weight: bold;
            }
        }

        .ivu-menu-item:hover{
            /* background-color: @dark-left-hover-color;*/
            .ivu-menu-submenu-title, .menu-text{
                color: @dark-left-font-hover-color;
            }
        }
    }

    .wathet{
        // 展开的子菜单文本
        .left-menu-sub.ivu-menu-submenu.ivu-menu-opened{
            color:@wathet-left-sub-opened-font-color;
            /deep/ .ivu-menu{
                background-color: @wathet-left-sub-opened-color;
            }
        }
        .left-menu-sub.ivu-menu-submenu /deep/ .ivu-menu-submenu-title{
            color:@wathet-font-color-a;
            &:hover{
                /* background-color: @wathet-left-hover-color; */
                color: @wathet-multinav-color;
                .menu-text{
                    color:@wathet-multinav-color;
                }
            }
        }
        // active状态的菜单单项
        .ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu){
            background-color: @wathet-left-hover-color;
            &.ivu-menu-item-selected:before{
                background: @wathet-left-sidebar-color;
            }
            .menu-text{
                color: @wathet-left-font-hover-color;
                font-weight: bold;
            }
        }

        .ivu-menu-item:hover{
            /* background-color: @wathet-left-hover-color; */
            .ivu-menu-submenu-title, .menu-text{
                color: @wathet-multinav-color;
            }
        }
        .menu-text {
            color: #323639;
        }
        .ivu-menu-opened .menu-text {
            color: #323639;
        }
    }

    .white{
        // 展开的子菜单文本
        .ivu-menu-light.ivu-menu-vertical .left-menu-sub.ivu-menu-submenu.ivu-menu-opened{
            color:@white-left-sub-opened-font-color;
            /deep/ .ivu-menu{
                background-color: @white-left-sub-opened-color;
                margin-top: 16px;
                &:before {
                  position: absolute;
                  left: 30px;
                  top: 0;
                  height: calc(100%);
                  content: '';
                  width: 2px;
                  background: #e4e9ee;
              }
            }
            .ivu-menu-item-selected:before{
                position: absolute;
                left: 30px;
                top: 0;
                height: calc(100%);
                content: '';
                width: 2px;
                background: @white-left-sidebar-color;
            }
            .ivu-menu-item {
              padding: 0;
              // margin-bottom: 16px;
              margin-bottom: 20px;
            }
            .menu-item:last-child .ivu-menu-item {
              padding: 0;
              margin-bottom: 0;
            }
         }
        .left-menu-sub.ivu-menu-submenu /deep/ .ivu-menu-submenu-title{
            color:@white-font-color-a;
            // padding: 15px 4px 15px 15px;
            padding: 20px 4px 4px 15px;
            &:hover{
                /* background-color: @wathet-left-hover-color; */
                color: @white-multinav-color;
                .menu-text{
                    color:@white-multinav-color;
                }
            }
            .ivu-menu-submenu-title-icon{
                position: absolute;
                top: 28px;
                right: 24px;
            }
        }
        // active状态的菜单单项
        .ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu){
            background-color: @white-left-hover-color;
            // margin: 14px 0 14px 0;
            // padding: 0 4px 0 14px;
            &.ivu-menu-item-selected:before{
                position: absolute;
                left: 10px;
                // top: calc(30%);
                top: calc(45%);
                height: 20px;
                content: '';
                width: 2px;
                background: @white-left-sidebar-color;
            }
            .menu-text{
                color: @white-left-font-hover-color;
                font-weight: bold;
            }
        }

        .ivu-menu-item:hover{
            /* background-color: @wathet-left-hover-color; */
            .ivu-menu-submenu-title, .menu-text{
                color: @white-multinav-color;
            }
        }
        .menu-text {
            color: #323639;
        }
        .ivu-menu-opened .menu-text {
            color: #323639;
        }
    }


    .menu-text {
        color: @main-font-color-a;
        font-size: 14px;
    }

    .ivu-menu-submenu .ivu-menu .menu-item li {
        padding-left: 30px !important;
    }

    .ivu-menu-submenu .ivu-menu .menu-item li .menu-text {
        font-size: 14px !important;
    }
    .ivu-menu-vertical .ivu-menu-item, .ivu-menu-vertical .ivu-menu-submenu-title {
        padding: 20px 4px 4px 14px;
    }


</style>
