<template>
  <div class="verify-modal-container">
    <div
      class="modal-bg verify-modal-layer"
      ref="bg"
      :class="{open: open}"
      @click.self="clickBackdrop">
      <div
        class="modal-wrap"
        :style="{backgroundColor: bgColor}">
        <div class="verify-modal-layer">
          <div class="layer__title mb-30">{{ title || $t('close_verify') }}</div>
          <div class="layer__content">
            <div class="modal__row mt-12 mb-25">
              <div class="row__label mb-9">{{ $t('err_captcha_empty') }}</div>
              <div class="row__input" >
                <input
                  v-model="code"
                  @change="codeChange"
                  class="input-validate mr-14">
                <count-down
                  :send-text="$t('hq_send')"
                  :send-code-func="getVerifyCode"
                />
              </div>
            </div>

          </div>
          <div class="btns">
            <v-btn
              class="modal-vefiry-btn cancel"
              @click="close"
              :label="$t('cancel')"/>
            <v-btn
              class="modal-vefiry-btn"
              @click="ensure"
              :label="$t('confirm')"/>
          </div>
        </div>
        <a
          class="close-btn"
          @click.prevent="close"/>
      </div>
      <div
        class="modal-mask"
        v-show="!open"/>
    </div>

  </div>
</template>
<script>
import './verify-modal.scss'
import countDown from '@/components/common/countdown-code-button'

import vModal from '@/components/VModal.vue'

export default {
  components: {
    vModal, countDown
  },
  data () {
    return {
      code: ''
    }
  },
  props: {
    title: {
      type: String,
      default: ''
    },
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
    },
    ensureCallback: {
      type: Function,
      default: () => {}
    },
    getCodeFunc: {
      type: Function,
      default: () => {
        console.log('get code func defa8lt')
      }
    }

  },
  computed: {
    getCode () {
      return this.getCodeFunc
    }
  },
  methods: {
    ensure () {
      this.ensureCallback()
    },
    getVerifyCode () {
      console.log('get verify code')
      this.getCode()
    },
    clickBackdrop () {
      if (this.backdrop) {
        this.$emit('update:open', false)
        this.$emit('close')
      }
    },
    close () {
      this.$emit('update:open', false)
      this.$emit('close')
    },
    codeChange () {
      console.log(this.code, 'code')
      this.$emit('update:code', this.code)
    }
  }
}
</script>
<style scoped lang="scss">
@import "./verify-modal.scss";
</style>
