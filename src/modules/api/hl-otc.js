import {getCache, request} from './api-base'
export default {
  //创建海浪用户
  sethlCreateUser(params) {
    return getCache('hl-create-user', () => request('otc/hilamg/memberUser/create', params), 1e3)
  },
  //查询一键买卖支持的币种列表
  gethlCoinList(params) {
    return getCache('hl-coin-list', () => request('otc/hilamg/coin/list', params), 1e3)
  }, 
  /**获取币种价格
   * unit 币种
   * type 0购买，1出售 
   * localCurrency 计价方式（目前仅支持CNY）
   * @returns 
   */
  gethlPriceByUnit(params) {
    return request('otc/hilamg/getPriceByUnit', params)
  },
  /** 一键买币按数量/金额购买
   * coin_symbol 币种 USDT
    * currency 计价方式（目前仅支持CNY）
    * price_type 0按数量，1按金额
    * coin_amount 购买数量（priceType为0时必传，支持8位小数）
    * money 购买金额（priceType为1时必传，支持2位小数）
    * pay_type 支付方式，EBANK":银行卡 "WEIXIN":微信支付 "ALIPAY":支付宝支付
    *  site 站点 默认是2
   */
  sethlQuickByAmount(params) {
    return request('otc/hilamg/quick/byamount', params)
  },
  /**一键卖币按数量/金额出售
   * user_id 用户id
   * coin_symbol 购买币种
   * currency 法币类型(CNY)
   * pay_type 收付款方式 
   * price_type 0按数量，1按金额
   * coin_amount 出售数量
   * money 出售金额（priceType为1时必传，支持2位小数）
   */
  sethlQuickSellMoney(params) {
    return request('otc/hilamg/quick/sell/money', params)
  },
  /**获取订单详情
   * other_order_id 订单号
   */
  gethlOrderDetail(params) {
    return getCache('hl-order-detail', () => request('otc/hilamg/order/detail', params), 1e3)
  },
  /**获取用户订单记录
   * type 买卖方向(BUY或者SELL,可传可不传)
   * coin_symbol 币种符号(USDT)
   * currency_symbol 货币符号(CNY)
   * orderStatus 订单状态(可传可不传)
   * page 页码
   * size 条数 
   */
  gethlOrderMyOrder(params) {
    return getCache('hl-order-myorder', () => request('otc/hilamg/order/myOrder', params), 1e3)
  },
  /** 用户付款前取消订单
   * other_order_id 订单号
   */
  sethlOrderCancel(params) {
    return getCache('hl-order-cancel', () => request('otc/hilamg/quick/orders/cancel', params), 1e3)
  },
  /** 用户付款 
   * other_order_id 订单号;  
   */
  sethlOrderPayMoney(params) {
    return getCache('hl-order-pay-money', () => request('otc/hilamg/quick/orders/payMoney', params), 1e3)
  },
  /** 用户放币
   * @param {Object} params 
   * other_order_id 订单号;  
   */
  sethlOrderRelease(params) {
    return getCache('hl-order-release', () => request('/otc/hilamg/order/release', params), 1e3)
  },
  /** 查询已设置的收付款信息 
   * @param {String} user_id 
   */
  gethlUserPayInfo(params) {
    return getCache('hl-user-pay-info', () => request('/otc/hilamg/memberUser/getPayInfo', params), 1e3)
  },
  /** 添加收付款信息 
   * @param {*} user_id 用户id
   * @param {*} pay_mode 支付方式 EBANK":银行卡 "WEIXIN":微信支付 "ALIPAY":支付宝支付
   * @param {*} name 姓名
   * @param {*} currency 币种(非必须 ,默认CNY)
   * @param {*} bank 开户银行
   * @param {*} branch 开户支行(选填)
   * @param {*} card_number  银行卡号
   * @param {*} aliNo 支付宝账号
   * @param {*} qrCodeUrl 支付宝二维码
   * @param {*} weChat_account 微信账号
   * @param {*} qrWeCodeUrl 微信二维码
   * @param {*} realName 真实姓名 
   */
  sethlSavePayInfo(params) {
    return request('/otc/hilamg/memberUser/savePayInfo', params)
  },
  /** 删除用户收付款信息
   * @param {*} user_id 用户id
   * @param {*} pay_mode 支付方式 EBANK":银行卡 "WEIXIN":微信支付 "ALIPAY":支付宝支付
   */
  sethlDeletePayInfo(params) {
    return request('/otc/hilamg/memberUser/deletePayInfo', params)
  },
  /** 用户申诉 
   * @param {*} other_order_id  订单号
   * @param {*} remark 备注
   */
  sethlOrderAppeal(params) {
    return request('/otc/hilamg/order/appeal', params) 
  },
  /** 通过成交
   * @param {*} other_order_id 订单号
   */
  sethlOrderAuditPass(params) {
    return request('/otc/hilamg/orders/audit/pass', params)
  },
  /** 拒绝成交
   * @param {*} params  other_order_id 订单号
   */
  sethlOrderAuditRefuse(params) {
    return request('/otc/hilamg/orders/audit/refuse', params)
  },
  //海浪otc回调
  sethlCallback(params) {
    return request('/otc/fobit/hilamgCallback', params)
  }, 
  /** 查询是否满足交易条件 
   * @param {*} user_id 用户id 
   */
  gethlIsQualified(params) {
    return getCache('hl-is-qualified', () => request('/otc/hilamg/is_qualified', params), 1e3)
  },





}