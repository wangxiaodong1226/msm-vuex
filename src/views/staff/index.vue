<template>
    <div>
     <el-form
      ref="searchForm"
      :inline="true"
      :model="searchMap"
      style="margin-top: 20px;"
      class="demo-form-inline"
    >
      <el-form-item prop="name">
        <el-input v-model="searchMap.username" placeholder="账号" style="width: 200px;"></el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input v-model="searchMap.name" placeholder="姓名" style="width: 200px;"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="fetchData">查询</el-button>
        <el-button @click="resetForm('searchForm')">重置</el-button>
        <el-button @click="handleData">新增员工</el-button>
      </el-form-item>
    </el-form>
       <el-table :data="list" height="380" border style="width: 100%">
      <el-table-column type="index" label="序号" width="60"></el-table-column>
      <el-table-column prop="username" label="账号" width="100"></el-table-column>
      <el-table-column prop="name" label="姓名" width="100"></el-table-column>
      <el-table-column prop="age" label="年龄" width="100"></el-table-column>
      <el-table-column prop="mobile" label="电话"></el-table-column>
      <el-table-column prop="salary" label="薪资"></el-table-column>
      <el-table-column prop="entryDate" label="入职时间"></el-table-column>

      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row.id)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
     <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentpage"
      :page-sizes="[10, 20, 50]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
     <el-dialog title="员工编辑" :visible.sync="dialogFormVisible" width="500px">
      <!-- status-icon 当表单校验不通过时, 输入框右侧有个 x 小图标 -->
      <el-form
        status-icon
        ref="pojoForm"
        :model="pojo"
        label-width="100px"
        label-position="right"
        style="width: 400px;"
        :rules="rules"
      >
        <el-form-item label="账号" prop="username">
          <el-input v-model="pojo.username" />
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="pojo.name" />
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model="pojo.age" />
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input v-model="pojo.mobile"/>
        </el-form-item>
        <el-form-item label="薪资" prop="salary">
          <el-input v-model="pojo.salary"/>
        </el-form-item>
        <el-form-item label="入职时间" prop="entryDate">
          <el-input v-model="pojo.entryDate"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="pojo.id === null ? addData('pojoForm') : upDataMember('pojoForm')"
        >确 定</el-button>
      </div>
    </el-dialog>
    </div>
</template>
<script>
import staffApi from '@/api/staff.js'
export default {

    data() {
        return {
            list:[],
            currentpage:1,
            pagesize:10,
            total:0,
            searchMap:{
                username:'',
                name:''
            },
            dialogFormVisible:false,
            pojo:{
                id:null,
                username:'',
                name:'',
                age:'',
                mobile:'',
                salary:'',
                entryDate:''
            },
            rules:{
                 username:[{required:true,message:'账号不能为空',trigger:'blur'}],
                 name:[{required:true,message:'账号不能为空',trigger:'blur'}]
            }

        }
    },
    created() {
        this.fetchData();
    },
    methods: {
        handleEdit(id){
            staffApi.getById(id).then(response => {
                const resp = response.data;
                if(resp.flag){
                    this.dialogFormVisible = true;
                    this.pojo = resp.data;
                }else{
                    this.$message({
                        type:'warning',
                        message:resp.message
                    })
                }
            })
        },
        handleDelete(id){
       this.$confirm('确认删除这条记录吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    }).then(() => {
        staffApi.deleteData(id).then(response => {
            const resp = response.data
            this.$message({
                type: resp.flag ? 'success' : 'error',
                message: resp.message
            });
            if (resp.flag) {
                this.fetchData();
            }
        })
    }).catch(() => {
       
    });
        },
        fetchData(){
            staffApi.search(this.currentpage,this.pagesize,this.searchMap).then(response => {
                const resp = response.data;
                if(resp.flag){
                    this.total = resp.data.total;
                    this.list = resp.data.rows
                }
            })
        },
        handleSizeChange(val){
            this.pagesize = val;
            this.fetchData();
        },
        handleCurrentChange(val){
            this.currentpage = val;
            this.fetchData();
        },
        resetForm(formName){
           this.$refs[formName].resetFields();
        },
        handleData(){
           this.dialogFormVisible = true;
           this.$nextTick(() => {
                this.$refs['pojoForm'].resetFields();
           })
        },
        addData(formName){
            this.$refs[formName].validate(valid => {
                if(valid){
                    staffApi.add(this.pojo).then(response => {
                        const resp  = response.data;
                        if(resp.flag){
                            this.dialogFormVisible = false;
                            this.fetchData()
                        }else{
                            this.$message({
                                type:'warning',
                                message:resp.message
                            })
                        }
                    })
                }else{
                    return false
                }
            })
        },
        upDataMember(formName){
             this.$refs[formName].validate(valid => {
                if(valid){
                    staffApi.upData(this.pojo).then(response => {
                        const resp  = response.data;
                        if(resp.flag){
                            this.dialogFormVisible = false;
                            this.fetchData()
                        }else{
                            this.$message({
                                type:'warning',
                                message:resp.message
                            })
                        }
                    })
                }else{
                    return false
                }
            })
        }

    },
}
</script>