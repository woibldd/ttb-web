<template>
  <div
    v-loading="false"
    class="hold-content"
    element-loading-background="rgba(0, 0, 0, 0.3)"> 
    <div class="content-container-hold text-info"> 
      <div>{{ hander }}</div> 
      <div
        class="linear-bar text-light"
        flex="main:justify cross:center">
        <!-- <svg-icon icon-class="money" /> -->
        <svg-icon v-if="state.locale==='zh-CN'" icon-class="money-cn" v-tooltip.top-center="{content: $t('contract_newest_deal_price'), classes: 'contract'}"/>
        <svg-icon v-else icon-class="money-en" v-tooltip.top-center="{content: $t('contract_newest_deal_price'), classes: 'contract'}"/>
        <!-- <img
          src="~@/assets/contract/icon-risk-money.png"
          v-tooltip.top-center="{content: $t('contract_newest_deal_price'), classes: 'contract'}"
          alt=""> -->
        <!-- <i class="el-icon-warning" /> -->
        <img
          src="~@/assets/contract/icon-risk-alert.png"
          v-tooltip.left="{content: $t('contract_max_lever') + calcData[calcData.length-1]+'x', classes: 'contract'}"
          alt="">
        <div class="mark">{{ active == '0'?$t('contract_cal_full'):active+'x' }}</div>
      </div>

      <div class="multiple-bar">
        <div
          flex="main:justify cross:center"
          class="text-light">
          <span>{{ $t('contract_lever_times') }}：{{ active === '0'? $t('contract_cal_full'):active+'x' }}</span>
          <i
            class="el-icon-edit hover-point"
            @click="showEdit=!showEdit" />
        </div>
        <el-popover
          ref="popover"
          v-model="popoverVisible"
          placement="top"
          width="360"
          trigger="manual">
          <p>
            <span
              v-if="+leverageTipObj.margin_position"
              v-html="$tR('tip',leverageTipObj)" />
            <span
              v-else
              v-html="$tR('leverageTip',leverageTipObj)" />
          </p>
          <hr>
          <div flex="main:justify dir:right cross:center">
            <div>
              <el-button
                size="mini"
                type="text"
                @click="cancelClick">{{ $t('cancel') }}</el-button>
              <el-button
                type="primary"
                size="mini"
                v-preventReClick
                @click="confirmClick">{{ $t('confirm') }}</el-button>
            </div>
          </div>
          <div slot="reference">
            <ul
              v-if="!showEdit"
              v-loading="leverageLoading"
              element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(0, 0, 0, 0.5)"
              flex="main:justify"
              class="dot-box"
            >
              <div class="line" />
              <li
                v-for="tag in calcData"
                :key="tag"
                flex="dir:top main:justify"
                :class="[active == tag && 'active'||'',activeTag === tag && 'previewActive']"
                @click="handleActive(tag)">
                <div style="font-size:32px;text-align:center">•</div>
                <div>{{ tag === '0'?$t('contract_cal_full'):tag+'x' }}</div>
              </li>
            </ul>
            <div
              v-else
              slot="reference"
              class="input-box text-light"
              flex="main:justify cross:strech">
              <input
                v-model="activeTag"
                :min="1"
                :max="calcData[calcData.length-1]"
                type="number"
                autofocus="autofocus">
              <div @click="showEdit=!showEdit"><i class="el-icon-close" /></div>
              <div @click="handleActive(activeTag)"><i class="el-icon-check" /></div>
            </div>
          </div>
        </el-popover>
        <div
          v-if="!onlyLever"
          class="divider-line-info"
          style="background:#333" />
          <!-- <el-divider content-position="center"> <span style="font-size:12px" class="text-nowrap">{{ $tR(`setLever`) }}</span> </el-divider>
        <div :flex="$attrs.flex || 'main:justify cross:center'" style="margin-top:30px">
          <el-input-number v-model="sliderValue" :min="1" :max="100" size="mini" :style="{width: !onlyLever ? '100px':'100%'}" @change="handleSliderChange" />
          <el-popover ref="popover" v-model="popoverVisible" placement="top" width="270" trigger="manual" @show="leveragePreview">
            <p>
              <span v-if="+leverageTipObj.margin_position" v-html="$tR('tip',leverageTipObj)" />
              <span v-else v-html="$tR('leverageTip',leverageTipObj)" />
            </p>
            <hr>
            <div flex="main:justify dir:right cross:center">
              <div>
                <el-button size="mini" type="text" @click="cancelClick">{{ $t('cancel') }}</el-button>
                <el-button type="primary" size="mini" @click="handleTagClick">{{ $t('confirm') }}</el-button>
              </div>
            </div>
            <div slot="reference" flex="main:justify">
              <template v-if="!onlyLever">
                <el-tag v-for="tag in data" :key="tag" style="cursor: pointer;" size="mini" :type="activeTag ===tag && 'warning'||''" :effect="active === tag && 'dark'||'plain'" @click="handleActive(tag)">
                  {{ tag === '0'?$tR('allstorehouse'):tag+'x' }}
                </el-tag>
              </template>
              <template v-else>
                <el-link v-for="tag in data" :key="tag" :underline="false" :class="active ===tag && 'text-active'||''" :type="activeTag ===tag && 'warning'||''" @click="handleActive(tag)">{{ tag === '0'?$tR('allstorehouse'):tag+'x' }}</el-link>
              </template>
            </div>
          </el-popover>
        </div>
        <el-slider v-model="sliderValue" @change="handleSliderChange" /> -->
      </div>
      <div v-if="!onlyLever">
        <div
          v-for="(value,key) in mapTableColumns[activeType]"
          :key="key"
          class="table-box"
          flex="box:mean">
          <span>{{ $tR(`mapTableColumns.${activeType}.${key}`,{active:active === '0'?$t('contract_cal_full'):active+'x'}) }}</span>
          <span v-if="key==='7'">{{ +formValueObj[key]*100|bigRound(2) }}%</span>
          <span v-else>{{ ['4','5'].includes(key)?formValueObj[key]:bigRound(formValueObj[key],key==='6'?2:8) }}</span>
        </div>
        <!-- <div class="divider-line-info" style="background:none" /> -->
        <div
          flex="box:mean"
          style="margin-top:22px">
          <el-button @click="$emit('command')">{{ $t('cancel') }}</el-button>
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
export default {
  name: 'OrderPopover',
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
      type: Number,
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
        if  (!this.leverageTipObj ||  (+this.leverageTipObj[0].margin_position === 0 && +this.leverageTipObj[1].margin_position === 0)) {
          this.confirmClick()
          return
        } 
        if (this.$root.modelVisible) {
          this.popoverVisible = true
          return
        }
        
        let content = ''
        this.leverageTipObj.map(h => {
          if (h.side) {
            h.side = this.$t(`mix_side.${h.side}`)
          }
          content += this.$tR('tip_mix', h) + '<br>'
        })

        this.$confirm(content, this.$t('contract_confirm_change'), { 
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
          border-top:2px solid $--color-info;
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
      border-bottom: 1px solid #222;
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

</style>
