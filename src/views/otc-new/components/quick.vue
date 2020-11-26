<template>
  <div class="otc-quick-container">
    <div class="otc-quick-box"
         flex="main:left">
      <div class="coin-info">
        <div class="title">
          <icon :name="`coin-${coinInfo.name}`" />
          <span>关于{{ coinInfo.name }}</span>
        </div>
        <div class="box">  
          <p 
            v-tooltip.bottom="{html: true, content: coinInfo.brief_info, classes: ['contract', 'big']}" 
            :class="['issue-info-describe', {ellipsis: customDigitalCurrency !== 'USDT' && customFiatCurrency !=='USDT'}]">{{coinInfo.brief_info}}</p>
          <div class="kline mt-20"> 
            <div v-if="customDigitalCurrency !== 'USDT' && customFiatCurrency !=='USDT'" class="canvas">
              <canvas ref="myCanvas" width="578" height="150"></canvas>
            </div>
          </div>
          <div flex class="issue-info-row">
            <div flex-box="1">
              <h6>发行时间</h6>
              <span>{{ coinInfo.issue_time }}</span>
            </div>
            <div flex-box="1">
              <h6>总市值</h6>
              <span>666.66亿</span>
            </div>
            <div flex-box="1">
              <h6>历史最高价</h6>
              <span>￥6.98</span>
            </div>
          </div>
        </div>
      </div>
      <div class="trade-box">
        <div class="form">
          <div class="trade-side">
            <div @click="handleChangeSide(1)"
                 :class="['side', 'side-buy', {'side-active': side===1}]">购买</div>
            <div @click="handleChangeSide(2)"
                 :class="['side', 'side-sell', {'side-active': side===2}]">出售</div>
          </div>
          <div class="trade-content"> 
            <!-- <div>
              <div>1 USDT价值约</div>  
              <h4>{{digitalPrice}} {{customFiatCurrency}}</h4>
            </div>  -->
            <div class="my-select pl-16 pr-16 mt-20">
              <el-dropdown @command="handleCommandDigitalCurrency">
                <div class="el-dropdown-link" flex="main:justify cross:center">
                  <label>
                    <span v-if="digitalCurrencies">
                      <icon :name="`coin-${customDigitalCurrency}`" />
                      {{customDigitalCurrency}} 
                    </span>
                    &nbsp;
                  </label>
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </div>
                <el-dropdown-menu slot="dropdown" class="custom-dropdown">
                  <el-dropdown-item 
                      v-for="(item, index) in digitalCurrencies" 
                      :command="index"
                      :key="index">
                    <icon :name="`coin-${item}`"/> {{item}} 
                  </el-dropdown-item> 
                </el-dropdown-menu>
              </el-dropdown>
            </div>  
            <div class="interlayer mt-5" flex="main:justify">
              <div class="l">&nbsp;</div>
              <div class="r">
                资金账户可用 {{available || '--'}} 
                <router-link to="/fund/transfer">资金划转</router-link>
              </div>
            </div>
            <div class="mt-20">
              <number-input  
                label="我将收到" 
                :list="fiatCurrencies"
                @selectChange="handleFiatCurrencyChange"
                :selectValue="customFiatCurrency"
                v-model="fiatAmount"
                :scale="8"/>
            </div>
            <!-- <div v-if="+side===1"> 
              <div class="mt-20">
                <number-input  
                  :list="fiatCurrencies"
                  :label="outInputText" 
                  @selectChange="handleFiatCurrencyChange"
                  :selectValue="customFiatCurrency"
                  v-model="fiatAmount"
                  :scale="4"/>
              </div>
              <div class="interlayer mt-5" flex="main:justify">
                <div class="l">&nbsp;</div>
                <div v-if="+side===1" class="r">
                  资金账户可用 {{available || '--'}} 
                  <router-link to="/fund/transfer">资金划转</router-link>
                </div>
              </div>
              <div class="mt-20">
                <number-input  
                  :list="digitalCurrencies"
                  label="我将收到" 
                  v-model="digitalAmount"
                  @selectChange="handleDigitalCurrencyChange"
                  :selectValue="customDigitalCurrency"
                  :scale="8"/>
              </div>
            </div>
            <div v-else-if="+side===2">
              <div class="mt-20">
                <number-input  
                  :label="outInputText" 
                  :list="digitalCurrencies"
                  v-model="digitalAmount"
                  @selectChange="handleDigitalCurrencyChange"
                  :selectValue="customDigitalCurrency"
                  :scale="4"/>
              </div>
              <div class="interlayer mt-5" flex="main:justify">
                <div class="l">&nbsp;</div>
                <div class="r">&nbsp;</div>
              </div>
              <div class="mt-20">
                <number-input  
                  label="我将收到" 
                  :list="fiatCurrencies"
                  @selectChange="handleFiatCurrencyChange"
                  :selectValue="customFiatCurrency"
                  v-model="fiatAmount"
                  :scale="8"/>
              </div>
            </div> -->
            <div class="mt-20">
              <label>{{inSelectText}}</label>
              <!-- <div 
                class="my-select pl-16 pr-16" 
                flex="main:justify"
                v-popover:custom-dropdown>
                <div v-if="customPayType" class="l">
                  <icon :name="customPayType.icon" />
                  <label for="">{{customPayType.name}}</label>
                </div>
                <div class="r">
                  <icon name="arrow-down" />
                </div>
              </div>
              <el-popover ref="custom-dropdown"   
                  popper-class="custom-dropdown" 
                  placement="bottom-start" 
                  trigger="click">
                <ul>
                  <li class="custom-dropdown-item" 
                    v-for="(item, index) in payTypeList" 
                    @click="customPayType = item"
                    :key="index">
                    <icon :name="item.icon" /> <label class="pl-10">{{ $t(item.name) }}</label>
                  </li>
                </ul>
              </el-popover>  -->
              <div class="my-select pl-16 pr-16">
                <el-dropdown @command="handleCommandType">
                  <div class="el-dropdown-link" flex="main:justify cross:center">
                    <label>
                      <span v-if="customPayType">
                        <icon :name="customPayType.icon" />
                        {{customPayType.name}} 
                      </span>
                      &nbsp;
                    </label>
                    <i class="el-icon-arrow-down el-icon--right"></i>
                  </div>
                  <el-dropdown-menu slot="dropdown" class="custom-dropdown">
                    <el-dropdown-item 
                        v-for="(item, index) in payTypeList" 
                        :command="index"
                        :key="index">
                      <icon :name="item.icon"/> {{item.name}} 
                    </el-dropdown-item> 
                  </el-dropdown-menu>
                </el-dropdown>
              </div>  
            </div>
            <div class="mt-25">
              <el-button style="width:100%;" @click="handleConfirm" type="primary">立即购买</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import HighCharts from 'highcharts'
