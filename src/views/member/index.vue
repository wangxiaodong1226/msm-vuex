<template>
  <div>
    <el-form
      ref="searchForm"
      :inline="true"
      :model="searchMap"
      style="margin-top: 20px;"
      class="demo-form-inline"
    >
      <el-form-item prop="cardNum">
        <el-input v-model="searchMap.cardNum" placeholder="会员卡号" style="width: 200px;"></el-input>
      </el-form-item>
      <el-form-item prop="name">
        <el-input v-model="searchMap.name" placeholder="会员名称" style="width: 200px;"></el-input>
      </el-form-item>
      <el-form-item prop="payType">
        <el-select v-model="searchMap.payType" placeholder="支付类型" style="width: 110px">
          <el-option
            v-for="option in number"
            :key="option.type"
            :label="option.name"
            :value="option.type"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="birthday">
        <el-date-picker
          value-format="yyyy-MM-dd"
          v-model="searchMap.birthday"
          type="date"
          placeholder="出生日
    期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="getListData">查询</el-button>
        <el-button @click="resetForm('searchForm')">重置</el-button>
        <el-button @click="handleData">会员新增</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="list" height="380" border style="width: 100%">
      <el-table-column type="index" label="序号" width="60"></el-table-column>
      <el-table-column prop="cardNum" label="会员卡号"></el-table-column>
      <el-table-column prop="name" label="会员姓名"></el-table-column>
      <el-table-column prop="birthday" label="会员生日"></el-table-column>
      <el-table-column prop="phone" label="手机号码" width="110"></el-table-column>
      <el-table-column prop="integral" label="可用积分"></el-table-column>
      <el-table-column prop="money" label="开卡金额"></el-table-column>
      <el-table-column prop="payType" label="支付类型">
        <template slot-scope="scope">
          <span>{{scope.row.payType | payTypeGet}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="会员地址" width="180"></el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row.id)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDele(scope.row.id)">删除</el-button>
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
    <el-dialog title="会员编辑" :visible.sync="dialogFormVisible" width="500px">
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
        <el-form-item label="会员卡号" prop="cardNum">
          <el-input v-model="pojo.cardNum" />
        </el-form-item>
        <el-form-item label="会员姓名" prop="name">
          <el-input v-model="pojo.name" />
        </el-form-item>
        <el-form-item label="会员生日" prop="birthday">
          <el-date-picker v-model="pojo.birthday" type="date" placeholder="请点击选择" />
        </el-form-item>
        <el-form-item label="手机号码" prop="phone">
          <el-input v-model="pojo.phone" />
        </el-form-item>
        <el-form-item label="开卡金额" prop="money">
          <el-input v-model="pojo.money" />
        </el-form-item>
        <el-form-item label="可用积分">
          <el-input v-model="pojo.integral"></el-input>
        </el-form-item>
        <el-form-item label="支付类型" prop="payType">
          <el-select v-model="pojo.payType" class="filter-item" placeholder="请点击选择">
            <el-option
              v-for="option in number"
              :key="option.type"
              :label="option.name"
              :value="option.type"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="会员地址">
          <el-input
            v-model="pojo.address"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请输入地址"
          />
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
const number = [
  {
    type: "1",
    name: "支付宝"
  },
  {
    type: "2",
    name: "微信"
  },
  {
    type: "3",
    name: "信用卡"
  },
  {
    type: "4",
    name: "网银"
  }
];
import Memlist from "@/api/member";
export default {
  data() {
    return {
      list: [],
      total: 0,
      currentpage: 1,
      pagesize: 10,
      searchMap: {
        cardNum: "",
        name: "",
        payType: "",
        birthday: ""
      },
      number,
      dialogFormVisible: false,
      pojo: {
        id:null,
         cardNum: "",
        name: "",
        payType: "",
        birthday: "",
        phone:'',
        money:"",
        integral:"",
        address:""

      },
       rules: {
            cardNum: [{ required: true, message: '卡号不能为空', trigger: 'blur' }],
            name: [{ required: true, message: '姓名不能为空', trigger: 'blur' }],
            payType: [{ required: true, message: '请选择支付类型', trigger: 'change' }],
        },
    };
  },
  created() {
    this.getListData();
  },
  methods: {
    getListData() {
      Memlist.search(this.currentpage, this.pagesize, this.searchMap).then(
        response => {
          const resp = response.data;
          console.log(resp);
          this.list = resp.data.row;
          this.total = resp.data.total;
        }
      );
    },
    // Memlist.getList().then(response => {
    //   this.list = response.data.data;
    // });

    handleEdit(id) {
     this.handleData();
     Memlist.getDataById(id).then(response => {
       const reps = response.data;
       if(reps.flag){
         this.pojo = reps.data;
       }
     })
    },
    handleDele(id) {
       this.$confirm('是否删除该会员信息', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
  
        Memlist.deleteMember(id).then(response => {
            const resp = response.data
       
            this.$message({
                type: resp.flag ? 'success' : 'error',
                message: resp.message
            });
            if (resp.flag) {
                this.getListData()
            }
        })
    }).catch(() => {
       
    });
    },
    handleSizeChange(val) {
      this.pagesize = val;
      this.getListData();
    },
    handleCurrentChange(val) {
      this.currentpage = val;
      this.getListData();
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    addData(filename){
           this.$refs[filename].validate((valid) => {
          if (valid) {
              Memlist.add(this.pojo).then(response => {
                const resp = response.data;
                if(resp.flag){
                  this.getListData();
                  this.dialogFormVisible= false;
                }else{
                  this.$message({
                    type:"warning",
                    message:resp.message
                  })
                }
              })
          } else {
            
            return false;
          }
        });
    },
    upDataMember(formname){
        this.$refs[formname].validate((valid) => {
          if (valid) {
              Memlist.upData(this.pojo).then(response => {
                const resp = response.data;
                if(resp.flag){
                  this.getListData();
                  this.dialogFormVisible= false;
                }else{
                  this.$message({
                    type:"warning",
                    message:resp.message
                  })
                }
              })
          } else {
            
            return false;
          }
        });
    },
    handleData(){
      this.dialogFormVisible =true;
      this.$nextTick(() => {
        this.$refs["pojoForm"].resetFields();
      })
      }
  },
  filters: {
    payTypeGet(type) {
      const o = number.find(obj => type === obj.type);
      return o ? o.name : null;
    }
  }
};
</script>