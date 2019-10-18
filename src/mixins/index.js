import { capitalizeLower, parseTime } from '@/utils'
import { bigRound } from '@/utils/handleNum'
export const pairfix = {
  filters: {
    pairfix: str => (str || '').replace('_', '/'),
    bigRound
  }
}
export default {
  methods: {
    bigRound,
    parseTime
  },
  filters: {
    bigRound,
    parseTime
  }
}