import service from '@/modules/service'
import numberInput from './myNumberInput.vue'
import api from '@/modules/api/notc'
// import coinInfo from '@/components/trading/coin-intro/coin-info.js'
import {state} from '@/modules/store'

const coinData = {
  BTC: {
    'zh-CN': {
      name: 'BTC',
      full_name: '比特币（Bitcoin）',
      brief_info: '比特币（Bitcoin，简称BTC）是目前使用最为广泛的一种数字货币，它诞生于2009年1月3日，是一种点对点（P2P）传输的数字加密货币，总量2100万枚。比特币网络每10分钟释放出一定数量币，预计在2140年达到极限。比特币被投资者称为“数字黄金”。比特币依据特定算法，通过大量的计算产生，不依靠特定货币机构发行，其使用整个P2P网络中众多节点构成的分布式数据库来确认并记录所有的交易行为，并使用密码学设计确保货币流通各个环节安全性，可确保无法通过大量制造比特币来人为操控币值。基于密码学的设计可以使比特币只能被真实拥有者转移、支付及兑现。同样确保了货币所有权与流通交易的匿名性。',
      issue_time: '2008/11/1',
      issue_all: '2100万', // 发行总量
      issue_circulation: '1673.82万', // 流通总量
      token_price: '--', // 众筹价格
      whitepagger: 'https://bitcoin.org/bitcoin.pdf', // 白皮书
      office_website: 'https://bitcoin.org/en', // 官网
      chain_info: 'https://blockchain.info/' // 区块查询
    },
    'zh-HK': {
      name: 'BTC',
      full_name: '比特幣（Bitcoin）',
      brief_info: '比特幣（Bitcoin，簡稱BTC）是目前使用最為廣泛的一種數字貨幣，它誕生於2009年1月3日，是一種點對點（P2P）傳輸的數字加密貨幣，總量2100萬枚。比特幣網絡每10分鐘釋放出一定數量幣，預計在2140年達到極限。比特幣被投資者稱為“數字黃金”。比特幣依據特定算法，通過大量的計算產生，不依靠特定貨幣機構發行，其使用整個P2P網絡中眾多節點構成的分佈式數據庫來確認並記錄所有的交易行為，並使用密碼學設計確保貨幣流通各個環節安全性，可確保無法通過大量製造比特幣來人為操控幣值。基於密碼學的設計可以使比特幣只能被真實擁有者轉移、支付及兌現。同樣確保了貨幣所有權與流通交易的匿名性。 ',
      issue_time: '2008/11/1',
      issue_all: '2100萬', // 發行總量
      issue_circulation: '1673.82萬', // 流通總量
      token_price: '--', // 眾籌價格
      whitepagger: 'https://bitcoin.org/bitcoin.pdf', // 白皮書
      office_website: 'https://bitcoin.org/en', // 官網
      chain_info: 'https://blockchain.info/' // 區塊查詢
    },
    en: {
      name: 'BTC',
      full_name: 'Bitcoin',
      brief_info: 'Bitcoin is a digital asset and a payment system invented by Satoshi Nakamoto who published a related paper in 2008 and released it as open-source software in 2009. The system featured as peer-to-peer; users can transact directly without an intermediary.',
      issue_time: '2008/11/1',
      issue_all: '21,000,000', // 发行总量
      issue_circulation: '16,789,425', // 流通总量
      token_price: '--', // 众筹价格
      whitepagger: 'https://bitcoin.org/bitcoin.pdf', // 白皮书
      office_website: 'https://bitcoin.org/en', // 官网
      chain_info: 'https://blockchain.info/' // 区块查询
    },
    ko: {
      name: 'BTC',
      full_name: 'Bitcoin',
      brief_info: '암호화폐 중 가장 최초로 구현된 코인 / 중앙관리 주체가 없으며 P2P 네트워크를 이용한 거래 시스템 / 블록체인 기술을 최초로 화폐라는 개념에 융합시킨 암호화폐 / 모든 거래 내역을 사용자들이 공동 관리함으로써 투명도를 최대화시킨 지불 관리 수단의 혁명',
      issue_time: '2008/11/1',
      issue_all: '21,000,000', // 发行总量
      issue_circulation: '16,789,425', // 流通总量
      token_price: '--', // 众筹价格
      whitepagger: 'https://bitcoin.org/bitcoin.pdf', // 白皮书
      office_website: 'https://bitcoin.org/en', // 官网
      chain_info: 'https://blockchain.info/' // 区块查询
    }

  },
  ETH: {
    'zh-CN': {
      name: 'ETH',
      full_name: '以太坊（Ethereum）',
      brief_info: '以太坊（Ethereum）是下一代密码学账本，可以支持众多的高级功能，包括用户发行货币，智能协议，去中心化的交易和设立去中心化自治组织(DAOs)或去中心化自治公司（DACs）。以太坊并不是把每一单个类型的功能作为特性来特别支持，相反，以太坊包括一个内置的图灵完备的脚本语言，允许通过被称为“合同”的机制来为自己想实现的特性写代码。一个合同就像一个自动的代理，每当接收到一笔交易，合同就会运行特定的一段代码，这段代码能修改合同内部的数据存储或者发送交易。',
      issue_time: '2014-07-24',
      issue_all: '9631.15 万', // 发行总量
      issue_circulation: '9631.15 万', // 流通总量
      token_price: '$0.31', // 众筹价格
      whitepagger: 'https://github.com/ethereum/wiki/wiki/%5BEnglish%5D-White-Paper', // 白皮书
      office_website: 'https://www.ethereum.org', // 官网
      chain_info: 'https://etherscan.io' // 区块查询
    },
    'zh-HK': {
      name: 'ETH',
      full_name: '以太坊（Ethereum）',
      brief_info: '以太坊（Ethereum）是下一代密碼學賬本，可以支持眾多的高級功能，包括用戶發行貨幣，智能協議，去中心化的交易和設立去中心化自治組織(DAOs)或去中心化自治公司（DACs）。以太坊並不是把每一單個類型的功能作為特性來特別支持，相反，以太坊包括一個內置的圖靈完備的腳本語言，允許通過被稱為“合同”的機制來為自己想實現的特性寫代碼。一個合同就像一個自動的代理，每當接收到一筆交易，合同就會運行特定的一段代碼，這段代碼能修改合同內部的數據存儲或者發送交易。 ',
      issue_time: '2014-07-24',
      issue_all: '9631.15 萬', // 發行總量
      issue_circulation: '9631.15 萬', // 流通總量
      token_price: '$0.31', // 眾籌價格
      whitepagger: 'https://github.com/ethereum/wiki/wiki/%5BEnglish%5D-White-Paper', // 白皮書
      office_website: 'https://www.ethereum.org', // 官網
      chain_info: 'https://etherscan.io' // 區塊查詢
    },
    en: {
      name: 'ETH',
      full_name: 'Ethereum',
      brief_info: 'Ethereum is a decentralized platform that runs smart contracts: applications that run exactly as programmed without any possibility of downtime, censorship, fraud or third party interference.',
      issue_time: '2014-07-24',
      issue_all: '96,847,288', // 发行总量
      issue_circulation: '96,847,288', // 流通总量
      token_price: '$0.308', // 众筹价格
      whitepagger: 'https://github.com/ethereum/wiki/wiki/%5BEnglish%5D-White-Paper', // 白皮书
      office_website: 'https://www.ethereum.org', // 官网
      chain_info: 'https://etherscan.io' // 区块查询
    },
    ko: {
      name: 'ETH',
      full_name: 'Ethereum',
      brief_info: '기존 블록체인에 기반해 다양한 앱 개발을 위해 제작된 플랫폼의 성격이 강함 / 기존 비트코인의 블록체인보다 뛰어난 확장성을 보이며 프로그램된 계약을 정확히 실행할 수 있는 ‘스마트 컨트랙트’ 기능 포함 / 유동적인 발행량 조정으로 적절히 가치 변동에 대한 조절 가능',
      issue_time: '2014-07-24',
      issue_all: '96,847,288', // 发行总量
      issue_circulation: '96,847,288', // 流通总量
      token_price: '$0.308', // 众筹价格
      whitepagger: 'https://github.com/ethereum/wiki/wiki/%5BEnglish%5D-White-Paper', // 白皮书
      office_website: 'https://www.ethereum.org', // 官网
      chain_info: 'https://etherscan.io' // 区块查询
    }
  },
  EOS: {
    'zh-CN': {
      name: 'EOS',
      full_name: 'Enterprise Operation System（EOS）',
      brief_info: 'EOS (Enterprise Operation System)是由 Block.one公司主导开发的一种全新的基于区块链智能合约平台，旨在为高性能分布式应用提供底层区块链平台服务。EOS 项目的目标是实现一个类似操作系统的支撑分布式应用程序的区块链架构。该架构可以提供账户，身份认证，数据库，异步通信以及可在数以万计的 CPU/GPU群集上进行程序调度和并行运算。EOS最终可以支持每秒执行数百万个交易，同时普通用户执行智能合约无需支付使用费用。 ',
      issue_time: '2017-07-02',
      issue_all: '10亿', // 发行总量
      issue_circulation: '5.36亿', // 流通总量
      token_price: '--', // 众筹价格
      whitepagger: 'https://github.com/EOSIO/Documentation/blob/master/zh-CN/TechnicalWhitePaper.md', // 白皮书
      office_website: 'https://eos.io/', // 官网
      chain_info: 'https://eosflare.io/' // 区块查询
    },
    'zh-HK': {
      name: 'EOS',
      full_name: 'Enterprise Operation System（EOS）',
      brief_info: 'EOS (Enterprise Operation System)是由 Block.one公司主導開發的一種全新的基於區塊鏈智能合約平台，旨在為高性能分佈式應用提供底層區塊鏈平台服務。 EOS 項目的目標是實現一個類似操作系統的支撐分佈式應用程序的區塊鏈架構。該架構可以提供賬戶，身份認證，數據庫，異步通信以及可在數以萬計的 CPU/GPU群集上進行程序調度和並行運算。 EOS最終可以支持每秒執行數百萬個交易，同時普通用戶執行智能合約無需支付使用費用。 ',
      issue_time: '2017-07-02',
      issue_all: '10億', // 發行總量
      issue_circulation: '5.36億', // 流通總量
      token_price: '--', // 眾籌價格
      whitepagger: 'https://github.com/EOSIO/Documentation/blob/master/zh-CN/TechnicalWhitePaper.md', // 白皮書
      office_website: 'https://eos.io/', // 官網
      chain_info: 'https://eosflare.io/' // 區塊查詢
    },
    en: {
      name: 'EOS',
      full_name: 'Enterprise Operation System（EOS）',
      brief_info: 'EOS tokens are ERC-20 compatible tokens distributed on the Ethereum blockchain pursuant to a related ERC-20 smart contract (the “EOS Tokens”). EOS featured in powerful infrastructure for decentralized application and token distribution takes place over 341 days.',
      issue_time: '2017-07-02',
      issue_all: '1000 million', // 发行总量
      issue_circulation: '536 million', // 流通总量
      token_price: '--', // 众筹价格
      whitepagger: 'https://github.com/EOSIO/Documentation/blob/master/zh-CN/TechnicalWhitePaper.md', // 白皮书
      office_website: 'https://eos.io/', // 官网
      chain_info: 'https://eosflare.io/' // 区块查询
    },
    ko: {
      name: 'EOS',
      full_name: 'Enterprise Operation System（EOS）',
      brief_info: '탈중앙화를 모토로 하고 있는 컴퓨터, 모바일, 어플 통신 개발용 운영체제 / EOS는 관련 ERC-20 스마트계약(EOS 토큰)에 따라 이더리움 블록체인에 배포된 ERC-20 호환 토큰',
      issue_time: '2017-07-02',
      issue_all: '1000 million', // 发行总量
      issue_circulation: '536 million', // 流通总量
      token_price: '--', // 众筹价格
      whitepagger: 'https://github.com/EOSIO/Documentation/blob/master/zh-CN/TechnicalWhitePaper.md', // 白皮书
      office_website: 'https://eos.io/', // 官网
      chain_info: 'https://eosflare.io/' // 区块查询
    }
  },
  USDT: {
    'zh-CN': {
      name: 'USDT',
      full_name: '泰达币',
      brief_info: 'USDT是Tether公司推出的基于稳定价值货币美元（USD）的代币Tether USD（下称USDT），1USDT=1美元，用户可以随时使用USDT与USD进行1:1兑换。Tether公司严格遵守1:1准备金保证，即每发行1个 USDT代币，其银行账户都会有1美元的资金保障。用户可以在Tether平台进行资金查询，以保障透明度。用户可以通过SWIFT电汇美元至Tether公司提供的银行帐户，或通过交易所换取USDT；赎回美元时，反向操作即可。用户也可在交易平台用比特币换取USDT。',
      issue_time: ' 2014-11-26',
      issue_all: '18,650,504,170', // 发行总量
      issue_circulation: '18,505,394,247', // 流通总量
      token_price: '--', // 众筹价格
      whitepagger: 'https://tether.to/wp-content/uploads/2016/06/TetherWhitePaper.pdf', // 白皮书
      office_website: 'https://tether.to/', // 官网
      chain_info: 'https://www.omniexplorer.info/asset/31' // 区块查询
    },
    'zh-HK': {
      name: 'USDT',
      full_name: '泰达币',
      brief_info: 'USDT是Tether公司推出的基于稳定价值货币美元（USD）的代币Tether USD（下称USDT），1USDT=1美元，用户可以随时使用USDT与USD进行1:1兑换。Tether公司严格遵守1:1准备金保证，即每发行1个 USDT代币，其银行账户都会有1美元的资金保障。用户可以在Tether平台进行资金查询，以保障透明度。用户可以通过SWIFT电汇美元至Tether公司提供的银行帐户，或通过交易所换取USDT；赎回美元时，反向操作即可。用户也可在交易平台用比特币换取USDT。',
      issue_time: ' 2014-11-26',
      issue_all: '18,650,504,170', // 发行总量
      issue_circulation: '18,505,394,247', // 流通总量
      token_price: '--', // 众筹价格
      whitepagger: 'https://tether.to/wp-content/uploads/2016/06/TetherWhitePaper.pdf', // 白皮书
      office_website: 'https://tether.to/', // 官网
      chain_info: 'https://www.omniexplorer.info/asset/31' // 区块查询
    },
    'en': {
      name: 'USDT',
      full_name: 'USDT',
      brief_info: 'USDT is a token issued by Tether company based on the stable value currency us dollar (USD), Tether USD (hereinafter referred to as USDT), 1USDT = 1 us dollar, users can use USDT and USD for 1:1 exchange at any time. Tether strictly adheres to a 1:1 reserve guarantee, which guarantees $1 in its bank account for every USDT token it issues.',
      issue_time: ' 2014-11-26',
      issue_all: '18,650,504,170', // 发行总量
      issue_circulation: '18,505,394,247', // 流通总量
      token_price: '--', // 众筹价格
      whitepagger: 'https://tether.to/wp-content/uploads/2016/06/TetherWhitePaper.pdf', // 白皮书
      office_website: 'https://tether.to/', // 官网
      chain_info: 'https://www.omniexplorer.info/asset/31' // 区块查询
    },
    'ko': {
      name: 'USDT',
      full_name: 'USDT',
      brief_info: 'USDT is a token issued by Tether company based on the stable value currency us dollar (USD), Tether USD (hereinafter referred to as USDT), 1USDT = 1 us dollar, users can use USDT and USD for 1:1 exchange at any time. Tether strictly adheres to a 1:1 reserve guarantee, which guarantees $1 in its bank account for every USDT token it issues.',
      issue_time: ' 2014-11-26',
      issue_all: '18,650,504,170', // 发行总量
      issue_circulation: '18,505,394,247', // 流通总量
      token_price: '--', // 众筹价格
      whitepagger: 'https://tether.to/wp-content/uploads/2016/06/TetherWhitePaper.pdf', // 白皮书
      office_website: 'https://tether.to/', // 官网
      chain_info: 'https://www.omniexplorer.info/asset/31' // 区块查询
    },
  }
}
export default {
  components: {
    numberInput
  },
  data () {
    return {
      side: 1,
      rates: null,
      coinInfo: {}, 
      priceHistory: [], 
      // digitalCurrencies: [],
      // fiatCurrencies: [],
      payTypeList: [],
      fiatAmount: '',
      digitalAmount: '',
      customDigitalCurrency: null,
      customFiatCurrency: null,
      customPayType: null, 
      outInputText: '我要支付',
      inSelectText: '支付方式',
      available: 0,
      // fiatCurrencies: null,
      // digitalCurrencies: null,
      
    }
  },
  computed: {
    fiatCurrencies() {
      if (+this.side===1) {
        return state.otc.fiatCurrencies
      } else {
        return ['CNY']
      }
    },
    digitalCurrencies() {
      if (+this.side===1) {
        return state.otc.digitalCurrencies
      } else {
        return ['USDT']
      }
    },
    digitalPrice() {
      if (this.rates && this.rates[this.customDigitalCurrency]) {
        let obj = this.rates[this.customDigitalCurrency]
        return obj.USD
      } 
      return 0
    }
  },
  methods: {  
    handleCommandDigitalCurrency(index) {
      this.customDigitalCurrency = this.digitalCurrencies[index]
      this.getHistory(this.customDigitalCurrency)
      this.getCurrencyInfo(this.customDigitalCurrency)  
    }, 
    handleCommandType(index) {
      this.customPayType = this.payTypeList[index]
    },
    getHistory (name) { 
      name = `${name}_USDT`
      const to = (new Date) * 1
      const from = to - 1000 * 60 * 60 * 24 //获取5个小时的数据
      service.getQuoteHistory({
        period: '5m',
        pair: name,
        begin: from,
        end: to
      }).then((res) => {
        if (!!res && !res.code) {
          this.priceHistory = res.data
          this.canvasInit() 
        }
      })
    },
    async handleConfirm () {  
      if (this.side === 1) {
        state.otc.fiatMoney = {
          amount: this.fiatAmount,
          currency: this.customFiatCurrency
        }
        state.otc.digitalMoney = {
          amount: this.digitalAmount,
          currency: this.customDigitalCurrency
        }

        await this.fetchForeignAddress(this.customDigitalCurrency)
        await this.fetchSimplePayment()
        // this.$router.push({name: 'quick-offer'})
      }
    },
    getCurrencyInfo (coinType) { 
      const {locale} = state 
      console.log('getCurrencyInfo')
      if (coinData[coinType]) {
        this.coinInfo = coinData[coinType][locale]
      } else { 
        this.getCurrency(coinType)
      }
    },
    getCurrency(coinType) {
      this.coinInfo = null
      service.getCurrencyList({
        currency: coinType, 
        lang: state.locale
      }).then(res => {
        // if(!res.code && !!res.data){
        //   let coin = {}
        //   coin.name=res.data.currency
        //   coin.full_name=res.data.full_name
        //   coin.brief_info=res.data.intro
        //   coin.issue_time=res.data.issue_time
        //   coin.issue_all=res.data.issue_amount
        //   coin.issue_circulation=res.data.circulate_amount
        //   coin.token_price=res.data.raise_price
        //   coin.whitepagger=res.data.white_paper
        //   coin.office_website=res.data.home_page
        //   coin.chain_info=res.data.block_query
        //   this.coinInfo = coin 
        // } 
      })
    },
    canvasInit() {
      let canvas = this.$refs.myCanvas
      let ctx2 = canvas.getContext('2d');
      ctx2.clearRect(0, 0, 578, 150)
      if (canvas && this.priceHistory) {  
        const list = []
        this.priceHistory.map((item, index) => {
          list.push(item.values[0]) 
        }) 
        const max = _.max(list) //最高价格
        const min = _.min(list) //最低价格
        const diff= this.$big(max).minus(min)  //价格差值
        const start = this.$big(min).minus(this.$big(diff).times(0.1)) //起点价格
        const end = this.$big(max).plus(this.$big(diff).times(0.1)) //终点价格
        const xstep = this.$big(150).div(end.minus(start)) //价格1的步长
        const ystep = this.$big(578).div(list.length) //一个时间点的步长
        ctx2.beginPath(); 
        list.map((item, index) => { 
          let y = +this.$big(150).minus(this.$big(item).minus(start).times(xstep))
          let x = +this.$big(index).times(ystep)
          ctx2.lineTo(x, y)
        })  
        ctx2.strokeStyle = '#09C989'
        // ctx2.closePath();
        ctx2.stroke()
      }
    },
    handleDigitalCurrencyChange(sender) { 
      this.customDigitalCurrency = sender 
      this.getHistory(sender)
      this.getCurrencyInfo(sender)  
    },
    handleFiatCurrencyChange(sender) {
      this.customFiatCurrency = sender 
      if (this.customFiatCurrency === 'CNY') {
        this.payTypeList = [
          { name: 'alipay', icon:'alipay' },
          { name: 'wechat', icon:'wechat' },
          { name: 'bank-card', icon:'bank-card' },
        ]
      } else {
        this.payTypeList = [
          { name: 'MasterCard', icon:'master-card' },
          { name: 'VISA', icon:'visa' }, 
        ] 
      }
      this.handleCommandType(0)
      
    },
    handleChangeSide(obj) {  
      this.side = obj
      if (+obj === 1) {  
        this.outInputText = '我要支付'
        this.inSelectText = '支付方式'
      } else { 
        this.outInputText = '我要出售'
        this.inSelectText = '收款方式'
      }  
      // this.handleDigitalCurrencyChange(this.digitalCurrencies[0]) 
      this.handleCommandDigitalCurrency(0) 
      this.handleFiatCurrencyChange(this.fiatCurrencies[0])   
      // this.customDigitalCurrency = this.digitalCurrencies[0]
      // this.customFiatCurrency = this.fiatCurrencies[0]
      this.customPayType = this.payTypeList[0] 
    },
    async fetchForeignAddress(currency) { 
      const params = { currency } 
      const res = await api.foreignAddress(params) 
      if (res && !res.code) {
        state.otc.digitalAddress = res.data.address
        state.otc.payment_id =  res.data.payment_id
        state.otc.order_id = res.data.order_id
        state.otc.time = res.data.create_time
      } 
    },
    async fetchSimplePayment() {
      let params = { 
        "account_details": {
          "app_provider_id": "ixx",
          "app_version_id": "1.5.9",
          "app_end_user_id": "940951", //state.userInfo.id,
          "signup_login": { 
            "timestamp": "2020-11-13T14:42:24.832+08:00"
          }
        },
        "transaction_details": {
          "payment_details": {
            "quote_id": state.otc.quote_id,
            "payment_id": state.otc.payment_id,
            "order_id": state.otc.order_id,
            "destination_wallet": {
              "currency": this.customDigitalCurrency,
              "address": state.otc.digitalAddress,
              "tag": ""
            }
          },
          "original_http_ref_url": "https://ixxex.me/"
        }
      } 
      return await api.simplePayment(params)
    },
    async fetchQuote(amount, digital, fiat) {  
      let params = { 
        "end_user_id": "940951",// state.userInfo.id,
        "digital_currency": this.customDigitalCurrency,
        "fiat_currency": this.customFiatCurrency,
        "requested_currency":  this.customFiatCurrency,
        "requested_amount": amount,
        "wallet_id": "ixx", 
        "payment_methods" : ["credit_card"] 
      }
      return api.simpleQuote(params)
      // let res = await api.simpleQuote(params) 
      // if (res && res.quote_id) {
      //   state.otc.fiatCurrencies = res.supported_fiat_currencies
      //   state.otc.digitalCurrencies = res.supported_digital_currencies
      //   state.otc.valid_until = res.valid_until
      //   state.otc.quote_id = res.quote_id 
        
      //   this.handleChangeSide(1) 
      //   this.getHistory(res.supported_digital_currencies[0])
      //   this.getCurrencyInfo(res.supported_digital_currencies[0]) 
      // } 
    },
    async fetchRates() {
      let res = await service.getAllRate()
      if (!res.code && !!res.data) {
        this.rates = res.data;
      }
    },
    async init() {
      await this.fetchRates() 
      //第一次请求simpleQuote接口是为了拿到simple平台支持的 数字货币列表 和 法币列表
      //所以这里币种可以写死，但是获取到的quote_id是没有意义的，需要下单前重新获取一次
      let res = await this.fetchQuote(100, 'USDT', 'CNY') 
      if (res && res.quote_id) {
        state.otc.fiatCurrencies = ['CNY'].concat(res.supported_fiat_currencies) 
        state.otc.digitalCurrencies = res.supported_digital_currencies  
        this.handleChangeSide(1) 
        //获取24小时价格走势
        this.getHistory(res.supported_digital_currencies[0])
        //获取币种描述
        this.getCurrencyInfo(res.supported_digital_currencies[0]) 
      } 
    }
  }, 
  async created () { 
    this.customDigitalCurrency = 'USDT'
    this.customFiatCurrency = 'USD'
    this.init()
  }
}

