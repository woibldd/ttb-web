<template>
  <el-upload
    class="upload"
    :action="host"
    :data="config"
    :show-file-list="false"
    :drag="true"
    accept="image/*"
    :on-success="handleSuccess"
    :on-progress="handleProgress"
    :on-error="handleError"
    :before-upload="beforeUpload">
    <slot
      :file="file"
      :dataUrl="dataUrl"/>
  </el-upload>
</template>
<script>
import {convert} from '@/modules/image-compressor'
export default {
  name: 'ImageUpload',
  props: {
    type: {
      type: String
    },
    host: {
      type: String
    },
    config: {
      type: Object
    },
    maxSide: {
      type: Number,
      default: 1024
    },
    maxSize: {
      type: Number,
      default: 5 * 1024 * 1024
    },
    url: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      dataUrl: this.url || '',
      file: {}
    }
  },
  methods: {
    handleSuccess (event, file) {
      this.$emit('uploadSuccess', {type: this.type, file: file})
    },
    handleProgress (event, file) {
      this.$emit('uploadProgress', {type: this.type, file: file})
    },
    beforeUpload (file) {
      convert(file, {maxSide: this.maxSide}, (err, data) => {
        if (err) {
          this.$emit('uploadError', {type: this.type, message: this.$i18n.t('sth_went_wrong')})
          return false
        }
        // data.blob.lastModifiedDate = new Date()
        // data.blob.name = this.id + '.jpeg'
        if (this.maxSize && data.blob.size > this.maxSize) {
          this.$emit('uploadError', {type: this.type, message: this.$i18n.t('err_upload_oversize')})
          return false
        }
        this.file = data.blob
        this.dataUrl = data.url
        this.$emit('uploadStart', {type: this.type, dataUrl: this.dataUrl, file: this.file})
        return true
      })
    },
    handleError (err, file) {
      console.log(err)
      this.$emit('uploadError', {type: this.type, message: this.$i18n.t('sth_went_wrong')})
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
