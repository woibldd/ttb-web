import _ from 'lodash'
import Vue from 'vue'
import utils from '@/modules/utils'

class Session {
  constructor (id, initData) {
    return this.init(id, initData)
  }

  static clear (id) {
    window.sessionStorage.removeItem('store_' + id)
  }

  init (id, initData) {
    id = 'store_' + id
    let local = new Vue({
      data () {
        let data = initData
        _.assign(data, this.load())
        utils.log('sessionStorage', id, data)
        return {
          data
        }
      },
      methods: {
        save () {
          window.sessionStorage.setItem(id, JSON.stringify(this.data))
        },
        load () {
          try {
            return JSON.parse(window.sessionStorage.getItem(id))
          } catch (e) {
            return {}
          }
        }
      },
      created () {
        this.$watch('data', (n) => {
          this.save()
          utils.log(id + ' session saved')
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

export default Session
