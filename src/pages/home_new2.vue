<template>
  <div class="page-home"> 
    <div class="banner" 
      :style="{backgroundImage: `url(${require('../assets/home/bj.png')}`}"> 
      <div class="nav_box">
        <v-navbc myClass="light" />   
      </div> 
      <!-- <HomeBanner /> -->
      <div class="banner-wrap" flex="main:center">
        <div>
          <div class="slogan"> 
              <div class="title">{{$t('home.banner.title')}}</div>
              <div class="title mt-25" style="font-size: 18px;" v-text="$t('home.banner.sub_title')" >安全 · 便捷 · 稳定</div> 
          </div> 
          <div v-if="!state.userInfo" class="option" flex="box:last"> 
            <el-input type="text" :placeholder="lang.banner.placeholder" class="mr-20" v-model="userInput" />
            <el-button type="primary" @click="goRegister">{{lang.bottom.register}}</el-button>
          </div> 
          <div v-else class="option" flex="main:center">
            <el-button class="large" @click="gotoPath('trading')">{{$t('home.bottom.start')}}</el-button>
          </div>
        </div>
      </div>
    </div> 
    <div class="ixx-home-items">
      <div
        :class="{show: loading}"
        class="mask">
        <v-loading/>
      </div>  
      <!-- 公告 -->
      <div class="home-notice">
        <div  class="home_swiper pt-10">
          <!-- 跑马灯 -->
          <div class="swiper-container2">
            <div class="swiper-wrapper"> 
              <div class="swiper-slide" v-for="item in banner1" :key="item.id">
                <div class="swiper-item">
                  <a :href="item.url"> <img :src="item.picture" alt=""></a>
                </div> 
              </div> 
            </div>
            <div class="swiper-button-prev" flex="main:center cross:center" @click="slidePrev">
              <icon name="arrow-left" />
            </div>
            <div class="swiper-button-next" flex="main:center cross:center" @click="slideNext">
              <icon name="arrow-right" />
            </div>
          </div> 
        </div>  
        <div class="ind_txt">
          <div class="mt-10" flex="main:center">
            <div 
              style="width: 400px;"
              v-if="notices.length > 0"
              class="ind_c" flex="main:justify cross:center">
              <icon class="laba" name="laba" />
              <div style="width: 300px;" > 
                <div class="swiper-wrapper" style=" height: 40px; line-height: 40px; overflow: hidden;"> 
                  <div class="van-swipe__track"  
                    ref="notices-box"
                    :style="{height: `${40*notices.lenght}px`}"
                    style=" height: 80px; text-align:left;">
                    <div style="height: 40px;"  class="swiper-item" v-for="msg in notices" :key="msg.id">
                      <a
                        :href="msg.url"
                        class="text_link"
                        target="_blank">
                        {{msg.title}} 
                      </a> 
                    </div>    
                    <div style="height: 40px;"  class="swiper-item">
                      <a
                        :href="notices[0].url"
                        class="text_link"
                        target="_blank">
                        {{notices[0].title}} 
                      </a> 
                    </div>    
                  </div>
                </div>
              </div>
              <a class="more" :href="faq">{{ $t('home.more') }} <icon name="arrow-right" /></a> 
            </div> 
          </div>
        </div> 
      </div>
      <!-- 行情 --> 
      <div class="home-markets markets-box">
        <div class="tab-nav" >
          <div class="left" flex="dir:column"> 
            <div @click="handleClickTabs('trading')" :class="['tab-nav-item', 'mr-30', {active: selectTab==='trading'}]">
              <label>{{lang.middle.orders}}</label> 
            </div>
            <div @click="handleClickTabs('btc')" :class="['tab-nav-item', 'mr-30', {active: selectTab==='btc'}]">
              <label>{{$t('currency-btc')}}</label> 
            </div> 
            <div @click="handleClickTabs('unit')" :class="['tab-nav-item', 'mr-30', {active: selectTab==='unit'}]">
              <label>{{$t('currency-unit')}}</label> 
            </div> 
            <div @click="handleClickTabs('mix')" :class="['tab-nav-item', 'mr-30', {active: selectTab==='mix'}]">
              <label>{{$t('currency-mix')}}</label> 
            </div>
          </div>
          <!-- <div class="right">
            <span>{{$t('contract_24_hour_trade')}}： <label class="ml-10">{{tradeTotal}} </label>USDT</span>
          </div> -->
        </div> 

        <div class="markets-table">
          <template v-if="(selectTab==='all' || selectTab==='trading')"> 
            <!-- <div class="title mb-10">
              <h4>{{$t('trading')}}</h4>
            </div> -->
            <div class="grid mb-30">
              <el-row class="hander mt-10 mb-20">
                <!-- <el-col :span="1">#</el-col> -->
                <el-col :span="4">{{$t('currency')}}</el-col>
                <el-col :span="3">{{$t('market.orderdeal')}}</el-col>
                <el-col :span="3">{{$t('market.h24change')}}</el-col>
                <el-col :span="4">{{$t('market.h24trade')}}</el-col>
                <el-col :span="4">{{$t('market.h24amount')}}</el-col>
                <el-col :span="4"  flex="main:center">{{$t('market.view')}}</el-col>
                <el-col :span="2"  flex="main:right">{{$t('operation')}}</el-col>
              </el-row> 
              <el-row v-for="(item, index) in tradingShowList" 
                v-show="index < 5"
                :key="index" 
                class="row mt-10">
                <!-- <el-col :span="1">{{index + 1}}</el-col> -->
                <el-col :span="4" flex="cross:center"> 
                  <img class="iconfont mr-10" style="font-size: 24px"  :src="getCoinIcon(item.product)" alt="">
                  {{item.product}}<span class="currency">/{{item.currency}}</span> &nbsp;
                </el-col>
                <el-col :span="3" >{{item.price}} &nbsp;</el-col>
                <el-col :span="3">
                  <span v-if="item.delta > 0" class="text-success">{{item.delta |fixed(2)}}%</span>  
                  <span v-else class="text-danger">{{item.delta | fixed(2)}}%</span>&nbsp;
                </el-col>
                <el-col :span="4">{{item.vol | fixed(2)}} <span class="currency">{{item.product}}</span> &nbsp;</el-col>
                <el-col :span="4">{{$big(item.vol || 0).times(item.price || 0)| fixed(2)}} <span class="currency">{{item.currency}}</span> &nbsp;</el-col>
                <el-col :span="4" flex="main:center">   
                  <span v-if="quoteList[item.name]">
                    <quote-view :historyList="quoteList[item.name]"  :delta="item.delta"/>  
                  </span> 
                  &nbsp;
                </el-col>
                <el-col :span="2" flex="main:right"> 
                  <router-link :to="{name:'trading', params: {pair: item.name}  }">
                    <el-button size="mini" type="primary">{{$t('asset_trading')}}</el-button>
                  </router-link>
                </el-col>
              </el-row>
            </div> 
          </template>
          <template v-if="(selectTab==='all' || selectTab==='btc')"> 
            <!-- <div class="title mb-10">
              <h4>{{$t('currency-btc')}}</h4>
            </div> -->
            <div class="grid mb-10">
              <el-row class="hander mt-10 mb-20">
                <!-- <el-col :span="1">#</el-col> -->
                <el-col :span="4">{{$t('currency')}}</el-col>
                <el-col :span="3">{{$t('market.orderdeal')}}</el-col>
                <el-col :span="3">{{$t('market.h24change')}}</el-col>
                <el-col :span="4">{{$t('market.h24trade')}}</el-col>
                <el-col :span="4">{{$t('market.h24amount')}}</el-col>
                <el-col :span="4"  flex="main:center">{{$t('market.view')}}</el-col>
                <el-col :span="2"  flex="main:right">{{$t('operation')}}</el-col>
              </el-row> 
              <el-row v-for="(item, index) in btcShowList"  
                v-show="index < 5"
                :key="index" 
                class="row mt-10">
                <!-- <el-col :span="1">{{index + 1}}</el-col> -->
                <el-col :span="4" flex="cross:center">
                  <img  class="iconfont mr-10" style="font-size: 24px"  :src="getCoinIcon(item.currency.replace('USD', ''))" alt="">
                  {{item.currency.replace('USD', '')}}<span class="currency">/USD</span> &nbsp;
                </el-col>
                <el-col :span="3">{{item.price}} &nbsp;</el-col>
                <el-col :span="3">
                  <span v-if="item.delta > 0" class="text-success">{{item.delta |fixed(2)}}%</span>  
                  <span v-else class="text-danger">{{item.delta | fixed(2)}}%</span>&nbsp;
                  &nbsp;
                </el-col>
                <el-col :span="4">
                  <span v-if="+item.vol">{{ $big(item.vol).div(item.price).round(item.price_scale)}}  <span class="currency">{{item.currency.replace('USD', '')}}</span></span>
                  &nbsp;
                </el-col>
                <el-col :span="4">{{item.vol | fixed(2)}} <span class="currency">USD</span> &nbsp;</el-col>
                <el-col :span="4" flex="main:center">
                  <span v-if="quoteList[item.name]">
                    <quote-view :historyList="quoteList[item.name ]"  :delta="item.delta"/>   
                  </span>
                  &nbsp; 
                </el-col>
                <el-col :span="2" flex="main:right"> 
                  <router-link :to="{name:'mix', query: {pair: item.symbol}  }">
                    <el-button size="mini" type="primary">{{$t('asset_trading')}}</el-button>
                  </router-link>
                </el-col>
              </el-row>
            </div>
          </template>
          <template v-if="(selectTab==='all' || selectTab==='unit')"> 
            <!-- <div class="title mb-10">
              <h4>{{$t('currency-unit')}}</h4>
            </div> -->
            <div class="grid mb-10">
              <el-row class="hander mt-10 mb-20">
                <!-- <el-col :span="1">#</el-col> --> 
                <el-col :span="4">{{$t('currency')}}</el-col>
                <el-col :span="3">{{$t('market.orderdeal')}}</el-col>
                <el-col :span="3">{{$t('market.h24change')}}</el-col>
                <el-col :span="4">{{$t('market.h24trade')}}</el-col>
                <el-col :span="4">{{$t('market.h24amount')}}</el-col>
                <el-col :span="4"  flex="main:center">{{$t('market.view')}}</el-col>
                <el-col :span="2"  flex="main:right">{{$t('operation')}}</el-col>
              </el-row> 
              <el-row v-for="(item, index) in unitShowList"  
                v-show="index < 5"
                :key="index" 
                class="row mt-10">
                <!-- <el-col :span="1">{{index + 1}}</el-col> -->
                <el-col :span="4" flex="cross:center">
                  <img  class="iconfont mr-10" style="font-size: 24px"  :src="getCoinIcon(item.currency)" alt="">
                  {{item.currency}}<span class="currency">/USD</span> &nbsp;
                </el-col>
                <el-col :span="3">{{item.price}} &nbsp;</el-col>
                <el-col :span="3">
                  <span v-if="item.delta > 0" class="text-success">{{item.delta |fixed(2)}}%</span>  
                  <span v-else class="text-danger">{{item.delta | fixed(2)}}%</span>&nbsp;
                  &nbsp;
                </el-col>
                <el-col :span="4">
                  <span v-if="+item.vol">{{ $big(item.vol).div(item.price).round(item.price_scale)}}  <span class="currency">{{item.currency}}</span></span>
                  &nbsp;
                </el-col>
                <el-col :span="4">{{item.vol}} <span class="currency">USD</span>&nbsp;</el-col>
                <el-col :span="4" flex="main:center">
                  <span v-if="quoteList[item.symbol]">
                    <quote-view :historyList="quoteList[item.symbol]"  :delta="item.delta"/>   
                  </span>
                  &nbsp; 
                </el-col>
                <el-col :span="2" flex="main:right"> 
                  <router-link :to="{name:'mix', query: {pair: item.symbol}  }">
                    <el-button size="mini" type="primary">{{$t('asset_trading')}}</el-button>
                  </router-link>
                </el-col>
              </el-row>
            </div>
          </template>
          <template v-if="(selectTab==='all' || selectTab==='mix')"> 
            <!-- <div class="title mb-10">
              <h4>{{$t('currency-mix')}}</h4>
            </div> -->
            <div class="grid mb-10">
              <el-row class="hander mt-10 mb-20">
                <!-- <el-col :span="1">#</el-col> -->
                <el-col :span="4">{{$t('currency')}}</el-col>
                <el-col :span="3">{{$t('market.orderdeal')}}</el-col>
                <el-col :span="3">{{$t('market.h24change')}}</el-col>
                <el-col :span="4">{{$t('market.h24trade')}}</el-col>
                <el-col :span="4">{{$t('market.h24amount')}}</el-col>
                <el-col :span="4"  flex="main:center">{{$t('market.view')}}</el-col>
                <el-col :span="2"  flex="main:right">{{$t('operation')}}</el-col>
              </el-row> 
              <el-row v-for="(item, index) in mixShowList"  
                v-show="index < 5"
                :key="index" 
                class="row mt-10">
                <!-- <el-col :span="1">{{index + 1}}</el-col> -->
                <el-col :span="4" flex="cross:center">
                  <img  class="iconfont mr-10" style="font-size: 24px"  :src="getCoinIcon(item.currency)" alt="">
                  {{item.currency}}<span class="currency">/USDT</span> &nbsp;
                </el-col>
                <el-col :span="3">{{item.price}} &nbsp;</el-col>
                <el-col :span="3">
                  <span v-if="item.delta > 0" class="text-success">{{item.delta |fixed(2)}}%</span>  
                  <span v-else class="text-danger">{{item.delta | fixed(2)}}%</span>&nbsp;
                  &nbsp;
                </el-col>
                <el-col :span="4">
                  <span v-if="+item.vol">{{ $big(item.vol).div(item.price).round(item.price_scale)}}  <span class="currency">{{item.currency}}</span></span>
                  &nbsp;
                </el-col>
                <el-col :span="4">{{item.vol}} <span class="currency">USDT</span>&nbsp;</el-col>
                <el-col :span="4" flex="main:center">
                  <span v-if="quoteList[item.symbol]">
                    <quote-view :historyList="quoteList[item.symbol]"  :delta="item.delta"/>   
                  </span>
                  &nbsp; 
                </el-col>
                <el-col :span="2" flex="main:right"> 
                  <router-link :to="{name:'mix', query: {pair: item.symbol}  }">
                    <el-button size="mini" type="primary">{{$t('asset_trading')}}</el-button>
                  </router-link>
                </el-col>
              </el-row>
            </div>
          </template>
          <!-- <template v-if="(selectTab==='all' || selectTab==='blend')"> 
            <div class="title mb-10">
              <h4>{{$t('trading')}}</h4>
            </div>
            <div class="grid mb-30">
              <el-row class="hander mt-10 mb-20"> 
                <el-col :span="5">{{$t('currency')}}</el-col>
                <el-col :span="4">{{$t('contract_block_orderdeal')}}</el-col>
                <el-col :span="5"> 
                   {{$t('market.h24change')}} 
                </el-col>
                <el-col :span="4">{{$t('contract_24_hour_trade')}}</el-col> 
                <el-col :span="4" flex="main:center">{{$t('market.view')}}</el-col>
                <el-col :span="2"  flex="main:right">{{$t('operation')}}</el-col>
              </el-row> 
              <el-row v-for="(item, index) in blendShowList"  
                v-show="index < 5"
                :key="index" 
                class="row mt-10"> 
                <el-col :span="5">
                  <img  class="iconfont mr-10" style="font-size: 24px"  :src="getCoinIcon(item.product)" alt="">
                  {{item.product}}<span class="currency">/{{item.currency}}</span>  &nbsp;
                </el-col>
                <el-col :span="4">{{item.price}} &nbsp;</el-col>
                <el-col :span="5">
                  <span v-if="item.delta > 0" class="text-success">{{item.delta |fixed(2)}}%</span>  
                  <span v-else class="text-danger">{{item.delta | fixed(2)}}%</span>&nbsp;
                  &nbsp;
                </el-col>
                <el-col :span="4">
                  <span v-if="+item.vol">{{ $big(item.vol).div(item.price).round(item.price_scale)}}  
                    <span class="currency">{{item.product}}</span>
                  </span>
                  &nbsp;
                </el-col> 
                <el-col :span="4" flex="main:center"> 
                  <span v-if="quoteList[item.symbol]">
                    <quote-view :historyList="quoteList[item.symbol]"  :delta="item.delta"/>   
                  </span>
                  &nbsp;
                </el-col>
                <el-col :span="2" flex="main:right">
                  <router-link :to="{name:'blend', query: {pair: item.symbol}  }">
                    <el-button size="mini" type="primary">{{$t('asset_trading')}}</el-button>
                  </router-link>
                </el-col>
              </el-row>
            </div>
          </template> -->
        </div> 
        <div class="markets-btn pb-30">
          <router-link to="/markets">
            <el-button type="primary" plain>{{lang.middle.more}}→</el-button>
          </router-link>  
        </div>
      </div> 
      <!-- 新手指引 -->
      <div class="home-guide">
        <div class="guide-box">
          <div class="guide-title">
            <h3>{{lang.guide.title}}</h3>
            <div class="guide-slogan mt-10">
              {{lang.guide.sub_title}}
            </div> 
          </div>
          <div class="guide-option mt-10" flex="main:left">
            <div class="button mr-30">
              <router-link to="/trading">{{lang.guide.option1}}</router-link> 
            </div>
            <!-- <div class="button plain">{{lang.guide.option2}}</div> -->
          </div>
          <div class="guide-content mt-30" flex="box:mean">
            <div class="guide-item mr-30">
              <a href="#">
                <img :src="require('../assets/home/guide-1.png')" alt="">
                <div class="pd-20">{{lang.guide.item1}}
                </div>
              </a> 
            </div>
            <div class="guide-item mr-30">
              <a href="#">
                <img :src="require('../assets/home/guide-2.png')" alt="">
                <div class="pd-20">{{lang.guide.item2}}
                </div>
              </a> 
            </div>
            <div class="guide-item">
              <a href="#">
                <img :src="require('../assets/home/guide-3.png')" alt="">
                <div class="pd-20">{{lang.guide.item3}}</div> 
              </a> 
            </div>
          </div> 
        </div>
      </div>
      <!-- 下载 -->
      <div class="compony-intro-section">  
        <template>  
          <div class="download-wrap">
            <div class="row"
              :style="{backgroundImage: `url(${require('../assets/home/home-download-bg.png')})`}">
              <div class="download-title"> 
                {{$t('home.middle.title')}}
              </div>
              <div class="download-sub-title">
                  {{$t('home.middle.sub_title', {siteName: state.siteNameText})}}
              </div>
              <div class="download-path flex-lr">
                <div class="l pd-1">
                  <div class="download-button mr-30 mb-30" >
                    <icon style="font-size: 25px;" name="google-play" class="mr-10" /> Google Play
                  </div> 
                  <div class=""></div>
                  <div class="download-button mr-30" @click="download('ios')">
                    <icon style="font-size: 25px;" class="mr-10" name="iphone" /> 
                    {{$t('download_ios')}} 
                  </div> 
                </div>
                <div class="r">
                  <div>
                    <img style="width:129px;box-shadow: 0px 1px 7px 0px rgba(184,184,184,0.35); " :src="require('../assets/home/qr-download.png')" alt=""> 
                  </div>
                </div>
              </div> 
              <img class="phone" :src="require('../assets/home/download-phone'+imgAffix+'.png')" alt="">
            </div>
          </div>
        </template>  
      </div> 
      <!-- 特色 -->
      <div class="home-features">
        <div class="features-box">
          <div class="features-title">
            {{lang.feature.title}}
          </div>
          <div class="features-content" flex="box:mean">
            <div class="feature-item">
              <div>
                <img :src="require('../assets/home/contract.png')" alt="">
              </div>
              <div class="label mt-20">{{lang.feature.lable1}}</div>
              <div class="describe mt-20" v-html="lang.feature.describe1">
                <!-- 支持金本位合约<br>
                币种丰富，合约功能完善 -->
              </div>
            </div>
            <div class="feature-item">
              <div>
                <img :src="require('../assets/home/efficient.png')" alt="">
              </div>
              <div class="label mt-20">{{lang.feature.lable2}}</div>
              <div class="describe mt-20" v-html="lang.feature.describe2">
                每秒处理300,000交易量, 从输入<br>订单到响应时间的延迟小于1毫秒
              </div>
            </div>
            <div class="feature-item">
              <div>
                <img :src="require('../assets/home/safe.png')" alt="">
              </div>
              <div  class="label mt-20">{{lang.feature.lable3}}</div>
              <div class="describe mt-20" v-html="lang.feature.describe3">
                冷钱包存储。转账经过<br> 2级严格的人员审查。
              </div>
            </div>
            <div class="feature-item"> 
              <div>
                <img :src="require('../assets/home/service.png')" alt="">
              </div>
              <div class="label mt-20">{{lang.feature.lable4}}</div>
              <div class="describe mt-20" v-html="lang.feature.describe4">
                7*24小时多语言在线服务<br>支持极速充/提币
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="home-login" style="background-color: #fafafa;">
        <div class="home-bottom" flex="dir:top cross:center  main:center">
          <h2 class="mb-20">{{$t('home.bottom.title')}}</h2>
          <el-button v-if="!state.userInfo" @click="handleToRegister" class="break"  round>{{$t('home.bottom.register')}}</el-button>
          <el-button v-else @click="gotoPath('mix')" type="primary" round>{{$t('home.bottom.start')}}</el-button>
        </div> 
      </div>
    </div>
    <div class="corperator"> 
    </div>
    <v-modal 
      @close="handleCloseModal">
      <div class="gift-modal-wrap">
        <div class="modal-message">
          {{$t('home.gift.tips')}}
        </div>
        <div class="modal-input mt-20">
          <div v-if="state.userInfo">
            <el-input v-if="!state.userInfo.whats_app_status"  :placeholder="$t('home.gift.placeholder2')" v-model="whatsapp"></el-input> 
          </div>
          <div>
            <label v-if="!whatsapp && modalErr" class="modal-error text-danger">{{$t('home.gift.placeholder2')}}</label> 
          </div>
        </div>
        <div class="modal-button mt-20" flex="box:mean">
          <el-button @click="handleCloseModal">{{$t('cancel')}}</el-button>
          <el-button @click="openFcWidget" type="primary">{{$t('confirm')}}</el-button>
        </div>
      </div>
    </v-modal> 
  </div>
