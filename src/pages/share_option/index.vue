<template>
  <div class="share-option-wrap">
    <div class="share-option-bg" />
    <share-option-nav/>
    <div class="share-option" flex="main:justify cross:strech">
    <div class="left-side-bar">
      <div v-for="(item,key) in mapComponentNames" :key="key" :class="{active:drawerIsOpen && activeName === key}" @click="handleClickTab(key)">
        <svg-icon :icon-class="item.icon"  style="font-size:24px" />
        <!-- <svg-icon :icon-class="xianhuozhishu_huise"  style="font-size:24px" /> -->
        <p>{{ item.value }}</p>
      </div>
    </div>
    <transition name="fade" @after-leave="afterLeaveOrEnter" @enter="afterLeaveOrEnter">
      <div v-if="drawerIsOpen" class="left-drawer">
        <div slot="title" flex="cross:center main:justify" style="height:40px">
          <p>最新价格<span class="share-text-info" style="font-size:12px;">(USDT/USD)</span></p>
        </div>
        <component :is="temComponet" />
        <i class="el-icon-close" @click="drawerIsOpen = false" />
      </div>
    </transition>
    <div class="content" flex="dir:bottom">
      <charts-dynamic-update ref="dynamic-charts" style="width:100%" class="dynamic-update" />
      <ul class="time-tab" flex="main:justify cross:center box:mean">
        <li class="active">2m</li>
        <li>5m</li>
        <li>15m</li>
        <li>30m</li>
        <li>3h</li>
        <li>1d</li>
        <li>7d</li>
      </ul>
    </div>
    <!-- <charts-dynamic-update class="content" /> -->
    <div class="right-side-bar">
      <div class="content-top hover-scale">
        <p class="share-text-info"> 投资 </p>
        <input type="text" maxlength="8" value="10000">
        <div class="btn-group">
          <div> + </div>
          <div> - </div>
        </div>
      </div>
      <div class="content-center hover-scale" flex="dir:top main:justify cross:center box:mean">
        <div flex="main:center cross:center" class="center-info">
          <div class="share-text-info">
            <span>+70.16%</span>
            <p><svg-icon icon-class="clipboard" />0.71</p>
          </div>
        </div>
        <el-button class="center-btn success" :disabled="false" type="success" @click="addLabels('green')" @mouseover.native="dynamicChart.activeHover('success')" @mouseout.native="dynamicChart.disableHover('success')">看涨</el-button>
      </div>
      <div class="content-center hover-scale" flex="dir:top main:justify cross:center box:mean">
        <el-button class="center-btn danger" :disabled="false" type="danger" @click="addLabels('red')" @mouseover.native="dynamicChart.activeHover('danger')" @mouseout.native="dynamicChart.disableHover('danger')">看跌</el-button>
        <div flex="main:center cross:center" class="center-info">
          <div class="share-text-info">
            <span>+70.16%</span>
            <p><svg-icon icon-class="clipboard" />0.71</p>
          </div>
        </div>
      </div>
    </div>
    <div ref="square-container" class="square-container" flex="dir:top box:mean">
      <div class="text">看涨 <br><span>{{ up }}%</span></div>
      <div class="mark-box" flex="dir:top box:mean">
        <div class="top" :style="{height:up+'%'}" />
        <div class="bottom" />
      </div>
      <div class="text"><span>{{ 100-up }}%</span><br>看跌 </div>
    </div>
  </div>
  </div>
</template>
<script>
import chartsDynamicUpdate from './componets/dynamic-update'
import shareOptionNav from './componets/share-option-nav'
import websoketMixin from './soket'

