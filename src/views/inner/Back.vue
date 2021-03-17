<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix"></div>
    <el-dialog
      title="操作界面"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
    >
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <el-row>
            <el-col :span="12"
              ><div class="grid-content bg-purple">
                申请单编号：<el-input
                  readonly
                  v-model="operateArr['申请单编号']"
                ></el-input></div
            ></el-col>
            <el-col :span="12"
              ><div class="grid-content bg-purple-light">
                产品/设备编码：<el-input
                  readonly
                  v-model="operateArr['产品/设备编码']"
                ></el-input></div
            ></el-col>
          </el-row>
          <el-row>
            <el-col :span="12"
              ><div class="grid-content bg-purple">
                产品/设备名称：<el-input
                  readonly
                  v-model="operateArr['产品/设备名称']"
                ></el-input></div
            ></el-col>
            <el-col :span="12"
              ><div class="grid-content bg-purple-light">
                颜色/形状：<el-input
                  readonly
                  v-model="operateArr['颜色/形状']"
                ></el-input></div
            ></el-col>
          </el-row>
          <el-row>
            <el-col :span="12"
              ><div class="grid-content bg-purple">
                类型：<el-input
                  readonly
                  v-model="operateArr['类型']"
                ></el-input></div
            ></el-col>
            <el-col :span="12"
              ><div class="grid-content bg-purple-light">
                规格：<el-input
                  readonly
                  v-model="operateArr['规格']"
                ></el-input></div
            ></el-col>
          </el-row>
          <el-row>
            <el-col :span="12"
              ><div class="grid-content bg-purple">
                采购单价：<el-input
                  readonly
                  v-model="operateArr['单价']"
                ></el-input></div
            ></el-col>
            <el-col :span="12"
              ><div class="grid-content bg-purple-light">
                采购金额：<el-input
                  readonly
                  v-model="operateArr['合计金额']"
                ></el-input></div
            ></el-col>
          </el-row>
          <el-row>
            <el-col :span="12"
              ><div class="grid-content bg-purple">
                待退货量：<el-input
                  type="number"
                  readonly
                  v-model="operateArr['数量']"
                ></el-input></div
            ></el-col>
            <el-col :span="12"
              ><div class="grid-content bg-purple">
                采购运费：<el-input
                  readonly
                  type="number"
                  v-model="operateArr['运费']"
                ></el-input></div
            ></el-col>
          </el-row>
        </div>
        <div class="text item">
          <el-row>
            <el-col :span="12">
              购退方式：
              <el-select v-model="backType" placeholder="请选择">
                <el-option
                  v-for="item in backTypeObj"
                  :key="item.id"
                  :label="item.text"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="12">
              退货数量：
              <el-input
                type="number"
                min="0"
                :max="maxNum"
                v-model="backNum"
                placeholder="请输入内容"
              ></el-input>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12"
              >退货单价：<el-input
                type="number"
                min="0.0"
                :disabled="enabledPrice"
                v-model="backPrice"
                placeholder="请输入内容"
              ></el-input
            ></el-col>
            <el-col :span="12"
              >退货运费：<el-input
                type="number"
                :disabled="enabledFee"
                v-model="backFee"
                placeholder="请输入内容"
              ></el-input
            ></el-col>
          </el-row>
          <el-row>
            <el-col :span="12"
              >退货金额：<el-input readonly v-model="backMoney"></el-input
            ></el-col>
            <el-col :span="12"
              >退货备注：<el-input
                v-model="noteText"
                placeholder="请输入内容"
              ></el-input
            ></el-col>
          </el-row>
          <el-row>
            <el-button type="success" round @click="submit">提交</el-button>
            <el-button type="info" round @click="dialogVisible = false">取消</el-button>
          </el-row>
        </div>
      </el-card>
    </el-dialog>
    <div class="text item">
      <el-table
        :data="tableData">
        size="medium"
        border
        stripe
        max-height="700"
        style="width: 100%"
      >
        <el-table-column
          label="序号"
          type="index"
          show-overflow-tooltip
          width="50"
        >
        </el-table-column>
        <el-table-column label="申请单编号" prop="申请单编号">
        </el-table-column>
        <el-table-column label="产品/设备编码" prop="产品/设备编码">
        </el-table-column>
        <el-table-column label="产品/设备名称" prop="产品/设备名称">
        </el-table-column>
        <el-table-column label="类型" prop="类型"> </el-table-column>
        <el-table-column label="型号" prop="型号"> </el-table-column>
        <el-table-column label="规格" prop="规格"> </el-table-column>
        <el-table-column label="颜色/形状" prop="颜色/形状"> </el-table-column>
        <el-table-column label="规格" prop="规格"> </el-table-column>
        <el-table-column label="单位" prop="单位"> </el-table-column>

        <el-table-column label="数量" prop="数量"> </el-table-column>
        <el-table-column label="单价" prop="单价"> </el-table-column>
        <el-table-column label="运费" prop="运费"> </el-table-column>
        <el-table-column label="合计金额" prop="合计金额"> </el-table-column>
        <el-table-column label="备注" prop="备注"> </el-table-column>
        <el-table-column label="操作" prop="操作">
          <template scope="scope">
            <el-button type="primary" icon="el-icon-edit" circle @click="handle(scope.row)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagenum"
        :page-sizes="[5, 10, 20, 30]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pagetotal"
      >
      </el-pagination>
      <!-- /分页 -->
    </div>
  </el-card>
