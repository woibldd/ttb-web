<template>
  <div class="freshchat-container" @click="showWidget">
    <div class="freshchat-box">
      <div class="freshchat-button" flex="main:center cross:center"> 
        <icon name="message-history" />
      </div> 
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    showWidget() {
      if (window.fcWidget) {
        if (window.fcWidget.isOpen()) {
          window.fcWidget.close()
        } else { 
          window.fcWidget.open()
        }
      } 
    }
  }
}
</script>

<style lang="scss">

.freshchat-container {
  bottom: 15px;
  height: 50px;
  min-height: 50px;
  min-width: 50px;
  overflow: hidden;
  position: fixed;
  right: -40px;
  width: 50px;
  z-index: 2147483600;
  transition:ease-out 0.3s; 
  &:hover {
    right: 0;
  }
  .freshchat-box { 
    width: 40px;
    border-radius: 34px 8px 34px 34px; 
    box-shadow: 0 5px 4px 0 rgba(0, 0, 0, .26);
    background-color: $primary;
    .freshchat-button {
      height: 40px;
    }
  }
}
</style>