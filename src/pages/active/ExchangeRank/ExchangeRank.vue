<template>
  <div class="exchange-rank">
    <div class="exchange-rank-container">
      <div class="banner">
        <div class="banner__info">
          <div class="info-text">
            <span class="all-people">{{ $t('activity_rank_all_people') }}</span>
            {{ $t('activity_rank_mine_competition') }}
          </div>
          <div class="info-time">
            <span class="time-label">{{ $t('activity_time') }}</span><!--
            --><span class="date">{{ $t('activity_rank_time_detail') }}</span>
          </div>
        </div>
      </div>
      <div class="body">
        <div class="flex-column">
          <div class="flex-box reward">
            <div class="box-title">
              {{ $t('activity_rank_total_reward_yet') }}
            </div>
            <div class="reward-num">
              {{ total.pool | round(2) | thousand }} <span class="unit">USDT</span>
            </div>
            <div
              class="reward-recent"
              v-if="recentList && recentList.length"
            >
              <div
                class="scrollTop"
                ref="marque"
              >
                <div
                  class="marque"
                  v-for="recentItem in recentList"
                  :key="recentItem.user_id">
                  <span class="col">{{ $t('user') }}</span>
                  <span class="col uid">{{ getEncodeContent(recentItem.user_id) }}</span>
                  <span class="col time">{{ recentItem.join_time | ts2date }}</span>
                  <span class="col">{{ $t('join_match') }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="flex-box rank pt-22">
            <div class="box-title pb-23">
              {{ $t('activity_rank_people') }}
            </div>
            <div class="mine-box">
              <div
                class="box-table"
              >
                <div class="box-table-th">
                  <span class="th_td rank_pos">{{ $t('activity_rank_rank_position') }}</span>
                  <span class="th_td uid">UID</span>
                  <span class="th_td time">{{ $t('mine_mined') }} IX</span>
                  <span class="th_td state">{{ $t('activity_rank_estimate_reward') }} USDT</span>
                </div>
                <div
                  class="box-table-tr"
                  :key="index"
                  v-if="rankList && rankList.length > 0"
                  v-for="(item,index) in rankList">
                  <span class="rank_pos pl-10">
                    <icon
                      name="rank-leading"
                      class="icon-rank-leading"
                      v-if="item.rank < 5"/>
                    {{ item.rank }}
                  </span>
                  <span class="uid">{{ getEncodeContent(item.user_id) }}</span>
                  <span class="mined">{{ item.mined_amount | round(8) | thousand }}</span>
                  <span class="state">{{ item.reward | round(2) | thousand }}</span>
                </div>
                <div
                  class="box-table"
                  v-if="!rankList || !rankList.length">
                  <span class="emtpy">
                    {{ $t('activity_rank_no_rank_people') }}
                  </span>
                </div>
              </div>

            </div>
            <div
              class="rank__bottom"
            >
              <div
                class="my_all_mine mr-169"
                v-show="hasMine">{{ $t('activity_rank_my_mined') }} <span class="unit">{{ myInfo.mined_amount|round(2)|thousand }} IX</span></div>
                <!-- <div class="my_all_mine">{{ $t('activity_rank_rank_position') }}: {{ 99 }}</div> -->
            </div>
          </div>

        </div>
        <div class="flex-column right">
          <div class="flex-box enroll">
            <div class="box-title">
              {{ $t('activity_rank_sign') }}
            </div>
            <div
              v-if="!myInfo.is_join"
              class="enroll__button btn"
              @click.prevent="confirmEnroll">
              {{ $t('activity_rank_i_signing') }}
            </div>
            <div
              v-else
              class="enroll__button btn done"
            >
              {{ $t('activity_rank_already_signed') }}
            </div>

            <div class="box__tips mt-26">
              <span class="unit">* </span>{{ $t('activity_rank_signing_tips') }}
            </div>
          </div>
          <div class="flex-box rule pt-28">
            <div class="box-title mb-20">
              {{ $t('activity_rank_rules') }}
            </div>
            <div class="rules__detail">
              <p v-html="$t('activity_rank_reward_rules_a')"/>
              <p v-html="$t('activity_rank_reward_rules_b')"/>
              <p v-html="$t('activity_rank_reward_rules_c')"/>
              <p v-html="$t('activity_rank_reward_rules_d')"/>
              <p v-html="$t('activity_rank_reward_rules_e')"/>
              <p v-html="$t('activity_rank_reward_rules_f')"/>
              <p v-html="$t('activity_rank_reward_rules_g')"/>
              <div class="box__tips pb-30">
                * {{ $t('activity_explaination_ix') }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <v-modal
      :open.sync="showDialog"
      :backdrop="true"
    >
      <div class="ensure-modal">
        <div class="title">{{ $t('tips') }}</div>
        <div
          class="body"
          v-html="$t('confirm_complete_kyc2', {link: '/profile/kyc/'})"/>
        <div class="footer">
          <router-link
            class="btn to_verify mb-8"
            @click="showDialog = false"
            :to="{name: 'Kyc'}">{{ $t('to_verify') }}</router-link>
        </div>
    </div></v-modal>

  </div>
</template>
<script>
import {state, actions} from '@/modules/store'
import utils from '@/modules/utils'
import service from '@/modules/service'
import isEmpty from 'lodash/isEmpty'

export default {
  data () {
    return {
      rankList: [],
      state,
      showDialog: false,
      myInfo: {},
      recentList: [],
      total: {},
      timer: 0,
      time2: 0
    }
  },
  computed: {
    isLogin () {
      if (this.state.userInfo) {
        return true
      }
      return false
    },
    activityTime () {
      return '2018年10月21日00:00-2018年10月27日24:00'
    },
    hasMine () {
      return !isEmpty(this.myInfo)
    }
  },
  methods: {
    async confirmEnroll () {
      if (!this.isLogin) {
        actions.setLoginBack({
          fullPath: this.$route.fullPath
        })
        this.$router.push({
          name: 'login'
        })
      } else if (this.state.userInfo.lv < 1 || this.state.userInfo.state !== 2) {
        this.showDialog = true
      } else {
        let res = await service.enrollMineMatch()
        if (!res.code) {
          utils.success(this.$t('activity_rank_already_signed'))
          this.myInfo.is_join = 1
          this.getRecentList()
        } else {
          utils.alert(res.message)
        }
      }
    },
    async getRecentList () {
      let res = await service.getRecentMatchList()
      if (!res.code && res.data && res.data.length > 0) {
        this.recentList = res.data.sort((a, b) => b.join_time - a.join_time)
        if (this.recentList.length > 0) {
          this.scrollTop()
        }
      }
    },
    getEncodeContent (content) {
      return utils.publicDesensitization(content)[0]
    },
    scrollTop () {
      clearInterval(this.timer)
      let i = 0
      let down = true
      this.timer = setInterval(() => {
        let area = this.$refs['marque']
        let offset = (down ? ++i : --i) * 40
        if (offset >= area.scrollHeight - 40 || offset < 0) {
          down = !down
        }
        area.style.transform = 'translateY(-' + offset + 'px)'
      }, 5e3)
    }
  },
  async created () {
    await actions.updateSession()
    if (this.isLogin) {
      let res = await service.getMyMatchTotal()
      if (!res.code) {
        this.myInfo = res.data
      }
    }
    this.getRecentList()

    let [totalRes, rankRes] = await Promise.all([service.getMatchRewardPool(), service.getMatchRewardRank()])
    if (!totalRes.code) {
      this.total = totalRes.data
    }
    if (!rankRes.code && rankRes.data && rankRes.data.length) {
      this.rankList = rankRes.data.splice(0, 10)
    }
    this.timer2 = setInterval(() => {
      this.getRecentList()
    }, 60e3)
  },
  destroyed () {
    clearInterval(this.timer)
    clearInterval(this.timer2)
  }
}
</script>
<style lang="scss" scoped>
@import './exchange.scss';
</style>
