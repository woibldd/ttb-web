<template>
  <div>
    <zg-form :schema="schema"  label-width="80px"></zg-form>
  </div>
</template>

<script>
import ZgTable from './zg-table/zg-table'
import ZgForm from './zg-form'
export default {
  name: 'HelloWorld',
  components: {
    // ZgTable,
    ZgForm
  },
  data () {
    return {
      schema: [
        {
          type: 'input',
          vModel: 'name',
          required: true,
          label: '活动名称'
        },
        {
          type: 'select',
          config: {
            style: {
              width: '100%'
            }
          },
          vModel: 'date1',
          options: ['区域一', '区域二'],
          required: true,
          label: '活动区域'
        },
        {
          render (h) {
            return <div>
              <el-col span={11}>
                <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
              </el-col>
              <el-col class="line" style="text-align:center" span={2}>-</el-col>
              <el-col span={11}>
                <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
              </el-col>
            </div>
          },
          label: '活动时间'
        },
        {
          type: 'switch',
          vModel: 'delivery',
          label: '即时配送'
        },
        {
          type: 'radio-group',
          vModel: 'type',
          options: ['美食/餐厅线上活动', '地推活动', '线下主题活动', '单纯品牌曝光'],
          label: '活动性质'
        },
        {
          type: 'checkbox-group',
          vModel: 'checkbox',
          options: ['区域一', '区域二'],
          required: true,
          label: '活动区域'
        },
        {
          type: 'input',
          config: {
            type: 'textarea'
          },
          vModel: 'desc',
          label: '活动形式'
        },
        {
          render (h, { that, formData, context }) {
            return <div>
              <el-button type="primary" on-click={() => {
                console.log(context)
              }}>提交</el-button>
              <el-button >重置</el-button>
            </div>
          }
        }
      ]
    }
  },
}
</script>
