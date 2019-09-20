<template>
  <span class="drop-down-wrap">
    <slot></slot>
    <div class="menu-box">
      <ul class="menu">
          <router-link v-for="(item,index) in menuOptions" :to="item.href" :key="index" tag="li">
            {{item.label}}
          </router-link>
        <!-- <li v-for="(item,index) in menuOptions" @click="handle(item)" :key="index">{{item.label}}</li> -->
      </ul>
    </div>
  </span>
</template>
<script>
export default {
  props:['menuOptions'],
  methods: {
    handle(item){
      console.log(item.href);
      this.$router.push({path:'/snowball/bazaar'})
    }
  }
}
</script>
<style lang="scss" scope="this api replaced by slot-scope in 2.5.0+">
.drop-down-wrap{
  &:hover{
    .menu-box{
      display: block;
      // height: auto;
    }
  }
  .menu-box{
    margin-top: -5px;
    position: absolute;
    z-index: 1000;
    padding-top: 24px;
    min-width: 100px;
    // transition: all 1s ease-in-out;
    display: none;
    // height: 0;
    .menu{
      // margin-top: 20px;
      line-height: 32px;
      background:#2B2B2B;
      border-radius: 5px;
      text-indent: 10px;
      color: #f0f0f0;
      font-size: 14px;
      &>li{
        width: 100%;
        &.active,&:hover{
          color: #01CED1
        }
      }
    }
  }
  
}
  
</style>