</template>
<script> 
import service from '@/modules/service'
// import PairTable from '@/components/home/pair-table'
// import PairRankTable from '@/components/home/pair-rank-table'
// import MineSummary from '@/components/Mine/MineSummary'
// import tickTableMixin from '@/mixins/tick-table'
import HomeBanner from './banner/index'
import {state, local} from '@/modules/store'
import utils from '@/modules/utils'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper' 
// import VNav2 from '@/components/VNav3'
import VNavbc from '@/components/VNavBC' 
// import loginModal from '@/components/VLogin'  
import quoteView from '../views/markets/quoteView'
import wsNew from '@/modules/ws-new'

export default {
  components: { 
    // PairTable,
    // PairRankTable,
    // MineSummary,
    HomeBanner,
    Swiper, 
    SwiperSlide,
    // VNav2, 
    VNavbc,
    // loginModal,
    quoteView
    // Kyc
  },
  // mixins: [tickTableMixin],
  data: function() {
    return {
      state,
      utils,
      local, 
      banners: [],
      notices: [
        {url:'', title:'Announcement Center'}
      ],
      banner1: [],
      notices1: [],
      newbanners:[],
      swiperOption: {
        direction: 'horizontal',
        loop: true,
        autoplay: 1000,
        paginationType: 'fraction',
        pagination: '.swiper-pagination'
      },
      hasNewNotice: false, 
      yestAmount:0,
      tabName: '', 
      whether: 0,
      interIndex: 0,  
      activeName: 'second', 
      isTop: true,
      showGiftModal: false,
      whatsapp: '',
      modalErr: false,
      swiper2: null,
      tradingList: [],
      btcList: [],
      unitList: [],
      mixList: [],
      blendList: [],
      quoteList: {},
      selectTab: 'trading',
      userInput: '',
    }
  },
  computed: { 
    fcReady() {
      return window.fcReady
    }, 
    imgAffix() {
      return state.locale.includes('zh-') ? '' : '-en'
    }, 
    lang () { 
      return this.$t('home')
    },
    isKorean() {
      return state.locale === 'ko'
    }, 
    howToRegister() {
      return utils.urlTransfor(state.theme.howToRegister[state.locale || 'en'], state)
    },
    howToLogin() {
      return utils.urlTransfor(state.theme.howToLogin[state.locale || 'en'], state)
    },
    howToUnseal() {
      return utils.urlTransfor(state.theme.howToUnseal[state.locale || 'en'], state)
    },  
    calcYestAmount() {
      let amount = utils.toThousand(Math.floor(this.yestAmount || 0))
      let arr = amount.split('')
      let str = ''
      arr.map(num => {
        if (num===',' || num==='.') {
          str += `<em class='num symbol'>${num}</em>`
        } else {
          str += `<em class='num'>${num}</em>`
        }
      })
      return str
    },
    faq() {
      return state.theme.faq[state.locale || 'en']
    },
    navClass() {
      if (!this.$route.name) {
        return false
      }
      return utils.getRouteMeta(this.$route, 'class')
    }, 
    tradingShowList() {
      let list = this.tradingList.filter(item => {
        return item.market_hidden === 1 
      }) 
      list = list.sort((a,b)=>(+a.rank)-(+b.rank)) 
      return list
    },
    btcShowList() {
      let list = this.btcList.filter(item => {
        return true
      })
      list = list.sort((a,b) => (+a.rank)-(+b.rank))
      return list
    },
    unitShowList() {
      let list = this.unitList.filter(item => {
        return true
      })
      list = list.sort((a,b) => (+a.rank)-(+b.rank))
      return list
    },
    mixShowList() {
      let list = this.mixList.filter(item => {
        return true 
      }) 
      return list.sort((a,b)=>(+a.rank)-(+b.rank))
    },
    blendShowList() {
      let list = this.blendList.filter(item => {
        return true 
      })
      return list.sort((a,b)=>(+a.rank)-(+b.rank))
    },
  },
  watch: {
    'state.locale'(locale) {
      this.getBanners()
    },
    'state.userInfo.id'() { 
      if (state.userInfo && local.newLogin) {
        if (!state.userInfo.reward_state || !state.userInfo.whats_app_status) {
          this.showGiftModal = true
        }
      }
    }
  },
  async created() { 
    this.getBanners() 
    // const res = await service.getIXMarket()
    // if (!res.code) {
    //   this.yestAmount = res.data.yest_amount
    // }
    // var swiper = new Swiper('.swiper-container', {
    //   direction: 'vertical',
    //   slidesPerView: 1,
    //   spaceBetween: 30,
    //   mousewheel: true,
    //   pagination: {
    //     el: '.swiper-pagination',
    //     clickable: true,
    //   },
    // });   
    await this.fetch()
    this.subMarket() 
  }, 
  methods: {   
    getCoinIcon(coin) {
      return `https://ix-bj-static.oss-cn-beijing.aliyuncs.com/currency-coin/${coin}.png`
    },
    async fetch() {
      let pairs = [] 
      let [trading, future, unit, mix] = await Promise.all([
        service.getPairList(),
        service.getContractSymList(),
        service.getUnitContractSymList(),
        service.getMixContractSymList(),
        // service.getBlendSymbolList()
      ])
      if (!trading.code && trading.data) {
        this.tradingList = trading.data.items
        this.tradingList.forEach((item) => {
          this.$set(item, 'price', item.price)
          this.$set(item, 'delta', item.delta)
          this.$set(item, 'vol', item.vol),
          this.$set(item, 'quote', null)
          pairs.push(item.name) 
        })
      }
      if (!future.code && future.data) {
        this.btcList = future.data.items
        this.btcList.forEach((item) => {
          this.$set(item, 'price', item.price)
          this.$set(item, 'delta', item.delta)
          this.$set(item, 'vol', item.vol),
          this.$set(item, 'quote', null)
          pairs.push(item.name) 
        })
      }
      if (!unit.code && unit.data) {
        this.unitList = unit.data.items
        this.unitList.forEach((item) => {
          this.$set(item, 'price', item.price)
          this.$set(item, 'delta', item.delta)
          this.$set(item, 'vol', item.vol),
          this.$set(item, 'quote', null)
          pairs.push(item.symbol) 
        })
      }
      if (!mix.code && mix.data) { 
        this.mixList = mix.data.items 
        this.mixList.forEach((item) => {
          this.$set(item, 'price', item.price)
          this.$set(item, 'delta', item.delta)
          this.$set(item, 'vol', item.vol)
          this.$set(item, 'quote', null)
          pairs.push(item.symbol)  
        })
      }
      // if (!blend.code && blend.data) { 
      //   this.blendList = blend.data 
      //   this.blendList.forEach((item) => {
      //     this.$set(item, 'price', item.price)
      //     this.$set(item, 'delta', item.delta)
      //     this.$set(item, 'vol', item.vol)
      //     this.$set(item, 'quote', null)
      //     pairs.push(item.symbol + state.affix) 
      //   })
      // }  
      this.fetchQuote(pairs)  
    },
    async fetchQuote(pairs) {
      const to = (new Date) * 1
      const from = to - 1000 * 60 * 60 * 24
      const quoteList = {}
      if (pairs.length > 0) {
        const res = await service.getQutoHistoryMultiple({
          period: '1h',
          pair: pairs.toString(),
          begin: from,
          end: to
        }) 
        if (!res.code) {
          res.data.map(item => {
            if (!quoteList[item.pair]) {
              quoteList[item.pair] = []
            }
            quoteList[item.pair].push(item)
          })
        }
        this.quoteList = quoteList 
      }  
    }, 
    slidePrev() {
      if (!this.swiper2) return
      this.swiper2.slidePrev()
    },
    slideNext() {
      if (!this.swiper2) return
      this.swiper2.slideNext()
    },
    buySubmit(item) {
      this.$router.push({
        path: '/OTC/Trade',
        query: item
      })
    },
    async getBanners() {
      const res = await service.getBanners() 
      if (!res.code) {
        const list = res.data
        if (list.length > 0) {
          this.banners = list.filter(b => b.slot === 1)
          this.notices = list.filter(b => b.slot === 4)
          this.banner1 = list.filter(b => b.slot === 3) 

          this.newbanners = list.filter(b => b.slot === 2)
          this.notices1.push(this.newbanners[0])
          if (this.notices.length > 3) {
            this.notices.splice(3)
          }
          // 判断最新公告是否小于4小时
          const resp = await service.hasNewBanner()
          if (!resp.code && resp.data) {
            this.hasNewNotice = resp.data['new']
          }
          
          this.swiper2 = new Swiper('.swiper-container2', { 
            loop: true, 
            // loopedSlides: 8,  
            slidesPerView : 4,
            prevButton:'.swiper-button-prev',
            nextButton:'.swiper-button-next',
          })  

          let num = 0
          const that = this
          if (this.notices.length > 1) {
            setInterval(()=> { 
              const box = that.$refs['notices-box']
              if (box) {
                box.style.transitionDuration = '500ms'
                num = num + 1 
                if (num > that.notices.length) {
                  box.style.transitionDuration = '0ms'
                  num = 0
                }
                box.style.transform = `translateY(-${num * 40}px)`
              }
            }, 3000) 
          }

        }
      }
    },
    onSearching(kw) {
      this.search = kw
    },
    onSwitchTab(val) { 
    },
    handleToRegister() {
      this.$router.replace({
        name:'register'
      })
    },
    download (type) { 
      if (this.isWeiXin) {
        this.showTutorialArrow = true
        return
      } 
      
      if (type==='android') {
        let url = state.theme.download.android 
        window.location.href = url
      }
      if (type==='ios' && this.isIos) {
        let url = state.theme.download.ios
        window.location.href = url
      } 
    }, 
    openFcWidget(){
      if (!state.userInfo.whats_app_status) {
        if (!this.whatsapp) {
          this.modalErr=true
          return
        } 
        service.addTwitter({twitter:this.whatsapp }).then(res=> {
          if (!res.code) {
            this.handleCloseModal()
            if (window.fcWidget) {
              window.fcWidget.open() 
            }
          } else {
            this.$alert(res.message)
          }
        })  
      } else {
        window.fcWidget.open()
        this.showGiftModal=false
      }
    },
    handleCloseModal() {
      // local.newLogin = false
      this.showGiftModal = false
    }, 
    handleClickTabs(tab) {
      this.selectTab = tab
    },
    subMarket() { 
      if (utils.$tvSocket) {
        utils.$tvSocket.$destroy()
      } 
      utils.$tvSocket = wsNew.create()
      utils.$tvSocket.$on('open', () => { 
        utils.$tvSocket.socket.send('{"op":"subscribepub","args":["market@ticker"]}')  
      }) 
      utils.$tvSocket.$on('message', (datas) => {   
        if (datas.topic && datas.topic.indexOf('market@ticker') > -1) {  
          datas.data.forEach(data => {
            this.patch(data)
          }) 
        }
      })
    },
    patch(item) { 
      let find = this.tradingList.find(pair => pair.name === item.pair)
      if (!find) {
        find = this.mixList.find(pair => pair.symbol  === item.pair)
      } 
      if (!find) {
        find = this.btcList.find(pair => pair.name  === item.pair)
      } 
      if (!find) {
        find = this.unitList.find(pair => pair.symbol  === item.pair)
      } 
      if (!find) {
        find = this.mixList.find(pair => pair.symbol  === item.pair)
      } 
      // if (!find) {
      //   find = this.blendList.find(pair => pair.symbol + state.affix  === item.pair)
      // }
      if (find) { 
        find.price = item.current
        find.delta = this.$big(item.increment_24h || 0).mul(100).div(this.$big(item.current).minus(item.increment_24h)).round(2, this.C.ROUND_HALF_UP).toFixed(2)
        find.vol = item.volume_24h
        find.tick = item
      } 
    },
    goRegister() {
      let by="phone"
      if (/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(this.userInput)) by='email'
      this.$router.push({
        name: 'registerBy',
        params: {
          by,
          username: this.userInput
        }
      })
    }
  }, 
  mounted() {
    // this.$nextTick(()=> {  
    //   if (state.userInfo && local.newLogin) {
    //     if (!state.userInfo.reward_state || !state.userInfo.whats_app_status) {
    //       this.showGiftModal = true
    //     }
    //   } 
    // }) 
  },
  destroyed() {
    if (this.socket) {
      this.socket.$destroy()
    }
  }
}
</script>
<style lang="scss" scoped>
 @import './home/home.scss';

