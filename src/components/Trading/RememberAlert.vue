<template>
  <v-modal
    :open="canOpen"
    :bg-color="bgColor">
    <template>
      <div class="modal-container">
        <div class="title">
          {{ $t('gentle_hint') }}
        </div>
        <div class="body">
          {{ $t('rate_tips_i', {currery: curreryCoin}) }}
        </div>
        <v-btn
          class="btn"
          fontsize="14"
          height="40"
          @click="close"
          :label="$t('confirm')"/>
      </div>
    </template>

    <template slot="close">
      <a
        class="custom-close-btn"
        @click.prevent="closeLong">
        <input
          type="checkbox"
          class="ckbox">
        <span style="margin-left: 2px;">{{ $t('no_alert_again') }}</span>
      </a>
    </template>

  </v-modal>
</template>


<script>
import { local } from '@/modules/store'
export default {
  name: 'RememeberAlert',
  props: {
    open: {
      type: Boolean,
      default: false
    },
    content: {
      type: String,
      default: 'rate_tips_g'
    },
    bgColor: {
      type: String,
      default: '#283B4C'
    },
    localKey: {
      type: String,
      default: 'ixAlert'
    },
    curreryCoin: {
        type: String,
        default: ''
    }
  },
  computed: {
    canOpen () {
      return this.open && !local[this.localKey]
    }
  },
  methods: {
    close () {
      this.$emit('update:open', false)
    },
    closeLong () {
      local[this.localKey] = true
      this.close()
    }
  }
}
</script>
<style scoped lang="scss">

  .custom-close-btn {
    height: 40px;
    width: auto;
    position: absolute;
    right: 22px;
    top: 22px;
    background: none;
    // line-height: 40px;
    filter: grayscale(100%);
    color: #A6BED3;
    transition: opacity 300ms;
    z-index: 1000;
    .ckbox {
      outline: none;
      // appearance: none;
      display: inline-block;
      vertical-align: middle;
      margin-bottom: 2px;
    }
    &:hover {
      opacity: .7;
    }
  }
  .modal-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 22px 38px;

    .title {
      font-size:20px;
      font-weight:bold;
      color:rgba(255,255,255,1);
      // line-height:45px;
    }
    .body {
      font-size:14px;
      font-weight:400;
      color:rgba(203,203,203,1);
      line-height:24px;
      margin-top: 25px;
      width: 338px;
      text-align: center;
    }
    .btn {
      width: 340px;
      height: 40px;
      margin-top: 38px;
    }
  }
</style>
