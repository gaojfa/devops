<template>
  <InnerFrame>
    <LeftMenu
      slot="left"
      logo="logo-codepen"
      title="控制台"
      :menus="menus"
    />

    <RouterView />
  </InnerFrame>
</template>

<script>
import InnerFrame from '../../components/common/core/InnerFrame.vue'
import LeftMenu from '../../components/common/menu/LeftMenu.vue'
// import xadminMenu from '../../../../menu/default/xadmin/console'
// import portalMenu from '../../../../menu/default/portal/console'

export default {
  name: 'Env',
  components: { LeftMenu, InnerFrame },
  data () {
    return {
      menus: [],
      unwatchFunctionId: undefined
    }
  },
  mounted () {
    // this.unwatchFunctionId = this.$store.watch(state => state.myself.functions, () => {
    //   this.loadMenu()
    // })
    this.loadMenu()
  },
  beforeDestroy () {
    if (typeof this.unwatchFunctionId === 'function') {
      this.unwatchFunctionId()
    }
  },
  methods: {
    loadMenu () {
      this.menus = this.$menus.template
      // this.menus = this.$filterMenuFunction(this.$menus.env)
      // this.menus = []
      // const menu = this.$isXadmin ? xadminMenu : portalMenu
      // for (let i = 0; i < menu.length; i++) {
      //   const pm = menu[i].permission
      //   if (pm === undefined || this.$checkFunction(pm)) {
      //     this.menus.push(menu[i])
      //   }
      // }
      // for (let i = 0; i < this.menus.length; i++) {
      //   if (this.menus[i].children !== undefined) {
      //     for (let j = 0; j < this.menus[i].children.length; j++) {
      //       const p2 = this.menus[i].children[j].permission
      //       if (p2 !== undefined && !this.$checkFunction(p2)) {
      //         this.menus[i].children.splice(j, 1)
      //         j--
      //       }
      //     }
      //   }
      // }
    }
  }
}
</script>
