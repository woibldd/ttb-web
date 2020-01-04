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
          <div class="layer__title mb-30">{{ title || $t(openOrClose ? 'close_verify' : 'open_verify') }}</div>
          <div class="layer__content">
            <div class="modal__row mt-12 mb-25">
              <div class="row__label mb-9">{{ $t('err_captcha_empty') }}</div>
              <div class="row__input" >
                <input
                  v-model="form.code"
                  maxlength="6"
                  @change="codeChange"
                  @input="onInput"
                  :class="computedHideCountDown && 'google'"
                  class="input-validate mr-14">
                <count-down
                  v-if="!computedHideCountDown"
                  :send-text="$t('hq_send')"
                  :send-code-func="getVerifyCode"
                />
              </div>
            </div>
            <div class="modal__row mt-12 mb-25" v-if="!computedHideCountDown">
              <div class="row__label mb-9">{{ $t('fa2_google_code_mobile') }}</div>
              <div class="row__input" >
                <input
                  v-model="form.google_code"
                  maxlength="6"
                  class="input-validate mr-14">
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
      form: {
        code: '',
        google_code: ''
      }
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
    openOrClose: {
      type: Boolean,
      default: true
    },
    hideCountDown: {
      type: Boolean,
      default: false
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
    },
    computedHideCountDown () {
      return this.hideCountDown
    }
  },
  watch: {
    open (val) {
      this.code = ''
    }
  },
  methods: {
    ensure () {
      this.ensureCallback()
    },
    getVerifyCode () {
      return this.getCode()
    },
    clickBackdrop () {
      if (this.backdrop) {
        this.$emit('update:open', false)
        this.$emit('close')
        this.form = {}
        this.openOrClose = true
      }
    },
    close () {
      this.$emit('update:open', false)
      this.$emit('close')
      this.form = {}
      this.openOrClose = true
    },
    codeChange () {
      console.log(this.form, 'code')
      this.$emit('update:code', this.form)
      this.openOrClose = true
    },
    onInput () {
      // let code = this.code
      // if (code && code.length === 6 && /^\d{6}$/.test(code)) {
      //   this.$nextTick(() => {
      //     this.ensure()
      //   })
      // }
    }
  }
}
</script>
<style scoped lang="scss">
@import "./verify-modal.scss";
</style>