</template>

<script>
import { purchaseBackApi } from "@/api";
export default {
  data() {
    return {
      //编辑框内的表单数据
      backType: "",
      enabledPrice: true,
      enabledFee: false,
      backNum: 0,
      backPrice: 0.0,
      backFee: 0.0,
      noteText: "",
      rowMoney: 0.0, //这个数量产品的原金额

      maxNum: 0,
      dialogVisible: false,
      backTypeObj: [
        { id: 1, text: "退货并换货" },
        { id: 2, text: "退货并重购" },
        { id: 3, text: "仅退货" },
        { id: 4, text: "取消退还" },
      ],
      operateArr: [],

      // 表格数据
      tableData: [],
      // 分页
      pagenum: 1,
      pagesize: 5,
      pagetotal: 100,
    };
  },
  computed: {
    backMoney() {
      let money =
        parseInt(this.backNum) * parseFloat(this.backPrice) -
        parseFloat(this.backFee);
      return money ? money : 0;
    },
  },
  watch: {
    backNum(val) {
      this.rowMoney = val * this.operateArr["数量"];
    },
    backType(id) {
      switch (id) {
        case 1:
          this.backPrice = 0.0;
          this.enabledPrice = true;
          break;
        case 2:
          this.backPrice = this.operateArr[9];
          this.enabledPrice = false;
          break;
        case 3:
          this.backPrice = this.operateArr[9];
          this.enabledPrice = false;
          break;
        case 4:
          this.backNum = 0;
          this.backPrice = 0.0;
          this.backFee = 0.0;
          this.enabledFee = true;
          this.enabledPrice = true;
          break;
        default:
          break;
      }
    },
  },
  methods: {
    submit() {
      
      if(!this.backType)  {
        this.$message.error("请选择购退方式")
        return
      }
      if(!this.noteText) {
        this.$message.error("请填写退货备注")
        return
      }
      if(this.backNum === "") {
        this.$message.error("请填写退货数量")
        return
      }
      let d = new Date();
      let n = d.toISOString();
      let currDate = n.split("T")[0];
      console.log(this.backType);

      purchaseBackApi.postEdit({
        code: this.operateArr["申请单编号"],
        typeId: this.backType,
        numb: this.backNum,
        price: this.backPrice,
        fee: this.backFee,
        money: this.backMoney,
        rowMoney: this.rowMoney,
        note: this.noteText,
        currDate: currDate,
        detail: this.operateArr
      }).then(res=>{
        if(res.status == 200) {
          this.backType = ""
          this.backNum = 0
          this.backPrice = 0.0
          this.note = ""
          this.$message.success(res.msg)
          let remainMoney = parseInt(this.backNum) * parseInt(operateArr["单价"])
          this.operateArr["数量"] = maxNum - this.backNum
          this.operateArr["合计金额"] = remainMoney
          this.dialogVisible = false
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    handle(row) {
      this.operateArr = row;
      this.maxNum = parseInt(row["数量"]);
      this.dialogVisible = true;
    },
    initData() {
      purchaseBackApi
        .post({
          pagenum: this.pagenum,
          pagesize: this.pagesize,
        })
        .then((res) => {
          // console.log(res);
          this.pagetotal = res.pagetotal;
          this.tableData = res.data;
        });
    },

    // 切换每页条数
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pagesize = val;
      this.initData();
    },
    // 切换分页
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.pagenum = val;
      this.initData();
    },
  },
  created() {
    this.initData();
  },
};
</script>

<style lang="scss" scoped>
.el-pagination {
  text-align: left;
  margin-top: 10px;
}
.el-card {
  width: 100%;
  height: 100%;

  .el-row {
    margin-top: 10px;
    .el-input {
      width: 60%;
    }
    .el-switch {
      display: inline-block;
      margin-right: 10px;
    }

    .note {
      width: 420px;
    }
  }
  .el .el-table {
    width: 100%;
    height: 100%;
  }

  .text {
    font-size: 14px;
  }

  .item {
    height: 100%;
    height: 100%;
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both;
  }
}
</style>