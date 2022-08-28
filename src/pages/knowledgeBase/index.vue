<template>
<div class="knowledgeBase-index">
  <div class="main-box">
    <div class="page-content">
      <div class="item" v-for="(item, index) in firstPage" :key="index">
        <div class="item-title">{{locale == 'zh-CN' ? item.supportOne.name_ch : item.supportOne.name_en}}</div>
        <div class="content">
          <div class="box" v-for="child in item.list" :key="child.support_id" :title="getTitle(child)" @click="clickLink(child)">
            <div class="img"><img :src="child.icon" alt=""></div>
            {{getTitle(child)}}
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- 最新发布文章 -->
  <div class="article-title">
    <div class="page-content title">{{lang.articleTitle}}</div>
  </div>
  <div class="new-article">
    <div class="page-content article-box">
      <div class="content">
        <div class="box" v-for="(item,index) in newArticle" :key="index">
          <div class="txt" @click="goArticle(item)">{{locale == 'zh-CN' ? item.name_ch : item.name_en}}</div>
          <div class="sub" @click="clickLink(item)">
            {{locale == 'zh-CN' ? item.parent_name_ch : item.parent_name_en}} > {{locale == 'zh-CN' ? item.support_name_ch : item.support_name_en}}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import http from '@/modules/request';
import utils from '@/modules/utils'
import {state} from '@/modules/store';

export default {
  data() {
    return {
      site: 11, // 101
      firstPage: {},
      newArticle: []
    };
  },
  computed: {
    lang() {
      return this.$t('knowledgeBase.index');
    },
    locale() {
      return this.$store.state.locale;
    }
  },
  mounted() {
    this.getParams();
    this.getArticle();
  },
  methods: {
    async getParams() {
      const params = {site: this.site};
      const res = await http.get('/support/firstPage', {params});

      if (res.code == 200) {
        this.firstPage = res.data;
      }
    },
    async getArticle() {
      const res = await http.get('/support/query/latest/article', {params: {site: this.site}});
      if (res.code == 200) {
        this.newArticle = res.data;
      }
    },
    clickLink(item) {
      this.$router.push({name: 'helpDetails', query: {id: item.support_id}});
    },
    getTitle(item) {
      return this.locale == 'zh-CN' ? item.name_ch : item.name_en;
    },
    goArticle(item) {
      this.$router.push({name: 'helpDetails2', query: {id: item.article_id}});
    }
  }
}
</script>

<style lang="scss" scoped>
.knowledgeBase-index{
  padding-top: 70px; background: #f9f9f9;
  .new-article{padding: 0 0 60px 0; background: #fff;}
  .main-box, .article-box{
    overflow: hidden;
    .content{width: 120%; overflow: hidden;}
    .box{float: left; width: 294px; margin: 0 158px 30px 0; color: #1e2026; cursor: pointer;}
    .txt{font-size: 16px; margin-bottom: 10px; text-overflow:ellipsis; white-space:nowrap; overflow:hidden; &:hover{color: $primary;}}
    .sub{font-size: 12px; color: #999; text-overflow:ellipsis; white-space:nowrap; overflow:hidden; &:hover{color: $primary;}}
  }
  .main-box{
    .item-title{margin-bottom: 25px;}
    .content{padding: 10px; margin-bottom: 25px;}
    .box{
      width: 363px; height: 72px; line-height: 40px; padding: 16px 28px; margin: 0 48px 28px 0;
      box-sizing: border-box; background: #fff; box-shadow: 0px 0px 8px 0px rgba(211,211,211,0.35); 
      text-overflow:ellipsis; white-space:nowrap; overflow:hidden;
    }
    .img{
      float: left; width: 40px; height: 40px; margin-right: 26px; border-radius: 50%; overflow: hidden;
      img{width: 100%;}
    }
  }
  .item-title{margin-bottom: 35px; font-size: 24px;}
  .article-title{
    background: #fff; padding: 39px 0 37px;
    .title{height: 24px; line-height: 24px; font-size: 24px;}
  }
}

@media only screen and (min-width: 320px) and (max-width: 1024px){
  .knowledgeBase-index{
    padding-top: 0;
    .main-box, .article-box{
      .content{display: flex; justify-content: space-between; flex-wrap: wrap; width: 100%; padding: 0; margin-bottom: 0;}
    }
    .article-title{
      .title{padding: 0 12px; margin: 15px 0; font-size: 12px; color: #929292; box-sizing: border-box;}
    }
    .main-box{
      .box{width: 100%; height: 56px; line-height: 28px;  padding: 14px 12px; margin: 0 0 2px 0; font-size: 14px; box-shadow: none;}
      .img{float: left; width: 28px; margin-right: 8px;}
    }
    .article-box{
      background: #f9f9f9;
      .box{width: 100%; height: 77px; padding: 20px 12px 16px; margin: 0 0 2px 0; background: #fff; box-sizing: border-box;}
      .txt{font-size: 14px; margin-bottom: 5px;}
    }
    .item-title{margin: 15px 12px; font-size: 12px; color: #929292;}
    .article-title{background: #f9f9f9; padding: 0;}
  }
}
</style>