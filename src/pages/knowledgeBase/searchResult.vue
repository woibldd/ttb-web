<template>
  <div class="page-content knowledgeBase-result">
    <div class="result">{{ $t("knowledgeBase.result.total", { total }) }}</div>
    <template v-if="!isMobile">
      <div class="box" v-for="(item, index) in list" :key="index">
        <div class="title-box">
          <div class="title" v-html="setActive(keyword, locale == 'zh-CN' ? item.name_ch : item.name_en)" @click="goArticle(item)"></div>
          <div class="time">{{create_times(item)}}</div>
        </div>
        <div class="cons" v-html="setContent(item)"></div>
        <div class="links"  @click="goArticleList(item)">
          {{locale == 'zh-CN' ? item.parent_name_ch : item.parent_name_en}} > {{locale == 'zh-CN' ? item.support_name_ch : item.support_name_en}}
        </div>
      </div>
      <el-pagination v-if="list.length" layout="prev, pager, next" :current-page="currentPage" :total="total" @current-change="changePage"></el-pagination>
    </template>
    <div v-else class="list-box">
      <router-link class="link" :to="{name: 'helpDetails2', query: {first: first(item), second: second(item), id: item.article_id}}" v-for="(item, index) in list" :key="index">
        <span class="con">{{locale == 'zh-CN' ? item.name_ch : item.name_en}}</span>
        <i class="el-icon-arrow-right"></i>
      </router-link>
    </div>
  </div>
</template>

<script>
import utils from '@/modules/utils';
import http from '@/modules/request';
import moment from 'moment';

export default {
  data() {
    return {
      site: 11, // 101
      total: 0,
      currentPage: 1,
      size: 20,
      list: []
    };
  },
  computed: {
    lang() {
      return this.$t("knowledgeBase.result");
    },
    isMobile() {
      return utils.isMobile();
    },
    locale() {
      return this.$store.state.locale;
    },
    keyword() {
      return this.$route.query.keyword;
    }
  },
  mounted() {
    this.getData();
  },
  watch: {
    $route() {
      this.getData();
    }
  },
  methods: {
    async getData() {
      this.list = [];
      const params = {
        site: this.site,
        question: this.keyword,
        isChinese: this.locale == 'zh-CN' ? true : false, 
        pageNum: this.currentPage,
        size: this.size
      };
      const res = await http.get('/support/article/search', {params});
      if (res.code == 200) {
        this.list = res.data.data;
        this.currentPage = res.data.page;
        this.total = res.data.total;
      }
    },
    goArticle(item) {
      this.$router.push({
        name: 'helpDetails2',
        query: {first: this.first(item), second: this.second(item), id: item.article_id}
      });
    },
    goArticleList(item) {
      this.$router.push({
        name: 'helpDetails',
        query: {first: this.first(item), id: item.support_id}
      });
    },
    changePage(index) {
      this.currentPage = index;
      this.getData();
    },
    create_times(item) {
      return moment(item.create_time).format('YYYY-MM-DD HH:mm:ss');
    },
    setContent(item) {
      let content = this.locale == 'zh-CN' ? item.content_ch : item.content_en;
      let res = content.substring(0, 280) + '...';
      return this.setActive(this.keyword, res);
    },
    setActive(key, str) {
      return str.replace(key, `<span class="keyword">${key}</span>`);
    },
    first(item) {
      return this.locale == 'zh-CN' ? item.parent_name_ch : item.parent_name_en;
    },
    second(item) {
      return this.locale == 'zh-CN' ? item.support_name_ch : item.support_name_en;
    }
  }
};
</script>

<style lang="scss">
.knowledgeBase-result{
  .cons{
    p, img{display: none;}
    p:nth-child(1), p:nth-child(2){display: block;}
  }
  .keyword{color: $primary;}
}
</style>

<style lang="scss" scoped>
.knowledgeBase-result{
  padding-top: 18px;
  .result{height: 68px; line-height: 68px; font-size: 14px; color: #585858; border-bottom: #e5e5e5 solid 1px;}
  .box{margin-bottom: 15px; font-size: 14px; color: #1E2026;}
  .title-box{display: flex; justify-content: space-between; height: 68px; line-height: 78px;}
  .title{font-size: 18px; cursor: pointer;}
  .time{color: #959595;}
  .cons{
    line-height: 30px; margin-bottom: 15px; color: #959595;
  }
  .links{ cursor: pointer;}
}
@media only screen and (min-width: 320px) and (max-width: 1024px) {
  .knowledgeBase-result{
    padding-top: 0;
    .result{height: 32px; line-height: 32px; padding: 0 16px; font-size: 12px; color: #929292; border-bottom: none;}
  }
}
</style>
