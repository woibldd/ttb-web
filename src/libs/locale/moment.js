const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

function getEnDate (num) {
  if (num < 4) {
    return ['1st', '2nd', '3rd'][num - 1]
  }
  return num + 'th'
}

export default {
  getYear (num, locale) {
    if (locale === 'zh-CN' || locale === 'zh-HK' || locale === 'ja') {
      return num + '年'
    }
    if (locale === 'ko') {
      return num + '년'
    }
    return num
  },
  getMonth (num, locale) {
    if (locale === 'zh-CN' || locale === 'zh-HK' || locale === 'ja') {
      return (num + 1) + '月'
    }
    if (locale === 'ko') {
      return (num + 1) + '월'
    }
    return months[num]
  },
  getDate (num, locale) {
    if (locale === 'zh-CN' || locale === 'zh-HK' || locale === 'ja') {
      return num + '日'
    }
    if (locale === 'ko') {
      return num + '일'
    }
    return getEnDate(num)
  }
}
