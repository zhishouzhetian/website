<template>
    <div class="test">
        <section class="title">
            <el-form ref="form" :model="form" label-width="80px">
                <el-row class="white-row">
                    <el-form-item label="合同身份">
                        <el-select v-model="form.region" placeholder="请选择您的合同身份">
                            <el-option label="身份一" value="shanghai"></el-option>
                            <el-option label="身份二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                </el-row>
                <el-row class="gray-row"  style=" height: 20px;">
                </el-row>
                <el-row class="white-row">
                    <el-form-item label="借款金额">
                        <el-col :span="18">
                            <el-input name="username" v-model="form.name" placeholder="请输入"></el-input>
                        </el-col>
                        <el-col class="line" :span="6">元</el-col>
                    </el-form-item>
                </el-row>
                <el-row class="white-row">
                    <el-form-item label="借款用途">
                        <el-input name="username" v-model="form.name" placeholder="请输入"></el-input>
                    </el-form-item>
                </el-row>
                <el-row class="gray-row">
                    <span>出借人（甲方）支付借款金额的时间</span>
                </el-row>
                <el-row class="white-row">
                    <el-form-item label="借款时间">
                        <el-date-picker type="date" :editable="false" placeholder="选择日期" v-model="form.date1"
                                        style="width: 100%;"></el-date-picker>
                    </el-form-item>
                </el-row>
                <el-row class="gray-row">
                    <span>借款人（乙方）还款方式</span>
                </el-row>
                <el-row class="white-row">
                    <el-form-item label="还款方式">
                        <el-select v-model="form.region" placeholder="请选择您的还款方式">
                            <el-option label="还款方式一" value="shanghai"></el-option>
                            <el-option label="还款方式二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                </el-row>
                <el-row class="white-row">
                    <el-form-item label="还款时间">
                        <el-date-picker type="date" :editable="false" placeholder="选择日期" v-model="form.date1"
                                        style="width: 100%;"></el-date-picker>
                    </el-form-item>
                </el-row>
                <el-row class="gray-row">
                    <span>借款人（乙方）指定收款账号</span>
                </el-row>
                <el-row class="white-row">
                    <el-form-item label="账号选择">
                        <el-select v-model="form.region" placeholder="请选择您的账号">
                            <el-option label="账号一" value="shanghai"></el-option>
                            <el-option label="账号二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                </el-row>
                <el-row class="white-row">
                    <el-form-item label="收款账号">
                        <el-input name="username" v-model="form.name" placeholder="请输入"></el-input>
                    </el-form-item>
                </el-row>
                <el-row class="gray-row"  style=" height: 20px;">
                </el-row>
                <el-row class="white-row">
                    <el-form-item label="借款人（乙方）是否需要抵押物" label-width="230px">
                        <mt-switch v-model="form.delivery"></mt-switch>
                    </el-form-item>
                </el-row>
                <el-row class="white-row">
                    <span>身份信息</span>
                    <el-form-item label="">
                        <el-upload
                                class="avatar-uploader"
                                list-type="picture"
                                action="/api/upload/upload"
                                :headers="uphead"
                                :show-file-list="false"
                                :on-success="handleAvatarSuccess"
                                :on-progress="uploadOnProgress"
                                :before-upload="beforeAvatarUpload">
                            <img v-if="pass" :src="imageUrl" class="avatar">
                            <div v-else class="img-content img-progress">
                                <el-progress type="circle" :percentage="progress"></el-progress>
                            </div>
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                        <el-upload
                                class="avatar-uploader"
                                list-type="picture"
                                action="/api/upload/upload"
                                :headers="uphead"
                                :show-file-list="false"
                                :on-success="handleAvatarSuccess"
                                :on-progress="uploadOnProgress"
                                :before-upload="beforeAvatarUpload">
                            <img v-if="pass" :src="imageUrl2" class="avatar">
                            <div v-else class="img-content img-progress">
                                <el-progress type="circle" :percentage="progress"></el-progress>
                            </div>
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                </el-row>
                <!--<el-row class="white-row">-->
                    <!--<el-form-item label="活动性质">-->
                        <!--<el-checkbox-group v-model="form.type">-->
                            <!--<el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>-->
                            <!--<el-checkbox label="地推活动" name="type"></el-checkbox>-->
                            <!--<el-checkbox label="线下主题活动" name="type"></el-checkbox>-->
                            <!--<el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>-->
                        <!--</el-checkbox-group>-->
                    <!--</el-form-item>-->
                <!--</el-row>-->
                <!--<el-row class="white-row">-->
                    <!--<el-form-item label="特殊资源">-->
                        <!--<el-radio-group v-model="form.resource">-->
                            <!--<el-radio label="线上品牌商赞助"></el-radio>-->
                            <!--<el-radio label="线下场地免费"></el-radio>-->
                        <!--</el-radio-group>-->
                    <!--</el-form-item>-->
                <!--</el-row>-->
                <el-row class="white-row">
                    <el-form-item>
                        <el-button type="primary">立即创建</el-button>
                        <el-button>取消</el-button>
                    </el-form-item>
                </el-row>
                <!--<el-row class="white-row">-->
                    <!--<el-form-item label="身份证">-->
                        <!--<el-upload-->
                                <!--class="avatar-uploader"-->
                                <!--list-type="picture"-->
                                <!--action="/api/upload/upload"-->
                                <!--:headers="uphead"-->
                                <!--:show-file-list="false"-->
                                <!--:on-success="handleAvatarSuccess"-->
                                <!--:on-progress="uploadOnProgress"-->
                                <!--:before-upload="beforeAvatarUpload">-->
                            <!--<img v-if="pass" :src="imageUrl" class="avatar">-->
                            <!--<div v-else class="img-content img-progress">-->
                                <!--<el-progress type="circle" :percentage="progress"></el-progress>-->
                            <!--</div>-->
                            <!--<i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
                        <!--</el-upload>-->
                    <!--</el-form-item>-->
                <!--</el-row>-->
            </el-form>
            <!--<el-input name="username" v-model="username" placeholder="请输入用户名"></el-input>-->
            <!--<el-button @click="addUser">插入数据库</el-button>-->
        </section>
        <el-dialog class="pop-mask">
            <el-input placeholder="请输入用户名"></el-input>
        </el-dialog>

    </div>
