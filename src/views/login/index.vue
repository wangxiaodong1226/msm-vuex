<template>
  <div class="logincontainer">
    <el-form ref="form" :model="form" label-width="80px" :rules="rules">
      <el-form-item label="账号" prop="username">
        <el-input v-model="form.username" placeholder="请输入账号"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" type="password" placeholder="请输入密码"></el-input>
      </el-form-item>

      <el-button type="primary" @click="submitForm('form')">立即创建</el-button>
    </el-form>
  </div>
</template>

<script>
import { LoginTrue, GiveToken } from "@/api/login.js";
export default {
  data() {
    return {
      form: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "账号不能为空", trigger: "blur" }
        ],
        password: [{ required: true, message: "密码不能为空", trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {

        if (valid) {
                this.$store.dispatch('Login',this.form).then(response => {
                  if(response.flag){
                     this.$router.push('/');
                  }else{
                    this.$message({
                     showClose: true,
                     message: "错了哦，这是一条错误消息",
                     type: "error"
                     });
                  }
                })
               } 
               else {
               console.log("error submit!!");
               return false;
            }
          });
        }
     }
  }
</script>
<style scoped >
.logincontainer {
  position: absolute;
  background: url("../../assets/login.jpg");
  width: 100%;
  height: 100%;
  background-size: cover;
}
.el-form {
  width: 380px;
  margin: 160px auto;
  padding: 30px;
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.7);
}
</style>