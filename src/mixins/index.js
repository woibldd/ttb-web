import { capitalizeLower, parseTime } from '@/utils'
import { bigRound } from '@/utils/handleNum'
export const pairfix = {
  filters: {
    pairfix: str => (str || '').replace('_', '/'),
  }
}

export default {
  computed: {
    thisName() {
      return capitalizeLower(this.$options.name)
    },
    chineseLangData() {
      return this.$i18n.messages[this.$i18n.locale][this.thisName]
    },
    langData () {
      return this.allLangData[this.thisName]
    },
    allLangData () {
      const locale = this.$i18n.locale
      return this.$i18n.messages[locale]
    },
  },
  methods: {
    gotoPath(path) {
      this.$router.push(path)
    },
    $tR(keyPath, locale) {
      return this.$t(`${capitalizeLower(this.thisName)}.${keyPath}`, locale)
    },
    bigRound,
    parseTime
  },
  filters: {
    parseTime,
    bigRound
  }
}
