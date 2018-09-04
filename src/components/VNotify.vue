<template>
  <div class="notify-wrap" @mouseenter="pause" @mouseleave="play">
    <div class="notify-panel" :class="[show ? 'show' : '']" ref="panel">
      <!-- <div class="notify-icon" :class="style">
        <icon class="icon-default" :name="getIconName(style)"/>
      </div> -->
      <div class="notify-box" :class="['bg-' + style]">
        <div class="notify-info" :class="{h: !title || !content}">
          <div class="title" v-show="title">{{ title }}</div>
          <div class="content" v-show="content">{{ content }}</div>
        </div>
        <div class="notify-close-icon" @click.prevent.stop="close">
          <icon class="icon-default" name="guanbi"/>
        </div>
      </div>
      <!-- <div class="notify-control" :class="'type-' + type">
        <a class="notify-control-btn notify-close" @click.prevent.stop="close">{{ $t('close') }}</a>
        <a class="notify-control-btn notify-confirm" v-if="type === 1" @click.prevent.stop="confirm">{{ $t('confirm') }}</a>
      </div> -->
    </div>
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  name: 'vNotify',
  props: ['options'],
  data () {
    return {
      show: true,
      timer: null
    }
  },
  computed: {
    // type () {
    //   return this.options.type || 0
    // },
    style () {
      return this.options.style || 'info'
    },
    title () {
      return this.options.title || ''
    },
    content () {
      return this.options.content || ''
    },
    duration () {
      // return this.type === 0 ? (this.options.duration || 3000) : 0
      return this.options.duration || 3000
    }
  },
  mounted () {
    this.$nextTick(() => {
      setTimeout(this.comeIn, 20)
    })
    // this.$eh.$once('app:keyup:enter', this.confirm)
    this.$eh.$once('app:keyup:esc', this.close)
  },
  methods: {
    // getIconName (style) {
    //   return {
    //     success: 'pass',
    //     info: 'info',
    //     fail: 'wow-red',
    //     danger: 'wow-red'
    //   }[style]
    // },
    pause () {
      // if (this.type === 0) {
      //   clearTimeout(this.timer)
      // }
      clearTimeout(this.timer)
    },
    play () {
      // if (this.type === 0) {
      //   this.timer = setTimeout(this.close, this.duration)
      // }
      this.timer = setTimeout(this.close, this.duration)
    },
    comeIn () {
      this.show = true
      // if (this.type === 0) {
      //   this.timer = setTimeout(this.close, this.duration)
      // }
      this.timer = setTimeout(this.close, this.duration)
    },
    destroy () {
      // 高度减为0，清除监听器，销毁
      this.$el.removeEventListener('transition', this.destroy)
      this.$emit('destroy')
    },
    out () {
      this.$el.removeEventListener('animationend', this.out)
      this.$el.addEventListener('transitionend', this.destroy)
      this.$el.style.height = 0
    },
    close () {
      clearTimeout(this.timer)
      this.show = false
      this.options.active = false
      this.$el.style.height = this.$el.getBoundingClientRect().height + 'px'
      this.$el.addEventListener('animationend', this.out)
      this.answer(false)
    },
    answer (a) {
      if (!this.end && _.isFunction(this.options.answer)) {
        this.options.answer(a)
      }
    // },
    // confirm () {
    //   this.answer(true)
    //   this.close()
    }
  }
}
</script>

<style scoped lang="scss">
@import "../styles/vars";
@import "../styles/mixins";

.notify-wrap {
  transition: height 600ms;
  box-sizing: border-box;
}
.notify-panel {
  box-shadow: fade-out(black, .9) 0 4px 12px;
  margin-bottom: 20px;
  animation: 600ms 1 forwards slideOut;
  &.show {
    animation: 600ms 1 forwards slideIn;
  }
  .notify-box{
    position: relative;
    width:100%;
    padding:0 20px;
    box-sizing: border-box;
    border-radius: 3px;
    opacity: 0.95;
    transition: 0.2s linear;
    &.bg-danger{
      background:rgba(226, 92, 68, 0.95);
    }
    &.bg-danger:hover{
      background:rgba(226, 92, 68, 0.75);
    }
    &.bg-info{
      background:rgba(96, 117, 255, 0.95);
    }
    &.bg-info:hover{
      background:rgba(96, 117, 255, 0.75);
    }
    &.bg-warning{
      background:rgba(247, 190, 55, 0.95);
    }
    &.bg-warning:hover{
      background:rgba(247, 190, 55, 0.75);
    }
    &.bg-success{
      background:rgba(13, 179, 126, 0.95);
    }
    &.bg-success:hover{
      background:rgba(13, 179, 126, 0.75);
    }
    &:hover{
      .title{
        opacity: 0.8;
      }
      .content{
        opacity: 0.8;
      }
    }
  }
  .notify-info {
    text-align: left;
    width: 320px;
    padding: 15px 0;
    .title {
      font-weight: bold;
      color: #fff;
      font-size: 14px;
      line-height: 20px;
      transition: 0.2s linear;
    }
    .content {
      margin-top: 2px;
      font-size: 13px;
      line-height: 18px;
      transition: 0.2s linear;
    }
  }
  .notify-close-icon{
    position: absolute;
    top:10px;
    right:12px;
    color:#fff;
    cursor: pointer;
    .iconfont{
      font-size: 13px;
      padding:8px;
      opacity: .5;
    }
    &:hover{
      background:rgba(255,255,255,0.04);
    }
  }
}
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translate(100%, 0);
  }
  to {
    opacity: 1;
    transform: translate(0, 0);
  }
}
@keyframes slideOut {
  from {
    opacity: 1;
    transform: translate(0, 0);
  }
  to {
    opacity: 0;
    transform: translate(100%, 0);
  }
}
</style>
