<template>
  <div class="knowledgeBase-page">
    <div v-if="$route.name != 'helpDetails2'" class="search-box">
      <div class="title">{{lang.searchTitle}}</div>
      <el-input :placeholder="lang.placeholder" v-model="keyword">
        <i slot="suffix" class="el-input__icon el-icon-search" @click="search"></i>
      </el-input>
    </div>
    <div v-if="$route.name != 'knowledgeBaseIndex'" class="breadcrumb">
      <div class="page-content">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ name: 'knowledgeBaseIndex' }">{{$t('footer_help')}}</el-breadcrumb-item>
          <el-breadcrumb-item :to="item.to" v-for="(item, index) in breadcrumb" :key="index">{{item.txt}}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <router-view :key="$route.fullpath" @paramsNav="paramsNav"></router-view>
  </div>
</template>

<script>
export default {
  data() {
    let keyword = this.$route.query.keyword || '';
    return {
      keyword,
      breadcrumb: [],
      breadcrumbData: {}
    };
  },
  computed: {
    lang() {
      return this.$t('knowledgeBase');
    },
    locale() {
      return this.$store.state.locale;
    }
  },
  watch: {
    locale() {
      this.setBreadcrumb(this.breadcrumbData);
    }
  },
  methods: {
    search() {
      this.$router.push({name: 'searchResult', query: {keyword: this.keyword}});
    },
    paramsNav(nav) {
      this.breadcrumbData = nav;
      this.setBreadcrumb(this.breadcrumbData);
    },
    setBreadcrumb(data) {
      const locale = this.locale == 'zh-CN' || this.locale == 'zh-HK';
      switch(this.$route.name) {
        case 'helpDetails':
          this.breadcrumb = [{txt: locale ? data.parentNameCh : data.parentNameEn, to: ''}];
          break;
        case 'helpDetails2':
          this.breadcrumb = [
            {txt: locale ? data.parent_name_ch : data.parent_name_en, to: {name: 'helpDetails', query: {id: data.support_id}}},
            {txt: locale ? data.support_name_ch : data.support_name_en, to: ''}
          ];
          break;
        case 'searchResult':
          this.breadcrumb = [{txt:  this.lang.result.title, to: ''}];
          break;
      }
    }
  }
}
</script>

<style lang="scss">
.knowledgeBase-page{
  .search-box{
    height: 180px; padding: 35px 0 0 0; background: $home-header-bgdark; color: #fff; text-align: center;
    .title{margin-bottom: 25px; font-size: 24px;}
    .el-input{width: 607px;}
    .el-input__inner{height: 44px; color: #fff; background: #5e5e5e; border: none;}
    .el-input__icon{cursor: pointer;}
  }
  .page-content{
    width: $page-width; margin: 0 auto;
  }
  .breadcrumb{box-shadow: 0px 0px 8px 0px rgba(211,211,211,0.35);}
  .el-breadcrumb{height: 54px; line-height: 54px;}
  .el-breadcrumb__inner.is-link{color: #575757;}
  .el-breadcrumb__separator{color: #8c8c8c;}
  .el-breadcrumb__item:nth-last-of-type(1){max-width: 50%; text-overflow:ellipsis; white-space:nowrap; overflow:hidden;}
  
  .list-box{
    background: #fff; border-top: #efefef solid 1px; border-bottom: #efefef solid 1px;
    .link{
      display: flex; height: 40px; line-height: 40px; padding: 0 16px; color: #1E2026; border-bottom: #e5e5e5 solid 1px;
      &:nth-last-of-type(1){border-bottom: none;}
    }
    .con{flex: 1; margin-right: 10px; font-size: 12px; text-overflow:ellipsis; white-space:nowrap; overflow:hidden;}
    .el-icon-arrow-right{line-height: inherit;}
  }
}

@media only screen and (min-width: 320px) and (max-width: 1024px) {
  body{min-width: auto!important;}
  .knowledgeBase-page{
    background: #f9f9f9;
    .search-box, .page-content{width: 100%;}
    .search-box{
      height: auto; padding: 20px 0;
      .title{height: 14px; line-height: 14px; margin: 0 auto 13px; font-size: 13px;}
      .el-input{width: 303.5px;}
      .el-input__inner{height: 32px; line-height: 32px; font-size: 12px;}
      .el-input__icon{line-height: 32px;}
    }
    .breadcrumb{box-shadow: none;}
    .el-breadcrumb{height: 47px; line-height: 47px; padding: 0 16px;}
  }
}
</style>
