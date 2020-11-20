<template>
  <transition name="fade">
    <div
      v-show="value"
      class="all-overview-menu"
      @click.stop=""
    >
      <!-- <FontAwesomeIcon
        :icon="['fas','times']"
        class="overview-menu-icon"
        @click="hideMenu"
      /> -->
      <Row class="search-row">
        <Inputx
          v-model="key"
          :search="true"
          placeholder="请输入名称"
          @on-search="search(key)"
          @input="search(key)"
        />
        <div v-if="!key">
          <p v-if="RecentVisitMenus.length>0">
            最近访问的服务:
            <span
              v-for="(item,index) in RecentVisitMenus"
              :key="item.title"
            >
              <a
                href="javascript:;"
                @click="jumpToPage(item,item.platformUrl,true)"
              >{{ item.title }}</a>
              <span v-if="index!==RecentVisitMenus.length-1">|</span>
            </span>
          </p>
          <p v-else>
            暂无最近访问的服务
          </p>
        </div>
        <p v-if="searchMenus.length===0">
          未搜索到与“<span style="color:red">{{ key }}</span>”相关的产品，请调整关键词后重新尝试...
        </p>
      </Row>
      <Row
        v-if="menus"
        class="menuscont"
      >
        <i-col
          v-for="(item, i) in searchMenus"
          :key="i"
        >
          <AllOverviewMenuItem
            :menus="item"
            @on-click="jumpToPage"
          />
        </i-col>
      </Row>
    </div>
  </transition>
</template>

<script>
import AllOverviewMenuItem from './AllOverviewMenuItem.vue'

export default {
  name: 'AllOverviewMenu',
  components: { AllOverviewMenuItem },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    menus: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      key: '',
      RecentVisitMenus: JSON.parse(localStorage.getItem('RecentVisitMenus')) || [],
      defaultVisitMenus: localStorage.getItem('RecentVisitMenus'),
      searchMenus: []
    }
  },
  watch: {
    $route () {
      this.hideMenu()
    }
  },
  mounted () {
    document.addEventListener('click', this.hideEvent)
    this.search()
  },
  beforeDestroy () {
    document.removeEventListener('click', this.hideEvent)
  },
  methods: {
    jumpToPage (menu, platformUrl, isVisit) {
      if (menu.url) {
        const token = this.$store.state.myself.tokenId
        const ip = this.$properties[platformUrl]
        let url = ''
        if (platformUrl === 'cloudMonitorUrl') {
          url = ip + menu.url + '?userName=admin&password=12345678'
        } else if (platformUrl === 'performanceUrl') {
          url = ip + menu.url + '&username=admin&password=1qqaz@WSX45yJidldfBXHDT'
        } else if (platformUrl === 'ServerVirtualizationUrl' || platformUrl === 'SecureCloudDesktopUrl') {
          const urlSplit = menu.url.split('#')
          url = ip + urlSplit[0] + (token ? '?tokenId=' + token : '') + '#' + urlSplit[1]
        } else {
          url = ip + menu.url + (token ? '?tokenId=' + token : '')
        }
        window.open(url, '_self')
      } else {
        this.hideMenu()
        if (!menu.children || menu.children.length <= 0) {
          this.$router.push({ name: menu.name })
        }
      }
      if (!isVisit) {
        this.setRecentvisitMenus(menu, platformUrl)
      }
    },
    hideMenu () {
      this.$emit('input', false)
    },
    hideEvent (e) {
      const current = e.target
      if (current) {
        if ((current.className && typeof current.className === 'string' ? current.className : '').indexOf('trigger-icon') > -1) {
          return
        }
      }

      if (this.value) {
        this.hideMenu()
      }
    },
    setRecentvisitMenus (menu, platformUrl) {
      menu.platformUrl = platformUrl
      const exitMenuIndex = this.RecentVisitMenus.findIndex(item => item.title === menu.title)
      if (exitMenuIndex !== -1) {
        this.RecentVisitMenus.splice(exitMenuIndex, 1)
        this.RecentVisitMenus.unshift(menu)
      } else {
        this.RecentVisitMenus.unshift(menu)
      }
      if (this.RecentVisitMenus.length > 6) {
        this.RecentVisitMenus.length = 6
      }
      localStorage.setItem('RecentVisitMenus', JSON.stringify(this.RecentVisitMenus))
    },
    search (key) {
      this.searchMenus = []

      function filterMenu (menu) {
        let filterResult = null
        if (menu.title.includes(key)) {
          filterResult = menu.title.includes(key)
        } else {
          const filterChildrenMenus = menu.children.filter(menu2 => menu2.title.includes(key))
          menu.children = filterChildrenMenus
          filterResult = filterChildrenMenus.length > 0
        }
        return filterResult
      }

      const newMenus = JSON.parse(JSON.stringify(this.menus))

      if (key) {
        this.searchMenus = newMenus.filter(menu => filterMenu(menu))
      } else {
        this.searchMenus = this.menus
      }
    }
  }
}
</script>

<style scoped lang="less">
/*滚动条样式*/
.all-overview-menu::-webkit-scrollbar {
    width: 4px;
    /*height: 4px;*/
}
.all-overview-menu::-webkit-scrollbar-thumb {
    border-radius: 10px;
    height: 200px;
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    background: rgba(0,0,0,0.2);
}
.all-overview-menu::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    border-radius: 0;
    background: rgba(0,0,0,0.1);

}
.all-overview-menu{
  // position: fixed;
  // right: 0;
  // top: 60px;
  position: absolute;
  left: 230px;
  top: 0;
  width: 770px;
  height: calc(100% - 50px);
  // width: 100%;
  // height: 100%;
  // padding: 50px;
  padding: 24px;
  overflow:auto;
  z-index: 999;
  background-color: #fff;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);

  .overview-menu-icon{
    position: absolute;
    top: 20px;
    right: 24px;
    font-size: 20px;
  }

  .ivu-col{
    // float: left;
    // width: 174px;
    // padding-right: 26px;
    column-width:174px;
    -moz-column-width:174px;
    -webkit-column-width:174px;
    column-break-inside: avoid;
    -webkit-column-break-inside: avoid;
    -moz--column-break-inside: avoid;
  }
  .search-row{
    width: 658px;
    p{
      // height: 30px;
      // line-height: 30px;
      margin: 12px 0 0;
      font-size:14px;
      color: #666666;
      font-family: '苹方中黑';
      a{
        color: #666666;
        margin: 0 10px;
        &:hover{
          color: #2d8cf0;
        }
      }
    }
  }
}

/*下拉动画*/
.draw-enter-active, .draw-leave-active {
  transition: all 1s ease;
}
.draw-enter, .draw-leave-to {
  height: 0;
}
/*下拉动画 end */
.menuscont {
  column-count: 4;
  -moz-column-count:4;
  -webkit-column-count:4;
  -moz-column-gap:20px;
  -webkit-column-gap:20px;
  column-gap:20px;
  margin-top: 40px;
}
</style>
