<template>
  <div class="modal-bg"
     ref="bg"
     :class="{open: open}"
     @click.self="clickBackdrop">
    <div
      :class="{'hide': !open}"
      class="sideBar modal-wrap"
      :style="{backgroundColor: bgColor}">
      <slot/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VSideBar',
  props: {
    bgColor: {
      type: String,
      default: 'white'
    },
    open: {
      type: Boolean,
      default: false
    },
    backdrop: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    clickBackdrop () {
      if (this.backdrop) {
        this.$emit('update:open', false)
        this.$emit('close')
      }
    },
    close () {
      this.$emit('update:open', false)
      this.$emit('close')
    }
  }
}
</script>

<style scoped lang="scss">
  .modal-bg {
    z-index: 1001;
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    visibility: hidden;
    background-color: fade-out(black, .5);
    transition: opacity 300ms, visibility 0s 300ms;
    display: flex;
    justify-content: center;
    align-items: center;
    &.open {
      opacity: 1;
      visibility: visible;
      transition: opacity 300ms;
    }
    .sideBar {
      width: 400px;
      background: black;
      position: absolute;
      top: 0px;
      bottom:0px;
      right: 0;
      z-index:1000;
      transition: all ease .4s;
      overflow: auto;
      font-size: 16px;
      transition: right 300ms;
      &.hide {
        right: -400px;
      }
    }
    .modal-wrap {
      z-index: 1;
    }
    .modal-mask {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      z-index: 2;
    }
    // .close-btn {
    //   @include bg-retina('../assets/icon-cancel', 'png', 12px, 12px);
    //   width: 40px;
    //   height: 40px;
    //   position: absolute;
    //   right: 22px;
    //   top: 12px;
    //   filter: grayscale(100%);
    //   opacity: .3;
    //   transition: opacity 300ms;
    //   z-index: 1000;
    //   &:hover {
    //     opacity: .7;
    //   }
    // }
  }
</style>
