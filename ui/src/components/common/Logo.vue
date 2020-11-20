<template>
  <!-- <RouterLink
    class="logo"
  > -->
  <div class="logo">
    <img
      class="logo-img"
      :src="getLogoSrc()"
      :onerror="'src=\'' + defaultLogo+'\''"
    >
  </div>
  <!-- <h1 class="logo-text">
      {{ name }}
    </h1> -->
  <!-- </RouterLink> -->
</template>

<script>
import conf from '../../conf'

// import websiteApi from '../../api/website/websiteApi'

export default {
  name: 'Logo',
  props: {
    toRouter: {
      type: String,
      default: conf.homeRouter
    }
  },
  data () {
    return {
      defaultLogo: this.$logo,
      logoUrl: '/cloudui/master/ws/logo/download?size=big'
      // name: conf.customWebsite ? this.$store.state.website.siteName : this.$website.name
    }
  },
  // mounted () {
  //   if (conf.customWebsite) {
  //     this.unwatchWebsiteName = this.$store.watch(state => state.website.siteName, () => {
  //       this.name = conf.customWebsite ? this.$store.state.website.siteName : this.$website.name
  //     })
  //   }
  // },
  // beforeDestroy () {
  //   if (this.unwatchWebsiteName && typeof this.unwatchWebsiteName === 'function') {
  //     this.unwatchWebsiteName()
  //   }
  // },
  methods: {
    getLogoSrc () {
      console.log(this.logoUrl)
      return conf.customWebsite ? (this.logoUrl) : this.defaultLogo
    }
  }
}
</script>

<style lang="less" scoped>

  .logo {
    .logo-img {
      display: inline-block;
      vertical-align: middle;
      // width: auto;
      width: 152px;
      height: auto;
      max-height: 30px;
      position: relative;
      top: -5px;
      margin-left: 15px;
    }

    .logo-text {
      display: inline-block;
      vertical-align: middle;
      font-size: 20px;
      margin-left: 12px;
      position: relative;
      top: -2px;
      // color: @main-font-color-a;
    }
  }
</style>
