
import isEmpty from 'lodash/isEmpty'

export default {
  computed: {
    pairInfo () {
      if (this.state.ct.pairInfo) {
        return this.state.ct.pairInfo
      }
      return {}
    },
    symbol () {
      return this.pairInfo
    }
  }
}
