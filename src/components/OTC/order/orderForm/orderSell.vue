
<template>
  <div class="otcaction">
    <!-- 标题 -->
    <div class="action-title title sell">{{sideTitle}}</div>
    <!-- 挂单 -->
    <div class="action-box">
      <!-- 买卖切换 -->
      <div class="sideTab">
        <div class="btn-left">
          <v-btn
            class="w-110 buy"
            radius="10"
            height="20"
            @click="closeSideBar"
            :label="$t('购买BTC')"
          />
        </div>
        <div class="btn-left">
          <v-btn
            class="w-110 cancel"
            radius="10"
            height="20"
            @click="closeSideBar"
            :label="$t('出售BTC')"
          />
        </div>
      </div>
      <!-- 订单设置 -->
      <div class="action-input-group">
        <div class="action-order">
          <ul>
            <li>
              <div class="label">当前指数</div>
              <div class="content">
                <span class="text">12345 CNY</span>
              </div>
            </li>
            <li>
              <div class="label">
                交易类型
                <span class="red">*</span>
              </div>
              <div class="content">
                <el-select v-model="value" placeholder="请选择">
                  <el-option label="黄金糕" value="黄金糕"></el-option>
                  <el-option label="双皮奶" value="双皮奶"></el-option>
                </el-select>
              </div>
            </li>
            <li>
              <div class="label">
                浮动比例
                <span class="red">*</span>
              </div>
              <div class="content">
                <div class="el-number-input">
                  <el-input-number :max="130" :min="70" :controls="false" label="123123"></el-input-number>
                  <div class="unit-label long" v-html="'%'"></div>
                </div>
              </div>
            </li>
            <li>
              <div class="label">
                单价
                <span class="red">*</span>
              </div>
              <div class="content">
                <div class="el-number-input">
                  <div class="label">6.72</div>
                  <div class="unit-label long" v-html="'CNY'"></div>
                </div>
              </div>
            </li>
            <li>
              <div class="label">
                数量
                <span class="red">*</span>
              </div>
              <div class="content">
                <div class="el-number-input">
                  <el-input-number :controls="false"></el-input-number>
                  <div class="unit-label long" v-html="'BTC'"></div>
                </div>
              </div>
            </li>
            <li>
              <div class="label">
                总金额
                <span class="red">*</span>
              </div>
              <div class="content">
                <div class="el-number-input">
                  <span class="text">12345</span>
                  <div class="unit-label long" v-html="'CNY'"></div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="more-setting">
          <span>更多设置</span>
        </div>
        <div class="action-order">
          <ul>
            <li>
              <div class="label">
                对手认证等级
                <span class="red">*</span>
              </div>
              <div class="content">
                <el-select v-model="value" placeholder="请选择">
                  <el-option label="KYC1" value="KYC1"></el-option>
                  <el-option label="KYC2" value="KYC2"></el-option>
                  <el-option label="KYC3" value="KYC3"></el-option>
                </el-select>
              </div>
            </li>
            <li>
              <div class="label">注册时间</div>
              <div class="content">
                <el-input v-model="input" placeholder="请输入内容"></el-input>
              </div>
            </li>
            <li>
              <div class="label">委托单备注</div>
              <div class="content">
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 2, maxRows: 4}"
                  v-model="input"
                  placeholder="请输入内容"
                ></el-input>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <!-- 订单信息 -->
      <div v-if="step===1" class="action-order-info wrap">
        <v-list/>
      </div>
      <!-- footer做一个吸底盒 -->
      <!-- 按钮 -->
      <div class="footer">
        <div class="action-button-group">
          <div class="msg success">您的委托单已发布成功</div>
          <!--挂卖单-->
          <div>
            <!-- 取消/发布卖单 -->
            <div v-if="step<1">
              <div class="btn-left">
                <v-btn
                  class="w-110 cancel"
                  radius="3"
                  height="30"
                  @click="closeSideBar"
                  :label="$t('cancel')"
                />
              </div>
              <div class="btn-left">
                <v-btn
                  class="w-208 sell"
                  radius="3"
                  height="30"
                  @click="closeSideBar"
                  :label="$t('发布卖单')"
                />
              </div>
            </div>
            <!-- 撤单/关闭 -->
            <div v-else-if="step===1">
              <div class="btn-left">
                <v-btn
                  class="w-110 cancel"
                  radius="3"
                  height="30"
                  @click="closeSideBar"
                  :label="$t('撤单')"
                />
              </div>
              <div class="btn-left">
                <v-btn
                  class="w-208 sell"
                  radius="3"
                  height="30"
                  @click="closeSideBar"
                  :label="$t('关闭')"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import vList from "@/components/OTC/vlist/vertical-table";
export default {
  data() {
    return {
      sideTitle: "发布出售委托单 BTC",
      amount: "",
      operation: 1, // 操作 1: 买/卖, 2: 发布委托
      operSide: 2, // 操作类型 1: 买 ,2: 卖
      step: 0 //步骤, 根据操作 和 类型 的不同,展示不同的结果
      /***
       * 买币: 0:无状态, 1: 下单, 2:线下付款, 3:已付款, 4: 等待放币
       * 卖币: 0:无状态, 1: 下订单, 2:等待付款, 3:去放币
       * 发布委托: 1: 发布委托, 2:委托单详情
       */
    };
  },
  components: {
    vList
  },
  methods: {
    openSideBar() {
      this.showSide = true;
    },
    closeSideBar() {
      this.showSide = false;
    }
  }
};
</script>