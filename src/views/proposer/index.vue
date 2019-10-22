<template>
  <div>
    <customForm :schema="schema"></customForm>
  </div>
</template>
<script>
import customForm from '@/components/customForm'
export default {
  components: {
    customForm
  },
  data () {
    return {
      schema: [
        { fieldType: 'input', prefixIcon: 'el-icon-search', placeholder: '邮箱或手机号', errorMassage: '请输入正确邮箱或手机号码', validate: (obj) => {
          return validEmail(obj.username) || validPhone(obj.username)
        }, vModel: 'username', default: '', required: true },
        { render() {
          return <div flex='main:justify cross:center'>
            <el-checkbox checked={this.checked} onChange={(value) => this.$emit('change', value)} >记住密码</el-checkbox>
            <div>
              <el-link type='info' onClick={() => this.$router.push('/user/register')} underline={false}>注册账号</el-link>
              <el-divider direction='vertical' />
              <el-link type='info' onClick={() => this.$router.push('/user/forget')} underline={false}>忘记密码</el-link>
            </div>
          </div>
        }, formItemStyle: { marginTop: '-20px' }, props: {
          checked: {
            type: Boolean,
            default: true
          }
        },
        model: {
          prop: 'checked',
          event: 'change'
        }, vModel: 'checked', default: true }
      ]
    }
  }
}
</script>