.banner { 
  height:400px;
  color: #ffffff;
  .banner-wrap {
    width: 1200px;
    height: 100%;
    margin:0 auto;
    // display: flex; 
    // align-items: center;
    // justify-items: center;
    .l {
      .title {
        font-size: 48px;
      }
      .sub-title {
        font-size: 28px;
        margin-top: 10px;
      }
    }
    .r {
      .banner-modal {
        color: #222222;
        border-radius: 10px;
        overflow: hidden;
        .login {
          background-color: #ffffff;
          width: 472px; 
        }
        .banner-modal-top {
          color: #222222;
          padding: 46px 51px 24px 51px;
          .l {
            font-size: 24px;
          }
          .r {
            cursor: pointer;
            font-size: 16px;
            color: #1A70FF;
          }
        }
        .banner-modal-content {
          .tabs-nav {
            color: #ACACAC;
            .tab {
              text-align: center;
              label { 
                padding-bottom: 8px;
                font-size: 14px;
                &.active {
                  color: #1A70FF;
                  border-bottom: 2px solid; 
                }
              }
            }
          }
          .line {
            height: 1px;
            background-color: #ACACAC;
          }
          .tabs-item {
            padding: 27px 40px 28px;
            input {
              height: 40px;
              line-height: 40px;
              border: none;
            }
            .region {
              border-right: 1px solid #ACACAC;
              /deep/ .el-input--suffix { 
                .el-input__inner {
                  border:none;
                } 
              }
            }
          }
        }
      }
    }
    .slogan {
      margin-top:132px;
      font-size: 34px;
      text-align: center;
      color: #fff;
    }
    .option {
      margin: 30px auto 0;
      width: 632px;
      .el-input {
        width: 480px;
        /deep/ input {
          height: 59px;
          // background-color: rgba(255,255,255,.7) ;
          border: 1px solid rgba(255,255,255,.9);
          color: #424242;
          font-size: 16px;
          &::-webkit-input-placeholder {
            color: #8a8b8b;
          }
          &:-moz-placeholder {
            color: #8a8b8b;
          }
          &::-moz-placeholder {
            color: #8a8b8b;
          }
          &:-ms-input-placeholder {
            color: #8a8b8b;
          } 
        }
      }
      .el-button {
        height: 59px;
        width: 132px;
        font-size: 16px;
        // background-color:#11f2f5;
        // color: #ffffff;
        &.large {
          width: 200px;
        }
        &--primary {
          background-color:#11f2f5;
          color: #ffffff;
        }
      }
    }
  }
}
.gift-modal-wrap {
  width: 314px;
  padding: 60px 30px 30px;
}

