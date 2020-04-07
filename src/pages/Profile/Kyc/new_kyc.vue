<template>
  <div  class="profile-container"> 
    <div class="title-box">{{ $t('identity_authentication') }}<span>{{ $t('Verified') }}</span></div>
    <hr>
    <el-row>
      <el-col :span="24">
        身份认证（必填）
      </el-col>
    </el-row> 
    <el-row>
      <el-col :span="24">
        <span>上传护照或身份证照片（两面，如需）</span>  
        <b>保证照片清晰可见，照片最大不超过3M,最小不小于5KB， 支持的格式有：jpg，jpeg，png，bmp。</b>
      </el-col>
    </el-row>  
    <el-row :gutter="20">
      <el-col :span="8">上传证明（正）
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-col>
      <el-col :span="8">上传证明（反）
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="sub-title">
          证件信息（必填）
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8"> 
        <span>证件类型</span>
        <el-select  v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
        </el-select>
      </el-col>
      <el-col :span="8"> 
        <span>姓名</span>
        <el-input v-model="input" placeholder="请输入内容"></el-input>
      </el-col>
      <el-col :span="8"> 
        <span>证件号</span>
        <el-input v-model="input" placeholder="请输入证件号码"></el-input>
      </el-col> 
    </el-row>
    <el-row>
      <el-col :span="8"> 
        <span>证件号</span>
        <el-date-picker
          v-model="value1"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
      </el-col>
      <el-col :span="8"> 
        <span>生日</span>
        <el-date-picker
          v-model="value1"
          type="date"
          placeholder="输入生日信息">
        </el-date-picker> 
      </el-col>
      <el-col :span="8"> 
        <span>性别</span>
        <el-select  v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
        </el-select>
      </el-col> 
    </el-row>
    <el-row>
      <el-col :span="24"> 
        <span>出生地</span>
        <el-input type="textarea"
          v-model="textarea"
          :rows="2"> 
        </el-input>
      </el-col>
    </el-row> 
    <el-row>
      <el-col :span="24"> 
        <span>上传自拍照</span>
        <b>保证照片清晰可见，照片最大不超过3M,最小不小于5KB， 支持的格式有：jpg，jpeg，png，bmp。</b>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8"> 
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload> 
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="sub-title">地址证明（必填）</div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <span>国家</span>
        <el-select  v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
        </el-select>
      </el-col>
      <el-col :span="8">
        <span>州/省</span>
        <el-input v-model="input" placeholder="请输入内容"></el-input>
      </el-col>
      <el-col :span="8">
        <span>城市/镇</span>
        <el-input v-model="input"></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-input type="textarea" v-model="textarea" :rows="3"></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <span>地址证明</span>
        <b>上传最近三（3）个月内的近期电话费，水电费账单或银行对帐单。</b>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-select v-model="value">
          <el-option 
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <span>上传证明</span>
        <b>保证证件信息清晰可见，照片最大不超过3M,最小不小于5KB， 支持的格式有：jpg，jpeg，png，bmp。</b>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-col>
    </el-row>
    <el-row> 
      <el-col :span="8"> 
        <span>公司名称</span>
        <el-input v-model="input"></el-input>
      </el-col>
      <el-col :span="8"> 
        <span>月薪</span>
        <el-input v-model="input"></el-input>
      </el-col> 
    </el-row>
    <el-row>
      <el-col :span="24">
        <span>资金证明</span>
        <b>保证证件信息清晰可见，照片最大不超过3M,最小不小于5KB， 支持的格式有：jpg，jpeg，png，bmp。</b>
      </el-col>
    </el-row>
    <el-row> 
      <el-col :span="8">  
        <el-select v-model="value">
          <el-option 
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"></el-option>
        </el-select>
      </el-col> 
    </el-row>
    <el-row>
      <el-col :span="24">
        <span>上传证明</span>
        <b>保证证件信息清晰可见，照片最大不超过3M,最小不小于5KB， 支持的格式有：jpg，jpeg，png，bmp。</b>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        <el-button type="primary">提交</el-button>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        options: [{
            value: '选项1',
            label: '黄金糕'
          }, {
            value: '选项2',
            label: '双皮奶'
          }, {
            value: '选项3',
            label: '蚵仔煎'
          }, {
            value: '选项4',
            label: '龙须面'
          }, {
            value: '选项5',
            label: '北京烤鸭'
          }
        ],
        value: '',
        input: '',
        textarea: '',
        imageUrl: ''
      }
    },
    methods: {
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
    }
  }
</script>