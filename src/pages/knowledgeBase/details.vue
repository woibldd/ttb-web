<template>
<div class="page-content knowledgeBase-details">
  <template v-if="!isMobile">
    <div class="page-title">{{first}}</div>
    <div class="content">
      <div class="img">
        <img :src="infor.icon" alt="">
      </div>
      <div class="con">
        <div class="title">{{second}}</div>
        <div class="box">
          <div class="item-box">
            <router-link
              class="item"
              :to="{name: 'helpDetails2', query: {id: item.article_id}}"
              v-for="(item,index) in infor.list" :key="index"
            >
              <span class="icons"></span>{{locale == 'zh-CN' ? item.name_ch : item.name_en}}
            </router-link>
          </div>
          <el-pagination layout="prev, pager, next" :current-page="currentPage" :total="total" @current-change="changePage"></el-pagination>
        </div>
      </div>
    </div>
  </template>
  <div v-else class="list-box">
    <router-link class="link" :to="{name: 'helpDetails2', query: {id: item.article_id}}" v-for="(item, index) in infor.list" :key="index">
      <span class="con">{{locale == 'zh-CN' ? item.name_ch : item.name_en}}</span>
      <i class="el-icon-arrow-right"></i>
    </router-link>
  </div>
</div>
</template>

<script>
import utils from '@/modules/utils';
import http from '@/modules/request';

export default {
  data() {
    return {
      site: 2, // 101
      total: 0,
      currentPage: 1, size: 16,
      infor: {}
    };
  },
  computed: {
    isMobile() {
      return utils.isMobile();
    },
    locale() {
      return this.$store.state.locale;
    },
    first() {
      return this.locale == 'zh-CN' ? this.infor.parentNameCh : this.infor.parentNameEn;
    },
    second() {
      return this.locale == 'zh-CN' ? this.infor.supportNameCh : this.infor.supportNameEn;
    }
  },
  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      const params = {
        site: this.site,
        supportId: this.$route.query.id,
        pageNum: this.currentPage,
        size: this.size
      };
      const res = await http.get('/support/article/list', {params});
      if (res.code == 200) {
        this.infor = res.data.data;
        this.currentPage = res.data.page;
        this.total = res.data.total;
        this.$emit('paramsNav', this.infor);
      }
    },
    changePage(index) {
      this.currentPage = index;
      this.getData();
    }
  }
}
</script>

<style lang="scss" scoped>
.knowledgeBase-details{
  padding-top: 50px;
  .page-title{margin-bottom: 40px; font-size: 24px;}
  .content{display: flex;}
  .img{
    width: 40px; height: 40px; margin-right: 17px; text-align: center; border-radius: 50%; overflow: hidden;
    img{width: 100%;}
  }
  .con{flex: 1; padding-top: 5px;}
  .title{height: 20px; line-height: 20px; margin-bottom: 24px; font-size: 20px; color: $primary;}
  .box{margin-bottom: 45px;}
  .box-title{height: 16px; line-height: 16px; margin-bottom: 24px; font-size: 16px; color: $primary;}
  .item-box{
    display: flex; flex-direction: column; flex-wrap: wrap; height: 288px; line-height: 36px; margin-bottom: 20px; font-size: 14px; overflow: hidden;
    .item{
      width: 50%; padding-left: 16px; color: #585858; transition: .5ms;
      &:hover{
        color: $primary;
        .icons{background: $primary;}
      }
    }
    .icons{display: inline-block; width: 4px; height: 4px; margin-right: 10px; border-radius: 50%; background: #666; vertical-align: middle;}
  }
}
@media only screen and (min-width: 320px) and (max-width: 1024px) {
  .knowledgeBase-details{
    padding-top: 0;
    .item-title{margin: 15px 12px; font-size: 12px; color: #929292;}
  }
}
</style>