<template>
  <div class="header">
    <a href="#/">
      <img src="@/assets/logo.png" class="logo" width="25px" />
      <span class="title">会员管理系统</span>
    </a>
    <el-dropdown @command="handleCommand">
      <span class="el-dropdown-link">
        下拉菜单
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="a">修改密码</el-dropdown-item>
        <el-dropdown-item command="b">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-dialog title="修改密码" :visible.sync="dialogTableVisible" width='500px'>
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      style='width:400px;'
    >
      <el-form-item label="原始密码" prop="oldPass">
        <el-input type="password" v-model="ruleForm.oldPass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newPass">
        <el-input type="password" v-model="ruleForm.newPass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type='password' v-model="ruleForm.checkPass"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="$refs['ruleForm'].resetFields();">重置</el-button>
      </el-form-item>
    </el-form>
    </el-dialog>
  </div>
</template>
<style scoped >
a {
  text-decoration: none;
}
.logo {
  vertical-align: middle;
  padding: 0 10px 0 50px;
}
.title {
  color: white;
}
.el-dropdown {
  float: right;
  margin-right: 40px;
}
.el-dropdown-link {
  color: white;
}
</style>
<script>
import { SendStoken } from "@/api/login";
import passWordApi from "@/api/password";
export default {
  data(){
    const validateOldPass = (rule,value,callback) =>{
       passWordApi.judgeOldPass(this.UserID.id,value).then(response =>{
         const reps = response.data;
         if(reps.flag){
            callback();
         }else{
           callback(new Error(reps.message));
         }
       })
    };
    const validatePass = (rule,value,callback) =>{
        if(value !== this.ruleForm.newPass){
            callback(new Error('两次密码不一致'));
        }else{
          callback();
        }
    };
    return{
      dialogTableVisible:false,
      ruleForm:{
        oldPass:'',
        checkPass:'',
        newPass:''
      },
      rules:{
         oldPass: [
                { required: true, message: '旧密码不能为空', trigger: 'blur' },
                { validator: validateOldPass, trigger: 'blur' }
            ],
            newPass: [
                { required: true, message: '新密码不能为空', trigger: 'blur' }
            ],
            checkPass: [
                { required: true, message: '确认密码不能为空', trigger: 'blur' },
                { validator: validatePass, trigger: 'change' }
            ],
      },
      UserID:JSON.parse(localStorage.getItem('msm-316-user'))
    }
  },
  methods: {
    handleCommand(command) {
      switch (command) {
        case "a":
          this.handlePwd();
          break;
        case "b":
            this.handleLogoOut();
          break;
      }
    },
    handleLogoOut(){
        this.$store.dispatch('LogoOut').then(response =>{
          if(response.flag){
             this.$router.push("/login");
          }else{
            this.$message({
              type:'warning',
              message:response.message
            })
          }
        })
    },
    submitForm(formName){
      this.$refs[formName].validate(valid => {
        if(valid){
           passWordApi.judgeNewPass(this.UserID.id,this.newPass).then(response =>{
         const reps = response.data;
         this.$message({
           type: reps.flag?'success':'warning',
           message:reps.message
         })
         if(reps.flag){
            this.dialogTableVisible = false;
            localStorage.removeItem("msm-316-token");
            localStorage.removeItem("msm-316-user");
            this.$router.push("/login");


         }else{
           return false
         }
       })
        }else{

        }
      })
    },
    handlePwd(){
      this.dialogTableVisible = true;
      this.$nextTick(() => {
        this.$refs['ruleForm'].resetFields();
      })
    }
  }
};
</script>