export default {
  name: 'ShareOption',
  components: {
    chartsDynamicUpdate,
    shareOptionNav
  },
  mixins: [websoketMixin],
  data() {
    return {
      drawerIsOpen: false,
      activeName: '',
      temComponet: null,
      up: 100
    }
  },
  computed: {
    mapComponentNames() {
      return {
        'spot-index': {value:'现货指数',icon:'chart'},
        'history': {value:'历史记录',icon:'component'},
        // 'ranking-list': {value:'排行榜',icon:'xianhuozhishu_huise'},
        // 'teach-view': {value:'教学视频',icon:'xianhuozhishu_huise'},
      }
    },
    dynamicChart() {
      return this.$refs['dynamic-charts']
    }
  },
  created() {
    setInterval(() => {
      this.up = Math.ceil(Math.random() * 100)
    }, 1000)
  },
  methods: {
    handleClickTab(name) {
      if (this.activeName === name && this.drawerIsOpen) return
      this.drawerIsOpen = true
      this.activeName = name
      this.temComponet = require(`./componets/${name}.vue`).default
    },
    afterLeaveOrEnter(el) {
      this.$refs['square-container'].style.left = el.clientWidth + 75 + 'px'
      this.dynamicChart.chart.reflow()
    },
    addLabels(color) {
      this.dynamicChart.addLabels(color)
    }
  }
}
</script>
<style lang="scss" scope="this api replaced by slot-scope in 2.5.0+">
$--contract-table-bg: #0c1222;
$--share-bg-color:rgb(30, 38, 58);
$--share-border-color:rgba(105, 111, 128, 0.5);
$--color-success: #13ce66;
.share-option-wrap{
  position: relative;
  z-index: 0;
  background: url('./assets/bg-chart.png') no-repeat center bottom;
  .share-option-bg{
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background: rgba($color: $--contract-table-bg, $alpha: .9);
    z-index: -1;
  }
  .share-option-nav{
    // position: absolute;
    height: 60px;
    width: 100%;
    background: transparent
  }
  .share-option{
  height: calc(100vh - 60px);
  box-sizing: border-box;
  font-size: 13px;
  background-size: 100%;
  position: relative;
  z-index: 0;
  .left-side-bar{
    color: #6C7482;
    background: $--share-bg-color;
    width: 66px;
    text-align: center;
    border-right:1px solid $--share-border-color;
    line-height: 1.8;
    z-index: 4;
    &>div{
      padding: 10px 0;
      margin-bottom: 10px;
      &:hover{
        cursor: pointer;
      }
      &.active{
        background:#2C3343;
        color: #fff;
      }
    }
  }
  .left-drawer{
    width: 300px;
    background: $--share-bg-color;
    color: #D6DAE2;
    padding: 0 15px;
    border-right:1px solid $--share-border-color;
    position: relative;
    &>.el-icon-close{
      font-size: 26px;
      position: absolute;
      transition: all 0.5s ease;
      top: 10px;
      right: 10px;
      &:hover{
        transform: rotate(90deg);
        color: #fff;
        cursor: pointer
      }
    }
  }
  .content{
    position: relative;
    flex: 1;
    &>.dynamic-update{
      position: absolute;
      top: 0;
      right: 0;
      bottom: 40px;
    };
    &>.time-tab{
      height: 34px;
      text-align: center;
      background: #363E4F;
      line-height: 34px;
      color: #999;
      &>li{
        &.active,&:hover{
          box-shadow: 0 2px 0 0 #fff inset;
          background: #4F596D;
          color: #fff;
          cursor: pointer;
        }
      }
  }
    // background: rgba$--share-bg-color;
  }
  .right-side-bar{
    width: 160px;
    box-sizing: border-box;
    padding: 10px;
    .hover-scale{
      transition: all .5s;
      &:hover{
         transform: scale(1.05)
      }
    }
    .content-top{
      // background: $--share-bg-color;
      background: rgba($color:#ffffff, $alpha: .1);
      border-radius: 4px;
      box-sizing: border-box;
      .share-text-info{
        line-height: 26px;
        text-indent: 6px;
        color: #888;
      }
      input{
        background: transparent;
        border: none;
        width: 100%;
        height: 30px;
        line-height: 30px;
        font-size: 12px;
        letter-spacing: 1;
        outline: none;
        color: #ccc;
        text-indent: 6px;
      }
      .btn-group{
        display: flex;
        border-top: 1px solid rgb(41, 48, 63);
        &>div{
          flex: 1;
          text-align: center;
          line-height: 30px;
          color: #fff;
          user-select:none;
          &:first-child{
            border-right:1px solid rgb(41, 48, 63);
            border-bottom-left-radius:4px;
          }
          &:last-child{
            border-bottom-right-radius: 4px;
          }
          &:hover{
            background:#2C3343;
            color: #fff;
            cursor: pointer;
          }
        }
      }
    }
    .content-center{
      height: 200px;
      background: rgba($color: #fff, $alpha: .1);
      margin-top: 15px;
      border-radius: 6px;
      line-height: 26px;
      .center-info{
        width: 100%;
        text-align: center;
        &>.share-text-info{
          span{
            font-size: 20px;
            color: $--color-success
          }
        }
      }
      .center-btn{
        width:100%;
        box-sizing: border-box;
        padding: 0;
        border: none;
        &.success{
          border-top-left-radius:0;
          border-top-right-radius:0;
        }
        &.danger{
          border-bottom-left-radius:0;
          border-bottom-right-radius:0;
        }
      }
    }
  }
  .square-container{
    position: absolute;
    left:75px;
    top: 10px;
    bottom: 75px;
    opacity: .5;
    &>.text{
      flex: none;
      flex-basis: 40px;
      font-size: 12px;
      line-height: 20px;
      width: 26px;
      color: #ccc
    }
    &>.mark-box{
      &>.top{
        transition: all .5s ease-out;
        flex: none;
        border-top:5px solid rgba($color: rgb(0,0,0), $alpha: 0);
        z-index: 0;
        position: relative;
        border-bottom:5px solid rgba($color: rgb(116, 116, 116), $alpha: .2);
        // border-left:13px solid rgba($color: red, $alpha: .8);
        border-right:13px solid rgba($color: red, $alpha: .6);
        transform: translate(-13px,5px);
        &::before{
          content: '';
          position: absolute;
          top: -5px;
          height: 100%;
          left: 26px;
          border-top:5px solid rgba($color: rgb(0,0,0), $alpha: 0);
          border-bottom:5px solid rgba($color: rgb(0,0,0), $alpha: 0);
          border-left:13px solid rgba($color: rgb(68, 2, 2), $alpha: .6);
          // transform: translateX(13px);
        }
      }
      &>.bottom{
        // height:0px;
        border-top:5px solid rgba($color: rgb(0,0,0), $alpha: 0);
        z-index: -1;
        position: relative;
        border-bottom:5px solid rgba($color: rgb(116, 116, 116), $alpha: .6);
        // border-left:13px solid rgba($color: red, $alpha: .8);
        border-right:13px solid rgba($color: green, $alpha: .6);
        transform: translate(-13px,-5px);
        &::before{
          content: '';
          position: absolute;
          top: -5px;
          height: 100%;
          left: 26px;
          border-top:5px solid rgba($color: rgb(0,0,0), $alpha: 0);
          border-bottom:5px solid rgba($color: rgb(0,0,0), $alpha: 0);
          border-left:13px solid rgba($color: rgb(0, 36, 0), $alpha: .8);
          // transform: translateX(13px);
        }
      }
      // &.bottom{
      //   // height:10px;
      //   position: relative;
      //   z-index: -1;
      //   border-top:5px solid rgba($color: rgb(116, 116, 116), $alpha: 0);
      //   border-bottom:0;
      //   border-left:13px solid rgba($color: green, $alpha: .8);
      //   border-right:13px solid rgba($color: rgb(0, 36, 0), $alpha: .8);
      //   // transform: translateY(-10px);
      // }
    }
  }
  .test{
    position: fixed;
    left: 40%;
    // width: 200px;
    height: 200px;
    border-left: 10px solid red;
    border-right: 10px solid green;
    border-top: 10px solid steelblue;
    border-bottom: 10px solid hotpink;
    transform: skewY(45deg);
  }
  }
}
.fade-enter-active, .fade-leave-active {
  transition: all .5s ease-in-out;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  transform: translateX(-300px);
  z-index:0;
}
</style>
