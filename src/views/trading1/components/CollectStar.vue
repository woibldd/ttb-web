<template>
  <div @click="toggleCollect">
    <span v-show="collected">
      <slot name="collected">已收藏</slot>
    </span>
    <span v-show="!collected">
      <slot name="uncollect">收藏</slot>
    </span>
  </div>
</template>

<script>
import _ from 'lodash'
import service from '@/modules/service'
import {state, actions} from '@/modules/store'

export default {
  name: 'collectStar',
  props: {
    pair: {
      required: true
    },
    color: {
      default: 'gray'
    }
  },
  data () {
    return {
      state,
      collected: false
    }
  },
  watch: {
    'state.userStatus' (status) {
      this.fetch()
    },
    collected () {
      if (this.collected) {
        actions.addLocalFavorite(this.pair)
      } else {
        actions.removeLocalFavorite(this.pair)
      }
    }
  },
  methods: {
    toggleCollect () {
      if (this.state.userStatus <= 0) {
        actions.setLoginBack({
          fullPath: this.$route.fullPath
        })
        this.$router.push({
          name: 'login'
        })
        return false
      }
      this.collected = !this.collected
      this.onChange()
    },
    async fetch () {
      if (this.state.userStatus <= 0) {
        this.collected = false
        return
      }
      await actions.updateFavorite()
      this.collected = _.findIndex(state.favorite.list, item => item.symbol === this.pair) > -1
    },
    async update () {
      if (this.collected) {
        service.collect({symbol: this.pair})
      } else {
        service.uncollect({symbol: this.pair})
      }
    },
    onChange () {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.update()
      }, 1000)
    }
  },
  created () {
    this.fetch()
  }
}
</script>
