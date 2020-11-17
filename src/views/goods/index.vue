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
        <el-input v-model="searchMap.name" placeholder="商品名称" style="width: 200px;"></el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input v-model="searchMap.code" placeholder="商品编码" style="width: 200px;"></el-input>
      </el-form-item>
      <el-form-item prop="supplierName">
        <el-input
          readonly
          @click.native="supplierDialogVisible = true"
          v-model="searchMap.supplierName"
          placeholder="供应商"
          style="width: 200px;"
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="fetchData">查询</el-button>
        <el-button @click="resetForm('searchForm')">重置</el-button>
        <el-button @click="handleData">新增商品</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="list" height="380" border style="width: 100%">
      <el-table-column type="index" label="序号" width="60"></el-table-column>
      <el-table-column prop="name" label="商品名称"></el-table-column>
      <el-table-column prop="code" label="商品编码"></el-table-column>
      <el-table-column prop="retailPrice" label="零售价"></el-table-column>
      <el-table-column prop="purchasePrice" label="进货价" width="110"></el-table-column>
      <el-table-column prop="storageNum" label="库存数量" width="110"></el-table-column>
      <el-table-column prop="supplierName" label="供应商" width="110"></el-table-column>

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
    <el-dialog title="选择供应商" :visible.sync="supplierDialogVisible" width="500px">
      <supplier :isSupplierDialog="true" @supplier-row="handleOptionRow"></supplier>
    </el-dialog>
    <el-dialog title="商品编辑" :visible.sync="dialogFormVisible" width="500px">
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
        <el-form-item label="商品名称" prop="name">
          <el-input v-model="pojo.name" />
        </el-form-item>
        <el-form-item label="商品编号" prop="code">
          <el-input v-model="pojo.code" />
        </el-form-item>
        <el-form-item label="商品规格" prop="spec">
          <el-input v-model="pojo.spec" />
        </el-form-item>
        <el-form-item label="零售价" prop="retailPrice">
          <el-input v-model="pojo.retailPrice"/>
        </el-form-item>
        <el-form-item label="进货价" prop="purchasePrice">
          <el-input v-model="pojo.purchasePrice"/>
        </el-form-item>
        <el-form-item label="库存数量" prop="storageNum">
          <el-input v-model="pojo.storageNum"/>
        </el-form-item>
        <el-form-item label="供应商" prop="supplierName">
          <el-input
            readonly
            @click.native="isclickNewData"
            v-model="pojo.supplierName"
            placeholder="供应商"
            style="width: 200px;"
          ></el-input>
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
import goodsApi from "@/api/goods";
import Supplier from "@/views/supplier";
export default {
  components: {
    Supplier
  },
  data() {
    return {
      list: [],
      currentpage: 1,
      pagesize: 10,
      total: 1,
      searchMap: {
        name: "",
        code: "",
        supplierName: ""
      },
      supplierDialogVisible: false,
      pojo: {
        id: null,
        name: "",
        code: "",
        spec: "",
        retailPrice: 0.0,
        purchasePrice: 0.0,
        storageNum: 0,
        supplierName: "",
        supplierID: null
      },
      rules: {
           name: [{ required: true, message: '商品名称不能为空', trigger: 'blur' }],
            code: [{ required: true, message: '商品编码不能为空', trigger: 'blur' }],
            retailPrice: [{ required: true, message: '零售价不能为空', trigger: 'blur' }],
      },
      dialogFormVisible: false,
      isEdit: false
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      goodsApi
        .search(this.currentpage, this.pagesize, this.searchMap)
        .then(response => {
          const resp = response.data;
          if (resp.flag) {
            this.total = resp.data.total;
            this.list = resp.data.rows;
          }
        });
    },
    handleEdit(id) {
        this.dialogFormVisible = true;
        goodsApi.getById(id).then(response =>{
            const resp = response.data;
            if(resp.flag){
                this.pojo = resp.data;
            }
        })
    },
    handleDelete(id) {
        this.$confirm('确认删除这条记录吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    }).then(() => {
        goodsApi.deleteGood(id).then(response => {
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
    handleSizeChange(val) {
      this.pagesize = val;
      this.fetchData();
    },
    handleCurrentChange(val) {
      this.currentpage = val;
      this.fetchData();
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleData() {
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["pojoForm"].resetFields();
      });
    },
    handleOptionRow(currentRow) {
      if (this.isEdit) {
        this.pojo.supplierName = currentRow.name;
        this.pojo.supplierID = currentRow.id;
      } else {
        this.searchMap.supplierName = currentRow.name;
        this.searchMap.supplierID = currentRow.id;
      }

      this.supplierDialogVisible = false;
    },
    addData(formName) {
         this.$refs[formName].validate(valid => {
        if (valid) {
            goodsApi.add(this.pojo).then(response => {
                const resp = response.data
                if (resp) {
                    this.fetchData()
                    this.dialogFormVisible = false
                } else {
                    this.$message({
                        message: resp.message,
                        type: 'warning'
                    })
                }
            })
        } else {
            return false;
        }
    })
    },
    upDataMember(formName) {
        this.$refs[formName].validate(valid => {
        if (valid) {
            goodsApi.updata(this.pojo).then(response => {
                const resp = response.data
                if (resp) {
                    this.fetchData()
                    this.dialogFormVisible = false
                } else {
                    this.$message({
                        message: resp.message,
                        type: 'warning'
                    })
                }
            })
        } else {
            return false;
        }
    })
    },
    isclickNewData() {
      (this.supplierDialogVisible = true), (this.isEdit = true);
    }
  }
};
</script>