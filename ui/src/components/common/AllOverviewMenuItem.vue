<template>
  <div class="ov-menu-item-wrap">
    <div
      class="ov-menu-item"
    >
      <h2>
        <!-- <FontAwesomeIcon
          :icon="getIcon(item)"
          class="fa-icon"
        /> -->
        {{ menus.title }}
      </h2>
      <ul v-if="menus.children && menus.children.length">
        <li
          v-for="(menu, j) in menus.children"
          :key="`ov_item_${j}`"
          :class="getMenuCls(menu)"
          @click="onClick(menu,menus.platformUrl)"
        >
          <template>
            <!-- <Icon :type="getIcon(menu)" /> -->
            <!-- <FontAwesomeIcon
              :icon="getIcons()"
              class="fa-icon"
            /> -->
            <span>{{ menu.title }}</span>
          </template>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

export default {
  name: 'AllOverviewMenuItem',
  props: {
    menus: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    getIcon (menu) {
      // return menu.icon ? menu.icon : 'ios-bookmark-outline'
      return ['fas', menu.icon ? menu.icon : 'circle']
    },
    getIcons () {
      // return menu.icon ? menu.icon : 'ios-bookmark-outline'
      return ['fas', 'map-marker']
    },
    getMenuCls (menu) {
      return menu.children && menu.children.length ? 'sub-menu' : ''
    },
    onClick (menu, platformUrl) {
      this.$emit('on-click', menu, platformUrl)
    }
  }
}
</script>

<style scoped lang="less">
  .ov-menu-item-wrap{
    //  max-width: 220px;
  }
  .ov-menu-item{
    width: 100%;
    margin-bottom: 42px;
    color: #7d8ea8;
    h2{
      color: #333333;
      margin-bottom: 16px;
      font-size: 16px;
      font-weight: 700;
      font-family: '苹方中粗';
    }

    ul, li {
      list-style: none;
    }

    ul{
      li{
        font-size: 14px;
        color: #333333;
        font-family: '苹方';
        margin-bottom: 16px;
        border-bottom: 2px solid transparent;

        &:hover{
          color: #0083fe;
          font-family: '苹方加粗';
          font-weight: 600 ;
          border-bottom: 2px solid #0083fe;
          cursor: pointer;
          .fa-icon{
            color: #0083fe;
          }
        }

        .ivu-icon{
          position: relative;
          top: -2px;
          font-size: 25px;
          margin-right: 10px;
        }

       .fa-icon{
         float: right;
         margin: 5px 2px 0 0;
         width: 1.28571429em;
         text-align: center;
         color: transparent;
        }

        &.sub-menu{
          padding: 0;
          border: 1px solid transparent;
          &:hover{
            background-color: inherit;
            color: inherit;
          }
          h3{
            padding: 5px 19px;
            font-weight: normal;
            font-size: 14px;
            /*font-style: italic;*/
          }
        }
      }
    }

  }
</style>