</script>

<style lang="scss">
.otc-quick-container {
  padding:90px 0;
  width: 1200px;
  margin:0 auto;
  background-color: #f9f9f9;
  .otc-quick-box {
    .coin-info {
      width: 580px;
      margin-right: 150px;
      .title {
        margin-bottom: 1em;
        font-size: 32px;
        font-weight: bold;
        color: #2d2d2d;
        .iconfont {
          font-size: 32px;
        }
      }
      .box {
        .issue-info-describe {  
          font-size: 16px;
          font-family: Microsoft YaHei Regular, Microsoft YaHei Regular-Regular;
          font-weight: 400;
          text-align: justifyLeft;
          color: #9da0a5;
          line-height: 30px; 
          &.ellipsis {
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 3;/*超出3行部分显示省略号，去掉该属性 显示全部*/
            -webkit-box-orient: vertical; 
          }
        }
        .issue-info-row {
          margin-top:40px;
          text-align: left;
          h6 {
            font-size: 12px;
            color: #9da0a5;
          }
          span {
            font-size: 18px;
            color: #2d2d2d;
          }
        }
      }
    }
    .trade-box {
      width: 473px;
      background-color: #ffffff;
      .form {
        box-shadow: 0 6px 12px 0 rgba(36, 58, 120, 0.08);
        .trade-side {
          display: flex;
          background-color: #ffffff;
          .side {
            &:last-child {
              margin-left: 24px;
            }
            height: 52px;
            line-height: 52px;
            background: #e9ebf2;
            flex: 1;
            position: relative;
            font-size: 22px;
            font-weight:bold;
            text-align: center; 
            color: #9aa1b1;
            cursor: pointer;
            &.side-buy {
              &::after {
                content: "";
                position: absolute;
                border-bottom-right-radius: 6px;
                z-index: 1;
                background: #e9ebf2;
                top: 0;
                right: -11px;
                width: 22px;
                -webkit-transform: skewX(-15deg);
                transform: skewX(-15deg);
                height: 52px;
              }
              &.side-active {
                margin-top: -8px;
                padding-top: 8px;
                background: #fff;
                color: #1f2533;
                &::after {
                  border-bottom-right-radius: 0;
                  border-top-right-radius: 6px;
                  background: #fff;
                  height: 60px;
                  right: -13px;
                  -webkit-transform: skewX(15deg);
                  transform: skewX(15deg);
                }
              }
            }
            &.side-sell {
              &::before {
                content: "";
                position: absolute;
                border-bottom-left-radius: 6px;
                z-index: 1;
                background: #e9ebf2;
                top: 0;
                left: -10px;
                width: 22px;
                -webkit-transform: skewX(15deg);
                transform: skewX(15deg);
                height: 52px;
              }
              &.side-active {
                margin-top: -8px;
                padding-top: 8px;
                background: #fff;
                color: #1f2533;
                &::before {
                  border-bottom-left-radius: 0;
                  border-top-left-radius: 6px;
                  background: #fff;
                  height: 60px;
                  left: -12px;
                  -webkit-transform: skewX(-15deg);
                  transform: skewX(-15deg);
                }
              }
            }
          }
        }
        .trade-content {
          padding: 50px 30px;
          .my-select {
            padding: 5px;
            height: 40px;
            line-height: 40px;
            border: 1px solid #e9ebf2;
            border-radius: 4px;
            .el-dropdown {
              width: 100%;
            }
          }
          h4 {
            font-size: 20px;
            color: #262626;
          }
        }
      }

    }
  }
}

.custom-dropdown {
  width: 388px;
  .custom-dropdown-item {
    height: 30px;
    line-height: 30px;
    padding-left: 5px;
    &:hover {
      background-color: rgba($primary, 0.1)
    }
  }
}
</style>