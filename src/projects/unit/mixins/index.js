import { capitalizeLower, parseTime } from '../utils'
import { bigRound, toBig, toRound, toFixed, toThousand } from '../utils/handleNum'
import Big from 'big.js'
import store from '../store'
import {state} from '@/modules/store'
export default {
  // data () {
  //   return {
  //     state
  //   }
  // },
  computed: {
    thisName () {
      return capitalizeLower(this.$options.name)
    },
    langData () {
      return this.allLangData[this.thisName]
    },
    allLangData () {
      const locale = this.$i18n.locale
      return this.$i18n.messages[locale]
    },
    isLogin () {
      return !!this.$store.state.userData
      // return state.userInfo !== null
    }
  },
  methods: {
    gotoPath (path) {
      this.$router.push(path)
    },
    $tR (keyPath, locale) {
      return this.$t(`${capitalizeLower(this.thisName)}.${keyPath}`, locale)
    },
    $big: Big,
    bigRound,
    parseTime,
    confirm (content, title = '提示', options) {
      return this.$confirm(content, title, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        dangerouslyUseHTMLString: true,
        lockScroll: false,
        ...options
      }).catch(() => false)
    }
  },
  directives: {
    login: {
      // 不是很好用，打开页面时可能没拿到登陆信息就加载了这个指令，等拿到登录信息时需要删除指令很麻烦
      // 指令的定义
      inserted: function (el, binding, vnode) {
        if (!store.state.userInfo) {
          const domDiv = document.createElement('div')
          const context = vnode.context
          const loginText = context.$t('login.login_by_count')
          const registerText = context.$t('login.register_count')
          domDiv.className = 'directive-login'
          domDiv.innerHTML = `
            <div class="el-button el-button--success">${loginText}</div>
            <div class="el-button el-button--danger">${registerText}</div>
          `
          el.append(domDiv)
          domDiv.addEventListener('click', e => {
            if (e.target.innerText === loginText) {
              // context.$router.push({ path: '/user/login', query: { redirect: context.$route.path }})
              location.href = '/user/login'
            } else if (e.target.innerText === registerText) {
              // context.$router.push({ path: '/user/register', query: { redirect: context.$route.path }})
              location.href = '/user/register'
            }
          })
        }
      }
    }
  },
  filters: {
    parseTime,
    bigRound,
    toBig,
    toRound,
    toFixed,
    toThousand
  }
}
