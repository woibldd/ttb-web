<template>
  <div class="notify-wrap">
    <div class="notify-list-wrap">
      <v-notify
        v-for="(notify, index) in notifyList"
        :options="notify"
        :key="notify.id"
        @destroy="destroy(index)">
      </v-notify>
    </div>
    <div class="notify-backdrop" v-show="confirming"></div>
  </div>
</template>

<script>
import _ from 'lodash'
import utils from '@/modules/utils'
import VNotify from './VNotify'

export default {
  name: 'vNotifyList',
  components: {
    VNotify
  },
  data () {
    return {
      notifyList: []
    }
  },
  computed: {
    confirming () {
      return _.find(this.notifyList, notify => notify.type === 1 && notify.active)
    }
  },
  methods: {
    destroy (index) {
      this.notifyList.splice(index, 1)
    }
  },
  created () {
    this.$eh.$on('app:notify', (options) => {
      if (options.id && _.find(this.notifyList, item => item.id === options.id)) {
        // 去重
        utils.logI('repeat toast: ' + options.id + new Date())
        return false
      }
      options.id = options.id || _.uniqueId()
      options.close = 0
      this.notifyList.push(options)
    })
  },
  destroyed () {
    this.$eh.$off('app:notify')
  }
}
</script>

<style scoped lang="scss">
.notify-list-wrap {
  min-width: 360px;
  box-sizing: border-box;
  border-radius: 4px;
  // border: 1px solid #ebeef5;
  position: fixed;
  left: 50%;
  top: 20px;
  transform: translateX(-50%);
  // background-color: #edf2fc;
  transition: opacity .3s,transform .4s;
  overflow: hidden;
  // padding: 15px 15px 15px 20px;
  display: flex;
  align-items: center;
  z-index: 90000;
}
.notify-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0, .5);
  z-index: 89999;
}
</style>
