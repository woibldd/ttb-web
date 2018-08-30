import gt from 'gt'
import _ from 'lodash'
import utils from '@/modules/utils'
import {state} from '@/modules/store'
import service from '@/modules/service'

export default {
  data () {
    return {
      gtResult: null,
      gtResetTime: 0
    }
  },
  methods: {
    gtInit () {
      this.gtPromise = this.gtCreate()
    },
    async gtCreate () {
      const res = await service.geetestBegin()
      if (res.code) {
        return false
      }
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          // 20秒未加载完极验
          resolve(false)
        }, 20000)
        gt({
          gt: res.data.gt,
          challenge: res.data.challenge,
          offline: !res.data.success,
          new_captcha: true,
          protocol: 'https://',
          product: 'bind',
          lang: utils.getGtLang(state.locale)
        }, (gtObj) => {
          this.gtObj = gtObj
          this.gtObj.onReady(function () {
            resolve(true)
          })
          this.gtObj.onError((e) => {
            utils.logE(e)
            this.gtReset()
            resolve(false)
          })
        })
      })
    },
    gtReset: _.throttle(async function () {
      this.gtResetTime += 1
      if (this.gtResetTime < 4) {
        this.gtObj.reset()
      } else {
        this.gtCrash()
      }
    }, 2000),
    gtRun () {
      return new Promise((resolve) => {
        this.gtObj.onSuccess(() => {
          this.gtResult = this.gtObj.getValidate()
          resolve(true)
          this.gtObj.reset()
        })
        this.gtObj.onClose(() => {
          resolve(false)
        })
        this.gtObj.verify()
      })
    },
    async gtCrash () {
      utils.alert(this.$i18n.t('geetest_went_wrong'))
      await utils.sleep(1600)
      window.location.reload()
    },
    async gtVerifier () {
      const init = await this.gtPromise
      if (!init) {
        await this.gtCrash()
        return false
      }
      const verify = await this.gtRun()
      if (!verify) {
        return false
      }
      const validate = this.gtResult || this.gtObj.getValidate()
      if (!validate) {
        await this.gtCrash()
        return false
      }
      return function (origParams) {
        const params = _.cloneDeep(origParams)
        params.geetest_challenge = validate.geetest_challenge
        params.geetest_validate = validate.geetest_validate
        params.geetest_seccode = validate.geetest_seccode
        return params
      }
    }
  },
  destroyed () {
    this.gtObj && this.gtObj.hide()
  }
}
