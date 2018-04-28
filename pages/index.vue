<template>
    <div class="test">
        <!--<section class="title">-->
            <!--<el-input name="username" v-model="username" placeholder="请输入模板名称"></el-input>-->
            <!--<el-upload-->
                    <!--class="avatar-uploader"-->
                    <!--action="https://jsonplaceholder.typicode.com/posts/"-->
                    <!--:show-file-list="false"-->
                    <!--:on-success="handleAvatarSuccess"-->
                    <!--:before-upload="beforeAvatarUpload">-->
                <!--<img v-if="imageUrl" :src="imageUrl" class="avatar">-->
                <!--<i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
            <!--</el-upload>-->
            <!--<el-button @click="addUser">插入数据库</el-button>-->
        <!--</section>-->
        <el-dialog class="pop-mask">
            <el-input placeholder="请输入模板名称"></el-input>
        </el-dialog>

    </div>
</template>
<style>
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }

    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>
<script>
  import axios from '~/plugins/axios'
  import ElButton from '../node_modules/element-ui/packages/button/src/button.vue'

  export default {
    name: 'test',
    components: {ElButton},
    async asyncData () {

    },
    data () {
      return {
        username: '',
        imageUrl: ''
      }
    },
    methods: {
      addUser () {
        var name = this.username
        axios.post('/api/user/adduser', {
          username: name
        }).then((response) => {
          console.log(response)
        })
      },
      handleAvatarSuccess (res, file) {
        this.imageUrl = res // URL.createObjectURL(file.raw)
      },
      beforeAvatarUpload (file) {
        const isJPG = file.type === 'image/jpeg'
        const isLt2M = file.size / 1024 / 1024 < 2

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!')
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!')
        }
        return isJPG && isLt2M
      }
    },
    head () {
      return {
        title: '首页'
      }
    }
  }
</script>

<style scoped>
    .title {
        margin: 30px 0;
    }

    .users {
        list-style: none;
        margin: 0;
        padding: 0;
    }

    .user {
        margin: 10px 0;
    }
</style>
