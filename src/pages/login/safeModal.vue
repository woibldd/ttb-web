<template>
  <div class="safe-container">
    <div class="safe-title">
      <icon
        name="information"
        color="$primary;" />
      <span>{{ $t('modal.safeModal.greet') }}</span>
    </div>
    <div class="safe-content">
      <p>{{ $t('modal.safeModal.content') }}</p> 
      <p class="pt-10">{{ $t('modal.safeModal.salute') }}</p>
    </div>
    <div
      class="safe-footer"
      flex="main:right">
      <el-button
        type="primary"
        @click="close"> {{ $t('modal.safeModal.confirm') }}</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SafeModal',
  methods: {
    close () {
      this.$emit('close')
    }
  }
}
</script>
<style scoped lang="scss">
  .safe-container{
    width: 400px;
    padding: 35px;
    background: #283A4C;
    color: #fff;
    border-radius: 4px;
    .safe-title {
      font-size: 18px;
      padding-bottom: 20px;
      .iconfont {
        color: $primary;
      }
    }
    .safe-content {
      padding-bottom: 20px;
      line-height: 2em;
    }
    .safe-footer {
      text-align: right;
    }
  }
</style>
