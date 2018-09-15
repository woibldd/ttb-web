<template>
  <div style="page-invite-wrap">
    <div class="user-center-right">
      <div class="profile-container">
        <div class="title-box">{{$t('identity_authentication')}}<span>{{$t('Verified')}}</span></div>
        <div class="invinfo-box">
            <div class="inp_box">
                <p>{{$t('name')}}</p>
                <input type="text" v-model="name" />
            </div>
            <div class="inp_box">
                <p>{{$t('kyc_id_type')}}</p>
                <el-select v-model="id_type">
                  <el-option :label="$t('kyc_idcard')" :value="1"/>
                  <el-option :label="$t('kyc_passport')" :value="2"/>
                </el-select>
            </div>
            <div class="inp_box">
                <p>{{$t('kyc_idcard')}}</p>
                <input type="text" v-model="id_number" />
            </div>
            <div class="inp_box">
                <v-btn class="submit-btn" :label="$t('sub')"
                :loading="loading"
                @click="submit"></v-btn>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import ProfileLeft from './ProfileLeft'
  import service from '@/modules/service'
  import VBtn from '@/components/VBtn'

  export default {
    name: 'SafeVerified',
    components: {
      ProfileLeft,
      VBtn
    },
    data () {
      return {
        name: '',
        id_type: 1,
        id_number: '',
        loading: false
      }
    },
    computed: {

    },
    methods: {
      async submit () {
        let params = {
          name: this.name,
          id_type: this.id_type,
          id_number: this.id_number
        }
        let result = await service.updateKyc1(params)
        if (result) {
          this.$router.push({
            name: 'ProfileInfo'
          })
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "../styles/vars";
  @import '../styles/mixins';

  .user-center-right {
    padding-left: 60px;
    float: left;
    .profile-container {
      width: 960px;
      position: relative;

      .title-box {
        width: 100%;
        height: 40px;
        font-size: 18px;
        font-weight: 600;
        color: $text-strong;
        border-bottom: 1px solid #e6e6e6;
        span{
            color: #666;
            font-size: 18px;
            font-weight: lighter;
            padding-left: 10px;
            i{
                color: #EB5757;
            }
            &:before{
                content: ">";
                color: #333;
                font-size: 18px;
                margin-right: 10px;
            }
        }
      }
      .invinfo-box {
        width: 445px;
        margin: 50px auto;
        div.inp_box{
            width:100%;
            height: 40px;
            margin-bottom: 30px;
            position: relative;
            p{
                float: left;
                width: 104px;
                height: 40px;
                line-height: 40px;
                color: #999;
            }
            input{
                padding-left: 15px;
            }
            select,input{
                display: block;
                width: 340px;
                height: 40px;
                float: left;
                margin: 0;
                box-sizing: border-box;
                border-radius: 4px;
                border:none;
                border:1px solid $c;
            }
            .submit-btn{
                width: 340px;
                height: 40px;
                margin-left: 104px;
            }
            span.tips{
                display: block;
                width: 300px;
                height: 30px;
                line-height: 20px;
                position: absolute;
                left: 104px;
                top: 40px;
                font-size: 10px;
                color: #EB5757;
            }
        }
      }
    }
  }
</style>
