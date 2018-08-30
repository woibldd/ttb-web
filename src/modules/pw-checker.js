import _ from 'lodash'

const checkList = [
  {
    desc: 'pwcheck_gt8',
    checker (str) {
      return str.length >= 8
    }
  },
  {
    desc: 'pwcheck_upper',
    checker (str) {
      return str.match(/[A-Z]/)
    }
  },
  {
    desc: 'pwcheck_lower',
    checker (str) {
      return str.match(/[a-z]/)
    }
  },
  {
    desc: 'pwcheck_number',
    checker (str) {
      return str.match(/[0-9]/)
    }
  }
]
export default {
  getState (str) {
    return _.map(checkList, check => {
      return {
        desc: check.desc,
        pass: check.checker(str)
      }
    })
  }
}
