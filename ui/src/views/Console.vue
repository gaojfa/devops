<template>
  <OuterFrame>
    <Topic
      slot="top"
      class="my-topic"
    >
    <!-- <XadminEntrance
        slot="entrance"
        @click.stop="() =>{}"
        @switch-show-search-box="changeShowSearchBox"
        @trigger-tasklist="()=> $refs.tasklistDrawer.popup()"
      /> -->
    </Topic>
    <RouterView />
    <sidebarMenu
      slot="menu"
      :is-shrink="isShrink"
      @mouseover.native="isShrink=false"
      @mouseout.native="isShrink=true"
      @changeShrink="changeShrink"
    />
  </OuterFrame>
</template>

<script>
import OuterFrame from '../components/common/core/OuterFrame.vue'
import Topic from '../components/common/Topic.vue'
import SidebarMenu from '../components/common/SidebarMenu.vue'

export default {
  name: 'Console',
  components: {
    OuterFrame,
    Topic,
    SidebarMenu
  },
  data () {
    return {
      isShrink: true
    }
  },
  methods: {
    changeShrink (boolean) {
      this.isShrink = boolean
    }
  }
}
</script>

<style>

</style>
