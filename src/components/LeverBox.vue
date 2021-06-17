<template>
  <div>
    <div :skin="state.skin" style="width: 360px;" class="pop-lever-box">
      <div class="title">
        <span>{{pair}}</span>
        <span v-html="$t('orderPopover.marginMode')"> 保证金模式 </span>
      </div>
      <div class="content">
        <div class="type">
          <div class="prow" flex="box:mean">
            <div 
              @click="mylever=0"
              :class="{active:+mylever===0}" 
              class="pbtn  mr-26"
              v-html="$t('contract_cal_full')">
              全仓
            </div>
            <div   
              @click="mylever=1"
              :class="{active:+mylever>0}"  
              class="pbtn"
              v-html="$t('contract_cal_step')">
              逐仓
            </div>
          </div>
          <div class="prow mt-20" v-html="$t('orderPopover.tip2')">
            注：调整保证金模式仅对当前合约生效。
          </div>
        </div>
        <div class="lever mt-20" v-if="+mylever>0">
          <div class="prow ">
            <div class=" pb-10" v-html="$t('lever')">杠杆</div>
            <div>
              <el-input-number style="width:100%;" v-model="mylever"  :min="0" :max="100" label="杠杆倍数"></el-input-number>
            </div>
          </div>
          <el-row :gutter="10" >
            <el-col class="mt-10"
              v-for="item in map" 
              :key="item"
              :span="6"> 
              <el-button 
                :class="['lbtn', {active: mylever==item}]"
                v-if="+item!==0"
                :type="mylever===item ? 'primary': ''"  
                @click="mylever=item">
                {{item}}x
              </el-button>
            </el-col>
          </el-row>  
        </div>
        <div class="confirm mt-10">
          <el-button 
            type="primary" 
            @click="leveragePreview"
            v-html="$t('otc_ziurec_20')">
            确定
          </el-button>
        </div>
      </div>
    </div>  
  </div>
</template>

<script>
import {state} from '@/modules/store'
export default {
  data() {
    return {
      state,
      mylever: this.lever
    }
  },
  props: {
    pair: {
      type: String,
      default: ''
    },
    lever: {
      type: Number,
      default: 0
    },
    map: {
      type: Array,
      default: []
    }
  },
  methods: { 
    leveragePreview() { 
      this.$emit('changeLever', this.mylever )
    }
  },
  created() {
    this.$eh.$on('lever-box-init', ()=>{ 
      this.mylever = this.lever
    })
  }
}
</script>

<style lang="scss"> 
.pop-lever-box { 
  .title {
    padding: 6px 0 10px 0;
    text-align: center;
  }
  .content {
    padding: 10px 0;
    .pbtn {
      position: relative;
      padding: 10px;
      border: 1px solid #DCDFE6;
      border-radius: 5px;
      text-align: center;
      cursor: pointer; 
      &.active {
        border-color: $primary;
        &::after {
          position:absolute;
          top: -6px;
          right: -6px;
          display: block;
          content: '';
          width: 20px;
          height: 20px;
          // background: url(~@/assets/site/fucoin/icon/selected.png) center center/20px 20px no-repeat;
        } 
      }
    }
    .lbtn {
      color: #484B51;
    }
  }
  .el-button {
    width: 100%;
    &.active { 
      border-color: $primary;
    }
  } 
  &[skin~='dark'] { 
    color: #ffffff;
    .content {
      .pbtn {
        border-color: #484B51;
        &.active {
          color: $primary;
          border-color: $primary;
        } 
      }
      .lbtn {
        color: $primary;;
      }
      .el-input-number {
        .el-input-number__decrease,
        .el-input-number__increase,
        .el-input input {
          background-color:transparent;
          border-color: #484B51;
          color: #ffffff;
        } 
      }
      .el-button {
        background-color: transparent;
        border-color: #484B51;
        color: #ffffff;
        &.active {
          color: $primary;
          border-color: $primary;
        }
      }
    }
  }
}
</style>