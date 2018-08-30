import Big from 'big.js'
import consts from '@/libs/consts'
import utils from '@/modules/utils'

export default {
  data () {
    return {
      debug: false,
      C: consts
    }
  },
  methods: {
    $big: Big,
    log () {
      if (this.debug) {
        utils.log.apply(null, arguments)
      }
    }
  }
}
