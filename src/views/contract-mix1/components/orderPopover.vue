<template>
  <div
    v-loading="false"
    class="hold-content"
    element-loading-background="rgba(0, 0, 0, 0.3)">
    <div class="content-container-hold text-info">
      <div>{{ hander }}</div> 
      <div> 
        <div
          flex="main:justify cross:center"
          class="text-light mt-10">
          <span>{{ $t('contract_lever_times') }}：{{ active === '0'? $t('contract_cal_full'):active+'x' }}</span> 
        </div>
        <div
          v-if="!onlyLever"
          class="divider-line-info"
          style="background:#333" /> 
      </div>
      <div v-if="!onlyLever"> 
        <div class="table-box">
          <div
            v-for="(value,key) in mapTableColumns[activeType]" 
            :key="key"
            class="row-box" 
            flex="box:mean"> 
              <span>{{ $tR(`mapTableColumns.${activeType}.${key}`,{active:active === '0'?$t('contract_cal_full'):active+'x'}) }}</span> 
              <span v-if="key==='difference'">{{`(${formValueObj['differenceb']})`}} {{ +formValueObj[key]*100| round(2) }}%</span>
              <span v-else-if="['market','available', 'liqPrice', 'value' ].includes(key)">{{ +formValueObj[key] | round(2) }} USDT</span>
              <span v-else>{{ formValueObj[key] }}</span>
          </div>
        </div>
        <!-- <div class="divider-line-info" style="background:none" /> -->
        <div
          flex="box:mean"
          style="margin-top:22px">
          <el-button 
            :type="state.skin==='light' ? '': 'dark'" 
            plain
            @click="$emit('command')">{{ $t('cancel') }}</el-button>
          <el-button
            :type="type"
            v-preventReClick
            @click="$emit('command',true)">{{ $t('confirm') }}</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { setLeveragePreview } from '@/modules/api/contractMix'
import { toRound } from '@/utils/handleNum'
import { state } from '@/modules/store'
import mixins from '@/mixins/index'
export default {
  name: 'OrderPopover',
  mixins: [mixins],
  model: {
    prop: 'active',
    event: 'change'
  },
  props: {
    data: {
      type: Array,
      default: () => []
    },
    active: {
      type: [String, Number],
      default: ''
    },
    type: {
      type: String,
      default: 'success'
    },
    formValueObj: {
      type: Object,
      default: () => {}
    },
    loading: {
      type: Boolean,
      default: false
    },
    onlyLever: {
      type: Boolean,
      default: false
    },
    activeProduct: {
      type: Object,
      default: () => ({})
    },
    activeType: {
      type: [Number, String],
      default: 1
    },
    hander: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      state,
      input: '',
      isSeting: false,
      inputVisible: false,
      sliderValue: +this.active,
      popoverVisible: false,
      checked: false,
      activeTag: '',
      leverageTipObj: {},
      showEdit: false,
      leverageLoading: false
    }
  },
  computed: {
    mapTableColumns () {
      return this.langData.mapTableColumns
    },
    calcData () {
      const arr = this.data
      return [arr[arr.length - 1]].concat(this.data.slice(0, this.data.length - 1))
      // return Object.values(this.data).reduce((prev, curr, index) => {
      //   prev[index * 10] = curr + 'x'
      //   return prev
      // }, {})
    }

  },
  watch: {
    // active: {
    //   handler(newValue) {
    //     this.sliderValue = !+this.active ? +this.data[this.data.length - 2] : +this.active
    //   }
    // }
  },
  methods: {
    leveragePreview (tag) {
      return setLeveragePreview({ name: this.activeProduct.name, leverage: tag }).then(res => {
        this.leverageTipObj = res.data
        this.leverageTipObj.leverage = +this.leverageTipObj.leverage === 0 ? 100 : this.leverageTipObj.leverage
        this.leverageTipObj.margin_position = toRound(this.leverageTipObj.margin_position, 8)
        this.leverageTipObj.margin_delegation = toRound(this.leverageTipObj.margin_delegation, 8)
      })
    },
    handleInput (value) {
      // if (!value || +value) return
      this.input = value.replace(/^(0+)|[^\d^.]+/g, '')
      const data = this.data
      const decimals = this.input.split('.')[1]
      if (decimals && decimals.length > 1) this.input = this.bigRound(this.input, 1)
      if (+this.input >= +data[data.length - 2]) this.input = data[data.length - 2]
    },
    cancelClick () {
      this.activeTag = ''
      this.popoverVisible = false
    },
    confirmClick () {
      this.popoverVisible = false
      // this.this.activeTag
      this.$emit('change', this.activeTag)
      // this.activeTag = this.active
      this.activeTag = ''
      this.showEdit = false
    },
    handleActive (tag) {
      this.activeTag = tag
      this.leverageLoading = true
      this.leverageLoading = false
      this.leveragePreview(tag).then(res => {
        if (+this.leverageTipObj.margin_position === 0) {
          this.confirmClick()
          return
        }

        if (this.$root.modelVisible) {
          this.popoverVisible = true
          return
        }
        this.$confirm(this.$tR('tip', this.leverageTipObj), '修改杠杆', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          dangerouslyUseHTMLString: true,
          lockScroll: false
        }).then(this.confirmClick).catch(this.cancelClick)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.hold-content{
  line-height: 30px;
  &>.content-container-hold{
    font-size: 12px;
    padding: 0 8px;
    &>*{
      margin-top: 6px;
    }
    &>.linear-bar{
      position: relative;
      box-sizing: border-box;
      height: 30px;
      background: linear-gradient(90deg, $--color-success 0%, $--color-danger 100%);
      padding:0 8px;
      &>.mark{
        position: absolute;
        padding-left: 10px;
        height: 100%;
        line-height: 30px;
        border-left: 1px solid #fff;
        left: 20%;
      }
      .tag-item{
        cursor: pointer;
        &:hover{
          background: $--color-primary
        }
      }
    }
    &>.multiple-bar{
      // margin-top: 40px;
      line-height: 24px;
      .dot-box{
        margin-top: 8px;
        position:relative; 
        &>.line{
          border-top:2px solid #D4D4D4;
          height:0;
          position:absolute;
          left:10px;
          right:10px;
          top: 10.5px;
        }
        &>li{
          height: 40px;
          min-width: 22px;
          cursor: pointer;
          position:relative;
          z-index: 1;
          text-align: center;
          color: #D4D4D4;
          &:hover>*,&.active>*,&.previewActive>*{
            transform: scale(1.5);
            text-shadow: 0 0 3px $--color-primary
          }
        }
      }
      .input-box{
        margin-top: 8px;
        &>input{
          line-height: 24px;
          // font-size: 14px;
          border: 1px solid $--border-info;
          flex: 1;
          color: #d7d7d7;
          text-indent: 5px;
          background: none
        }
        &>div{
          width: 26px;
          line-height: 26px;
          text-align: center;
          opacity: .8;
          &:hover{
            cursor: pointer;
            opacity: 1;
          }
          &:nth-child(2){
            background: $--color-danger;
          }
          &:last-child{
            background: $--color-success;
          }
        }
      }
      text-align: left
    }
    &>.table-wrap{
      border:1px solid #ccc;
      text-align: center
    }
    .table-box{
      border: 1px solid #222;
      .row-box {
        border-bottom: 1px solid #222;
        &:last-child {
          border: none;
        }
        &>span{
          text-indent: 5px;
          &:first-child{
            // border-bottom: 1px solid;
            border-right: 1px solid #222;
          }
        } 
      } 
    }
  }
}

</style>
