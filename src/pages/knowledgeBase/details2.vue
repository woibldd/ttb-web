<template>
  <div class="page-content knowledgeBase-details2">
    <div v-if="!isMobile" class="page-title">{{locale == 'zh-CN' ? article.name_ch : article.name_en}}</div>
    <div class="icon-box">
      <div class="img">
        <img :src="article.author_icon" alt="">
      </div>
      <div class="txt">
        <span class="name">{{article.author_name}}</span><br>
        <span class="time">{{create_times}}</span>
      </div>
    </div>
    <div class="content" v-html="locale == 'zh-CN' ? article.content_ch : article.content_en"></div>
    <router-link v-if="!isMobile" :to="{path: '/'}">{{$t('knowledgeBase.goHome')}}</router-link>
  </div>
</template>

<script>
import utils from '@/modules/utils';
import http from '@/modules/request';
import moment from 'moment';

export default {
  data() {
    return {
      site: process.env.SITE_ID, // 101
      article: {}
    };
  },
  computed: {
    isMobile() {
      return utils.isMobile();
    },
    locale() {
      return this.$store.state.locale;
    },
    create_times() {
      return moment(this.article.create_time).format('YYYY-MM-DD HH:mm:ss');
    }
  },
  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      const params = {
        site: this.site,
        articleId: this.$route.query.id
      };
      const res = await http.get('/support/article/detail', {params});
      if (res.code == 200) {
        this.article = res.data;
        this.$emit('paramsNav', this.article);
      }
    }
  }
}
</script>

<style lang="scss">
.knowledgeBase-details2{
  .content{
    p{width: 100%;}
    img{max-width: 100%;}
  }
}
</style>

<style lang="scss" scoped>
.knowledgeBase-details2{
  padding-bottom: 100px;
  .page-title{height: 20px; line-height: 20px; margin: 38px auto 10px; font-size: 20px; color: #1e2026;}
  .icon-box{height: 40px; padding: 13px 0;}
  .img{
    float: left; width: 40px; height: 100%; margin-right: 18px; border-radius: 50%; overflow: hidden;
    img{width: 100%;}
  }
  .txt{font-size: 12px; overflow: hidden;}
  .name{color: $primary;}
  .time{color: #ACACAC;}
  .content{padding: 30px; margin-bottom: 37px; border-top: #e5e5e5 solid 1px; border-bottom: #e5e5e5 solid 1px; text-align: left; word-wrap:break-word;}
}

@media only screen and (min-width: 320px) and (max-width: 1024px) {
  .knowledgeBase-details2{
    .icon-box{padding: 12px; margin-bottom: 10px; background: #fff;}
    .img{margin-right: 8px;}
    .content{padding: 13px; background: #fff; border-top: #efefef solid 1px; border-bottom: none;}
  }
}
</style>