<template>
    <div class="test">
        <section class="title">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="用户名：">
                    <el-input name="username" v-model="username" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item label="密码：">
                    <el-input name="username" v-model="password" placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="register">注册</el-button>
                </el-form-item>
            </el-form>
        </section>
    </div>
</template>
<style>
    body {
        background: #F5F4F9
    }

    .gray-row {
        background: #F5F4F9;
        height: 50px;
        font-size: 12px;
        color: #7f828b;
    }

    .gray-row span {
        position: absolute;
        left: 15px;
        bottom: 5px;
    }

    .white-row {
        background: #FFFFFF;
    }

    .el-row {
        padding: 5px;
        border-top: 1px solid lightgray;

    &
    :last-child {
        margin-bottom: 0;
    }

    }
    .el-col {
        border-radius: 4px;
    }

    .bg-purple-dark {
        background: #99a9bf;
    }

    .bg-purple-white {
        background: #FFFFFF;
    }

    .bg-purple {
        background: #d3dce6;
    }

    .bg-purple-light {
        background: #e5e9f2;
    }

    .grid-content {
        /*border-radius: 4px;*/
        min-height: 36px;
    }

    .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }

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

    .el-input__inner {
        border: none !important;
    }

    .el-form-item__label {
        font-size: 15px;
        color: black;
    }

    .img-list .img-progress {
        text-align: center;
        padding-top: 50px;
    }

</style>
<script>
  import axios from '~/plugins/axios'

  export default {
    name: 'test',
    async asyncData () {

    },
    data () {
      return {
        form: {
          name: '',
          select: '',
          desc: ''
        },
        username: '',
        password: '',
        pass: true // 是否上传成功
      }
    },
    computed: {
      proStatus () { // 上传状态
        if (this.pass) {
          return 'success'
        } else if (this.pass === false) {
          return 'exception'
        } else {
          return ''
        }
      }
    },
    methods: {
      register () {
        var name = this.username
        var paw = this.password
        if (!name) {
          this.$message.error('用户名不能为空!')
          return
        }
        if (!paw) {
          this.$message.error('密码不能为空!')
          return
        }
        axios.post('/api/account/regist', {
          username: name,
          password: paw
        }).then((response) => {
          if (response.data) {
            var info = response.data
            if (info.errCode) {
              this.$message.error('注册失败：' + info.msg)
            } else {
              window.location = info
            }
          }
        })
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
