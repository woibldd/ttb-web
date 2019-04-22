<template>
  <div class="popover" v-if="popover">
    <div class="popover-background" @click="popover = false"></div>
    <div class="popover-content">
        <h2>资产划转：BTC</h2>
        <select class="" name="" v-model="select1" @change="change1">
          <option value="1">777账户</option>
          <option value="2">合约账户</option>
        </select>
        至
        <select class="" name="" v-model="select2" @Change="change2">
          <option value="1">合约账户</option>
          <option value="2">币币账户</option>
        </select>
        <div class="balance">
          <span>余额：{{ (holding.available_balance || 0) | fixed(valueScale) }} </span>
          <span class="fr">余额： {{ (holding.available_balance || 0) | fixed(valueScale) }} </span>
        </div> 
        <div class="input-label">
          <input type="number" name="" v-model="amountNumber" value="" placeholder="输入转入数量">
          <label for="" @click="amounts">全部</label>
        </div> 
        <div class="footer">
          <button type="button" name="button" class="popover-qx" @click="popover = false">取消</button>
          <button type="button" name="button" class="popover-hz" @click="gm">立即划转</button>
        </div>
    </div>
  </div>
</template>
