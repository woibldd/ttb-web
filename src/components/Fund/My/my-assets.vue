<template>
 <div class="my-fund-content">
      <div class="information">
        <icon name='information' />
        <span >{{$t('otc_otutcol_16')}}        </span>
      </div>
      <div class="fund-total">
        <div class="total__label">{{ $t('my_balance_equal') }}</div>
        <div class="total__coin">{{ total || 0 | fixed(unit.scale) }} {{ unit.name }}</div>
        <!--  百万usdt活动需要,先写死 -->
        <!-- <div
          class="fund-with-usdt"
          v-if="plusMillionUsdt"
        >+{{ millionUsdtAmount }} USDT≈ {{ $big(total).plus($big(plusUsdtEst)).toString() }} {{ unit.name }}</div>-->
      </div> 
      <div>
        <div class="pairs-search test">
          <div class="search-box">
            <input
              type="text"
              @input="filterPair()"
              v-model="search">
            <icon
              class="ml-5"
              name="home-search"/>
          </div>
          <div class="ml-20">
            <el-tooltip :content="tipContent" placement="bottom">
              <el-checkbox 
                v-model="hideSmall">{{ $t('fund_my_assets_hide')}}</el-checkbox> 
            </el-tooltip>
          </div>
        </div> 
      </div>
      <el-table :empty-text=" $t('no_data') " :data="showList" class="fund-coin-pool">
        <el-table-column v-for="(hd, idx) in header" :key="idx" :prop="hd.key" 
          style="width:100px;"
          :label="hd.title">
          <template slot-scope="scope">
            <span v-if="hd.key === 'currency'">
              <icon :name="scope.row.currency"/> 
              <i>{{ scope.row[hd.key] }}</i>
            </span>
            <span v-else-if="hd.key==='estValue'">{{ scope.row[hd.key] || 0 | fixed(unit.scale) }}</span>
            <span v-else>{{ scope.row[hd.key] || 0 | fixed(8) }}</span>
          </template>
        </el-table-column>
        <el-table-column>
          <template slot-scope="scope"> 
            <template v-if="scope.row.currency==='USDT'">
              <label class="my-fund-label"
                v-if="is_nodes === false"
                @click="nodeBuy"
                v-tooltip.top="{html: true, content: $t('fund_assets_node_buy_tip'), classes: 'assets'}">
                {{$t('fund_assets_node_buy')}}
              </label>
              <label class="my-fund-label dis-my-fund-label"
               v-else>
                {{$t('fund_assets_subscribed')}}
              </label> 
            </template>
          </template> 
        </el-table-column>
        <el-table-column
          header-align="right"
          align="right"
          min-width="400px" 
          :label="operate.title"
        >
          <template slot-scope="scope">
            <template v-if="is_nodes === false">
                <label class="my-fund-label"
                v-if="scope.row.currency==='USDT'"
                @click="nodeBuy"
                v-tooltip.top="{html: true, content: $t('fund_assets_node_buy_tip'), classes: 'assets'}" 
                >
                {{$t('fund_assets_node_buy')}}
                </label>
            </template>
            <template v-else>
                <label class="my-fund-label dis-my-fund-label"
                v-if="scope.row.currency==='USDT'" 
                >
                {{$t('fund_assets_subscribed')}}
                </label>
            </template>
            <span 
              class="my-fund-operate"> 
               <a href="javascript:;" class="menu-name" @click="routerTransFer(scope.row)">
                  {{ $t('suvbanean') }}
              </a>
            </span>
            <router-link
              v-if="scope.row.depositable"
              :to="'/fund/deposit/' + scope.row.currency"
              class="my-fund-operate"
            >{{ $t('deposit') }}</router-link>
            <router-link
              v-if="scope.row.withdrawable"
              :to="'/fund/withdraw/'+scope.row.currency"
              class="my-fund-operate"
            >{{ $t('withdraw') }}</router-link>
            <router-link
              v-if="scope.row.pairs"
              :to="{
                name: 'trading',
                params: {
                  pair: scope.row.pairs
                }
              }"
              class="my-fund-operate" 
            >{{ $t('asset_trading') }}</router-link>
          </template>
        </el-table-column>
      </el-table>
    </div> 
</template>