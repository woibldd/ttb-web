<template>
  <div class="menu-list-warp">
    <ul v-for="(item,key) in mapMenuList" :key="key" class="menu-list">
      <li class="title"><i class="el-icon-document" /> {{ item.label }}</li>
      <li v-for="(v,k) in item.children" :key="k" :class="{'background-active':active === `${key}.${k}`}" @click="$emit('change',`${key}.${k}`)">
        <span>{{ v.label || v }}</span>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  model: {
    prop: 'active',
    event: 'change'
  },
  props: {
    mapMenuList: {
      type: [Object, Array],
      default: () => []
    },
    active: {
      type: String,
      default: ''
    }
  },
  beforeMount() {
    this.$emit('change', this.active)
  },
  methods: {
  }
}
</script>
<style lang="scss" scoped>
.menu-list-warp{
  background: #fff;
  .menu-list{
    line-height: 40px;
    &>li{
      border-top: 1px solid $border-color-lighter;
      &:first-child{
        color: #bbb;
        text-indent: 12px
      }
      &:not(:first-child){
        cursor: pointer;
        text-align: center;
      }
      &:not(.background-active):not(:first-child):hover{
        color: #666;
        background: #fafafa
      }
    }
  }
}
.menu-list{
  // border: 1px solid $border-color-lighter;

  // &>li{
  //   line-height: 40px;
  //   height: 40px;
  //   border: 1px solid $border-color-lighter;
  //   text-align: center;
  //   color: #999;
  //   cursor: pointer;
  //   &:not(:first-child){
  //     border-top: none;
  //   }
  //   &:not(.active):hover{
  //     color: #333;
  //     background: #fafafa
  //   }
  //   &.active{
  //     box-shadow: inset 3px 0 0 0 $--color-primary;
  //     background: $--background-active-bg;
  //   }
  // }
}
</style>
