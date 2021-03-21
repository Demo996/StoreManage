<template>
  <div class="create">
    <!-- 卡片组件 -->
    <el-card class="box-card">
      <!-- 标题 -->
      <div slot="header" class="clearfix header">
        <span>用户创建</span>
        <!-- <el-button type="primary" round @click="jump('/users')">返回</el-button> -->
      </div>

      <!-- 表单 -->
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="账号" prop="username">
          <el-input
            type="text"
            v-model="ruleForm.username"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="text"
            v-model="ruleForm.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >提交</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
      <!-- /表单 -->
    </el-card>
    <!-- /卡片组件 -->
  </div>
</template>
<script>
// 导入接口
import { usersApi } from '@/api'

// 导出组件数据
export default {
  data () {
    return {
      // 表单数据
      ruleForm: {
        username: '',
        password: ''
      },
      // 表单数据验证规则
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    // 提交
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          usersApi.createUser(this.ruleForm)
            .then(res => {
              if (res.meta.state == 200) {
                this.$message.success("创建成功");
                this.$router.push({ path: '/users/index' })
              } else {
                this.$message.error(res.meta.msg);
              }
            })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    // 重置
    resetForm (formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>

<style lang="scss" scoped>
.create {
  // 卡片组件
  .el-card {
    // 头部
    .header .el-button {
      float: right;
      margin-top: -10px;
    }
  }
}
</style>