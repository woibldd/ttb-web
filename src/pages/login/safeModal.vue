<template>
  <div class="safe-container" :class="{'safe-contaienr-mobile': isMobile}">
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
import utils from '@/modules/utils'
export default {
  name: 'SafeModal',
  computed: {
    isMobile() {
      return utils.isMobile()
    }
  },
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
  .safe-contaienr-mobile {
    width: 260px;
    font-size: 14px;
    height: 480px;
    overflow: hidden;
    overflow-y: scroll;
  }
</style>