.compony-intro-section{
  .download-wrap {
    .row {
      position: relative;
      height: 580px;
      background: url('~@/assets/home/home-download-bg.png') no-repeat 470px center;  
      .phone {
        position:absolute;
        top:161px; 
        right: 0;
        width: 178px;
      }
    }
    
  }
}

.home-notice {
  background-color: #F7F7F7;
  .home_swiper {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;
    .swiper-container2 {
      position: relative;
      .swiper-slide {
        // width: 33.33%; 
        .blue-slide {
          background-color: #1A70FF;
        }
        .orange-slide {
          background-color: orange;
        }
        .swiper-item {
          text-align: center;
          a {
            display: block; 
            img {
              border-radius: 10px;
              vertical-align: bottom; 
            }
          } 
        }
      }
      
      .swiper-button-prev{
        top: 22px;
        left: 18px;
        height: 100%;
        color: #ddd;
        background:rgba(0, 0, 0, 0.23); 
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px; 
      }
      /*改变了颜色和加粗的样式*/
      .swiper-button-next{ 
        top: 22px;
        right: 18px;
        height: 100%;
        color: #ddd;
        background:rgba(0, 0, 0, 0.23);
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px; 
      }
    }
  } 
  .text_link {
    width: 290px; 
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}

  .markets-box {  
    width: 1200px;
    margin: 30px auto 60px;
    background-color: #FFFFFF;
    box-shadow: 0px -3px 18px 0px rgba(226,226,226,0.35);
    .tab-nav {
      padding: 30px 45px 10px;
      color: #9C9C9C;
      .tab-nav-item {
        font-size: 14px; 
        &.active {
          color: #373737;
          border-bottom: 2px solid $primary;
        }
      }
    }
    .markets-table {
      padding: 10px 45px 10px;
      .title {
        font-size: 14px;
      }
      .hander {
        font-size: 14px;
        color: #9C9C9C;
      }
      .row {
        line-height: 42px;
        font-size: 14px;
      }
      .currency {
        font-size: 11px;
        color: #9C9C9C;
      }
    } 
    .markets-btn {
      text-align: center;
    }
  }
  .home-guide {
    padding: 30px 0 60px;
    background-color: #ffffff;
    .guide-box {
      width: 1200px;
      margin: 0 auto;
      .guide-title {
        padding: 20px 0;
        color: #292929;
        font-size: 16px;
        h3 {
          font-size: 28px;
          font-weight: bold; 
        }
      } 
    }
    .guide-option {
      .button {
        padding: 10px 36px;
        background-color: $primary;
        border-radius: 20px;
        a {
          color: $primary-back;
        }
        cursor: pointer;
        &.plain {
          background: transparent;
          color: #191919;
        }
      }
    }
    .guide-content {
      .guide-item {
        box-shadow: 0px 3px 7px 0px rgba(215,215,215,0.35);
        a {
          color:#292929;
        } 
      }
    }
  }
  .home-features {
    padding: 50px 0;
    background-color: #ffffff;
    .features-box {
      width: 1200px;
      margin: 0 auto;
      .features-title {
        padding: 20px 0;
        font-size: 28px;
        color: #292929;
        font-weight: bold;
      }
      .features-content {
        margin-top: 60px;
        .feature-item {
          text-align: center;
          color: #292929;
          .label {
            font-size: 22px;
            font-weight: bold;
          }
          .describe {
            width: 220px;
            margin: 0 auto;
          }
          &:not(:last-child) {
            margin-right: 100px;
          }
        }
      }
    }
  } 

  .home-login {
    .el-button.break {
      background-color: #000;
      color: #ffffff;
      &:hover {
        border-color: #000;
        background-color: rgba(0, 0, 0, 0.9)
      }
    }
  }
 
</style>
