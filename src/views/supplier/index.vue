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
        <el-input v-model="searchMap.name" placeholder="供应商名称" style="width: 200px;" v-if ='!isSupplierDialog'></el-input>
      </el-form-item>
      <el-form-item prop="linkman">
        <el-input v-model="searchMap.linkman" placeholder="联系人" style="width: 200px;" v-if ='!isSupplierDialog'></el-input>
      </el-form-item>
      <el-form-item prop="mobile">
        <el-input v-model="searchMap.mobile" placeholder="联系电话" style="width: 200px;"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="fechData">查询</el-button>
        <el-button @click="resetForm('searchForm')" v-if ='!isSupplierDialog'>重置</el-button>
        <el-button @click="handleData" v-if ='!isSupplierDialog'>新增供应商</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="list" height="380" border style="width: 100%" 
     highlight-current-row
    @current-change="handleCurrentRow">
      <el-table-column type="index" label="序号" width="60"></el-table-column>
      <el-table-column prop="name" label="供应商名称"></el-table-column>
      <el-table-column prop="linkman" label="联系人"></el-table-column>
      <el-table-column prop="mobile" label="联系电话" v-if ='!isSupplierDialog'></el-table-column>
      <el-table-column prop="remark" label="备注" width="110" v-if ='!isSupplierDialog'></el-table-column>

      <el-table-column label="操作" width="150" v-if ='!isSupplierDialog'>
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
      :layout="!isSupplierDialog ? 'total, sizes, prev, pager, next, jumper' :'prev, pager, next'"
      :total="total"
    ></el-pagination>
    <el-dialog title="供应商编辑" :visible.sync="dialogFormVisible" width="500px">
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
        <el-form-item label="供应商名称" prop="name">
          <el-input v-model="pojo.name" />
        </el-form-item>
        <el-form-item label="联系人" prop="linkman">
          <el-input v-model="pojo.linkman" />
        </el-form-item>
        <el-form-item label="联系电话" prop="mobile">
          <el-input v-model="pojo.mobile" />
        </el-form-item>
        <el-form-item label="备注" prop="remark" >
          <el-input v-model="pojo.remark" type ='textarea'/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="pojo.id === null ? addData('pojoForm') : upDataMember('pojoForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import supplierApi from "@/api/supplier";
export default {
  props:{
     isSupplierDialog:Boolean
  },
  data() {
    return {
      list: [],
      total: 0,
      currentpage: 1,
      pagesize: 10,
      searchMap: {
        name: "",
        linkman: "",
        mobile: "",
        remark: ""
      } ,
      dialogFormVisible:false,
      pojo:{
          id:null,
           name:'',
           linkman:'',
           mobile:'',
           remark:''
      },
      rules:{
            name: [{ required: true, message: '供应商名称不能为空', trigger: 'blur' }],
            linkman: [{ required: true, message: '联系人不能为空', trigger: 'blur' }],
        }
    };
  },
  created() {
    this.fechData();
  },
  methods: {
    fechData() {
      // supplierApi.getlist().then(response => {
      //     const resp = response.data;
      //     this.list = resp.data
      // })
      supplierApi
        .search(this.currentpage, this.agesize, this.searchMap)
        .then(response => {
          const resp = response.data;
          if (resp.flag) {
            this.total = resp.data.total;
            this.list = resp.data.row;
          }
        });
    },
    handleSizeChange(val) {
      this.pagesize = val;
      this.fechData();
    },
    handleCurrentChange(val) {
      this.currentpage = val;
      this.fechData();
    },
    resetForm(formname){
       this.$refs[formname].resetFields();
    },
    handleData(){
       this.dialogFormVisible=true;
       this.$nextTick(() => {
            this.$refs['pojoForm'].resetFields();
       })
    },
    addData(formName){
         this.$refs[formName].validate(valid => {
              if(valid){
                supplierApi.add(this.pojo).then(response => {
                    const resp = response.data;
                    if(resp.flag){
                        this.dialogFormVisible = false;
                        this.fechData();
                    }else{
                        this.$message({
                            type:'warning',
                            message:resp.message
                        })
                    }
                })
              }else{
                  return false;
              }
         })
    },
    upDataMember(formName){
         this.$refs[formName].validate(valid => {
              if(valid){
                supplierApi.updata(this.pojo).then(response => {
                    const resp = response.data;
                    if(resp.flag){
                        this.dialogFormVisible = false;
                        this.fechData();
                    }else{
                        this.$message({
                            type:'warning',
                            message:resp.message
                        })
                    }
                })
              }else{
                  return false;
              }
         })
    },
    handleEdit(id){
        this.handleData();
        supplierApi.getDataById(id).then(response => {
            const resp =response.data;
            if(resp.flag){
                this.pojo = resp.data;
            }

        })
    },
    handleDelete(id){
       this.$confirm('确认删除这条记录吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    }).then(() => {
        supplierApi.deleteData(id).then(response => {
            const resp = response.data
            this.$message({
                type: resp.flag ? 'success' : 'error',
                message: resp.message
            });
            if (resp.flag) {
                this.fechData();
            }
        })
    }).catch(() => {
       
    });
    },
    handleCurrentRow(currentRow){
      console.log(currentRow);
       this.$emit('supplier-row',currentRow)
    }
  }
};
</script>