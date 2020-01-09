/*
 * FileName: zg-render.vue
 * Remark: 自定义render
 * Project: zg-element-table
 * Author: LiuBing
 * File Created: Tuesday, 19th March 2019 10:15:30 am
 * Last Modified: Tuesday, 19th March 2019 10:15:32 am
 * Modified By: LiuBing
 */
<script>
export default {
  name: 'ZgRender',
  functional: true,
  props: {
    scope: Object,
    render: Function
  },
  render: (h, ctx) => {
    return ctx.props.render ? ctx.props.render(h, ctx.props.scope) : ''
  }
}
</script>
