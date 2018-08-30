import eventHub from '@/modules/eventHub'

document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'hidden') {
    eventHub.$emit('page:hide')
  } else {
    eventHub.$emit('page:show')
  }
})

export default false
