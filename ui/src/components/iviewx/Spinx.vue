<!--
包裹着Spin的容器
-->
<template>
  <div
    style="position: relative;"
    :style="rootStyle"
  >
    <transition name="fade">
      <Spin
        v-if="spinning"
        :fix="fix"
      >
        <div
          class="loader"
          :style="{'width':size+sizeUnit,'height':size+sizeUnit}"
        >
          <svg
            class="circular"
            width="120"
            height="120"
            viewBox="25 25 50 50"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              class="path"
              cx="50"
              cy="50"
              r="20"
              fill="none"
              stroke-width="5"
              stroke-miterlimit="10"
            />
          </svg>
        </div>
      </Spin>
    </transition>
    <slot />
  </div>
</template>

<script>
export default {
  name: 'Spinx',
  props: {
    spinning: {
      type: Boolean,
      default: false
    },
    fix: {
      type: Boolean,
      default: true
    },
    size: {
      type: Number,
      default: 30
    },
    sizeUnit: {
      type: String,
      default: 'px'
    },
    displayInline: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    rootStyle () {
      return this.displayInline
        ? {
          'padding-left': `${this.size}${this.sizeUnit}`,
          display: 'inline'
        }
        : { }
    }
  }
}
</script>

<style scoped>
  .loader{
    position: relative;
    margin: 0 auto;
  }
  .circular{
    animation: rotate 2s linear infinite;
    height: 100%;
    transform-origin: center center;
    width: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
  }
  .path{
    stroke-dasharray: 1,200;
    stroke-dashoffset: 1;
    animation: dash 1.5s ease-in-out infinite,color 6s ease-in-out infinite;
    stroke-linecap: round;
  }

  @keyframes rotate {
    100% {
      transform: rotate(3turn);
    }
  }
  @keyframes color{
    0%, 100% {
      stroke: #0057e7;
    }
    40% {
      stroke: #d62d20;
    }
    66% {
      stroke: #008744;
    }
    80%, 90% {
      stroke: #ffa700;
    }
  }
  @keyframes dash{
    0% {
      stroke-dasharray: 1,200;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 89,200;
      stroke-dashoffset: -85;
    }
    100% {
      stroke-dasharray: 89,200;
      stroke-dashoffset: -124;
    }
  }
</style>
