import _ from 'lodash'
import {local} from '@/modules/store'

const configs = [{
  id: 'gr',
  up: '#09C989',
  down: '#F24E4D'
}, {
  id: 'rg',
  up: '#F24E4D',
  down: '#09C989'
}, {
  id: 'br',
  up: '#6075FF',
  down: '#F24E4D'
}, {
  id: 'yr',
  up: '#F7BE37',
  down: '#F24E4D'
}]

const vm = {
  styleEl: null,
  inited: false,
  curIndex: null,
  init () {
    vm.styleEl = document.createElement('style')
    document.head.appendChild(vm.styleEl)
  },
  set (id = local.upDown) {
    if (!vm.inited) {
      vm.init()
    }
    const findId = _.findIndex(configs, item => item.id === id)
    const curIndex = findId > -1 ? findId : 0
    if (curIndex === vm.curIndex) {
      return 'No change'
    }

    if (configs[vm.curIndex]) {
      document.body.classList.remove(configs[vm.curIndex].id)
    }
    vm.curIndex = curIndex
    const config = configs[vm.curIndex]
    // document.body.classList.add(config.id)

    const styleList = []
    styleList.push(`.color-up { color: ${config.up} !important; }`)
    styleList.push(`.bgcolor-up { background-color: ${config.up} !important; }`)
    styleList.push(`.color-down { color: ${config.down} !important; }`)
    styleList.push(`.bgcolor-down { background-color: ${config.down} !important; }`)
    vm.styleEl.innerHTML = styleList.join('\n')
    local.upDown = configs[vm.curIndex].id
  },
  getId () {
    return vm.curIndex
  },
  getStyle () {
    return configs[vm.curIndex]
  },
  getConfigs () {
    return configs
  },
  getRgba (color, alpha) {
    let sColor = color.toLowerCase()
    let reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/
    if (sColor && reg.test(sColor)) {
      if (sColor.length === 4) {
        let sColorNew = '#'
        for (let i = 1; i < 4; i += 1) {
          sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1))
        }
        sColor = sColorNew
      }
      let sColorChange = []
      for (let i = 1; i < 7; i += 2) {
        sColorChange.push(parseInt('0x' + sColor.slice(i, i + 2)))
      }
      return 'rgba(' + sColorChange.join(',') + ', ' + alpha + ')'
    }
  }
}

export default vm
