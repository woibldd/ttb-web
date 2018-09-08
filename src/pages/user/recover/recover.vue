<template>
 <div class="page page-login recover-container">
    <div class="panel">
      <div class="title-wrap">
        <div class="panel-title" v-t="'if_forgot'"></div>
      </div>
      <form class="form" onsubmit="return false">
        <div :class="['field']">
          <div class="input-box">
            <div class="label">{{ $t('region_label') }}</div>
          </div>
        </div>
        <div class="field" >
          <div class="input-box">
            <div class="label">{{ $t('phone_number') }}</div>
            <input class="input item" type="text"
              name="phone"
              @focus="active('phone', true)" @blur="active('phone', false)"
              @input="input('phone')"
              :placeholder="$t('bind_phone_input')"
              :disabled="loading"
              v-model.trim="phone" />
          </div>
        </div>
        <div class="field recover__validate mt-17">
            <slide-validate></slide-validate>
        </div>
        <div class="field submit mt-16">
          <v-btn class="submit-btn" :label="$t('nextstep')"
            height="40"
            :loading="loading"
            :disabled="disableBtn"
            @click="nextstep"></v-btn>
        </div>
      </form>
    </div>
  </div>

</template>
<script>
import './recover.scss'
import slideValidate from '@/components/common/slide-validate/slide-validate.vue'
export default {
  name: 'recover',
  components: {
    slideValidate
  },
  data () {
    return {
      phone: '',
      loading: false,
      activeList: {
        'email': {
          active: false,
          qd: false,
          error: ''
        },
        'phone': {
          active: false,
          qd: false,
          error: ''
        }
      }
    }
  },
  computed: {
    disableBtn () {
      return false
    }
  },
  methods: {
    nextstep () {},
    input (field) {
      let text = this[field]
      this.activeList[field].qd = !!text
      this.errmsg = ''
    },
    active (field, active) {
      this.activeList[field].active = active
      if (field === 'password') {
        this.atPw = active
      }
    }
  },
  mounted () {

  }
}
</script>
