// import defaultSettings from '@/settings'

const title = 'IX'

export default function getPageTitle (pageTitle) {
  if (pageTitle) {
    console.log('pageTitle')
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
