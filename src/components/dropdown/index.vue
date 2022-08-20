<template>
  <span class="drop-down-wrap">
    <slot />
    <ul
      class="menu-box"
      :style="{'min-width':menuMinWidth+'px'}">
      <li
        v-for="(item,index) in menuOptions"
        :key="index"
        flex="main:center"
        class="item"
        :class="{active:isActive(item)}"
        @click="handle(item,index)">
        <el-tooltip
          :disabled="!$attrs.tooltip"
          :content="handleLabel(item)"
          placement="left"
          effect="dark">
          <span class="text-nowrap"> <slot
            name="item-prefix"
            :data="item" /> {{ handleLabel(item) }}</span>
        </el-tooltip>
        <slot
          name="item-suffix"
          :data="item" />
          <!-- <span v-if="typeof item.describe === 'object'" @click="item.describe.click">{{ item.describe.label }}</span> -->
      </li>
    </ul>
  </span>
</template>
<script>
export default {
  model: {
    prop: 'active',
    event: 'change'
  },
  props: {
    menuOptions: {
      type: [Array, Object],
      default: () => []
    },
    menuMinWidth: {
      type: [Number, String],
      default: 'initial'
    },
    active: {
      type: [Object, String],
      default: () => ({})
    }
  },
  mounted () {
    console.log()
  },
  methods: {
    handle (item, index) {
      item.click && item.click(item) || this.$router.push({ path: item.path })
      this.$emit('change', item)
    },
    handleLabel (item) {
      if (this.$attrs['handle-label']) return this.$attrs['handle-label'](item)
      else if (this.$attrs.label) return item[this.$attrs.label]
      else return item
    },
    isActive (item) {
      return JSON.stringify(this.active) === JSON.stringify(item)
    }
  }
}
</script>
<style lang="scss" scoped="this api replaced by slot-scope in 2.5.0+">
.drop-down-wrap{
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
  i{
    transition: all .5s ease-in;
  }
  &:hover{
    color: $--color-primary;
    cursor: pointer;
    .menu-box{
      display: block;
    }
    i{
      transform: rotate(-180deg)
    }
  }
  .menu-box{
    // margin-top: -5px;
    position: absolute;
    top: 100%;
    display: none;
    background: $--contract-table-bd;
    box-shadow: 0 0 20px 0 rgba(69,97,137,.2);
    border-radius: 4px;
    display: block;
    box-sizing: border-box;
    position: absolute;
    z-index: 10;
    min-width: 100%;
    padding: 5px;
    display: none;
    z-index: 2001;
    &>.item{
      height: 40px;
      font-size: 14px;
      font-weight: 400;
      line-height: 40px;
      // background: #fff;
      white-space: nowrap;
      text-decoration: none;
      color: #999;
      padding: 0 10px;
      &:not(:last-child){
        border-bottom: 1px solid rgba(69,97,137,.2)
      }
      &:hover,&.active{
        color: $--color-primary
      }
      &>.text-nowrap{
        max-width: 160px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    // .menu{
    //   // margin-top: 20px;
    //   line-height: 32px;
    //   // background:#2B2B2B;
    //   // border-radius: 5px;
    //   text-indent: 10px;
    //   // color: #f0f0f0;
    //   // font-size: 14px;
    //   &>li{
    //     width: 100%;
    //     &.active,&:hover{
    //       color: #F5C109
    //     }
    //   }
    // }
  }

}

</style>