</template>
<style>
    body {
        background: #F5F4F9
    }

    .gray-row {
        background: #F5F4F9;
        height: 50px;
        font-size:12px;
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

    * {
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        -webkit-tap-highlight-color: transparent;
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
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        uphead: {
          'Access-Control-Allow-Origin': '*'
        },
        username: '',
        imageUrl: '/cardfront.jpg',
        imageUrl2: '/cardback.jpg',
        dialogVisible: false,
        progress: 0,
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
      addUser () {
        var name = this.username
        if (!name) {
          this.$message.error('用户名不能为空!')
          return
        }
        axios.post('/api/user/adduser', {
          username: name
        }).then((response) => {
          console.log(response)
        })
      },
      uploadOnProgress (e, file) { // 开始上传
        console.log(e.percent, file)
        this.progress = Math.floor(e.percent)
      },
      handlePictureCardPreview (file) {
        this.imageUrl = file.url
        this.dialogVisible = true
      },
      handleAvatarSuccess (res, file) {
        console.log(file.raw)
        this.imageUrl = res // URL.createObjectURL(file.raw)
        this.pass = true
      },
      beforeAvatarUpload (file) {
        this.pass = false
        this.progress = 0
        const isJPG = file.type === 'image/jpeg' || true
        const isLt5M = file.size / 1024 / 1024 < 5

        if (!isJPG) {
          this.$message.error('上传图片只能是 JPG 格式!')
        }
        if (!isLt5M) {
          this.$message.error('上传图片大小不能超过 5MB!')
        }
        return isJPG && isLt5M
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
