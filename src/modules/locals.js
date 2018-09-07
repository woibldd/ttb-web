import _ from 'lodash'
import utils from '@/modules/utils'
import Vue from 'vue'

class Locals {
  constructor (id, initData) {
    return this.init(id, initData)
  }

  static clear (id) {
    window.localStorage.removeItem('store_' + id)
  }

  init (id, initData) {
    id = 'store_' + id
    let local = new Vue({
      data () {
        let data = initData
        _.assign(data, this.load())
        // utils.log('localStorage', id, data)
        return {
          data
        }
      },
      methods: {
        save () {
          window.localStorage.setItem(id, JSON.stringify(this.data))
        },
        load () {
          try {
            return JSON.parse(window.localStorage.getItem(id))
          } catch (e) {
            return {}
          }
        }
      },
      created () {
        this.$watch('data', (n) => {
          this.save()
          // utils.log(id + ' locals saved')
        }, {
          immediate: true,
          deep: true
        })
      }
    })
    this.data = local.$data.data
    return this.data
  }
}

export default Locals
