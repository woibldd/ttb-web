import vue from 'vue'

// 这里就是我们刚刚创建的那个静态组件
import toastComponent from './toast.vue'

// 返回一个 扩展实例构造器
const ToastConstructor = vue.extend(toastComponent)

// 定义弹出组件的函数 显示时间
function showToast(obj, duration = 3000) {
  let timer = ''
  let distinguish = '上午'
  let date = new Date();
  this.hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
  this.minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  this.second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
  if(this.hour > 12) {
    distinguish = '下午'
    this.hour = this.hour - 12
  }

  timer = + this.hour + ":" + this.minute + ":" + this.second;
  distinguish = distinguish + timer

  // 实例化一个 toast.vue
  const toastDom = new ToastConstructor({
    el: document.createElement('div'),
    data() {
      return {
        title:obj.title,
        body:obj.body,
        color: obj.color,
        time: distinguish,
        showWrap: true,
        showContent: true,
        display: true,
        show:0,

      }
    }
  })

  // 把 实例化的 toast.vue 添加到 body 里
  document.body.appendChild(toastDom.$el)

  // 过了 duration 时间后隐藏
  setTimeout(() => {toastDom.show = '-340px'} ,duration)
  setTimeout(() => {toastDom.display = false} ,duration+300)
  // setTimeout(() => { document.body.removeChild(toastDom.$el)} ,duration+3000)
  
}

// 注册为全局组件的函数
function registryToast() {
  // 将组件注册到 vue 的 原型链里去,
  // 这样就可以在所有 vue 的实例里面使用 this.$toast()
  vue.prototype.$toast = showToast
}

export default registryToast
