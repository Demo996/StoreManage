<template>
<el-card class="box-card">
  <div slot="header" class="header">
        <el-tag style="fontSize:16px">入库审核</el-tag>
  </div>
  <div class="text item">
  <el-card class="box-card">
    <div slot="header" class="clearfix">
                <el-row class="search-form" :gutter="40">
            <el-col :span="8"
              ><div class="grid-content bg-purple">
                <div class="block">
                  <el-date-picker
                    v-model="searchDate"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="选择申请日期"
                  >
                  </el-date-picker>
                </div></div
            ></el-col>
            <el-col :span="8"
              ><div class="grid-content bg-purple">
                <el-input
                  placeholder="申请单编号"
                  v-model.trim="searchCode"
                  clearable
                >
                  <el-button
                    slot="append"
                    icon="el-icon-search"
                    @click="initData"
                  ></el-button>
                </el-input></div
            ></el-col>
            <el-col :span="8"
              ><div class="grid-content bg-purple">
                <el-input
                  placeholder="请输入申报人"
                  v-model.trim="searchApplyMan"
                  clearable
                >
                  <el-button
                    slot="append"
                    icon="el-icon-search"
                    @click="initData"
                  ></el-button>
                </el-input></div
            ></el-col>
          </el-row>
      <el-table
        key="1"
        :data="tableData"
        :row-class-name="hover_style"
        size="medium"
        border
        stripe
        @row-click="handle"
        style="width: 100%"
      >
        <el-table-column
          label="序号"
          type="index"
          show-overflow-tooltip
          width="50"
        >
        </el-table-column>
        <el-table-column label="申请单编号" prop="申请单编号" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="待审核总数" prop="待审核总数" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="应付金额" prop="应付金额"> </el-table-column>
        <el-table-column label="实付金额" prop="实付金额"> </el-table-column>
        <el-table-column label="申报人" prop="申报人"> </el-table-column>
        <el-table-column label="使用部门" prop="使用部门"> </el-table-column>
        <el-table-column label="申请日期" prop="申请日期"> </el-table-column>
        <el-table-column label="采购人" prop="采购人"> </el-table-column>
        <el-table-column label="备注" prop="备注" show-overflow-tooltip> </el-table-column>
        <el-table-column label="操作员" prop="操作员"> </el-table-column>
      </el-table>
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
      <el-dialog
        title="审核界面"
        :visible.sync="dialogVisible"
        :before-close="handleClose"
      >
        <el-row>
          <el-col :span="12"
            ><div class="grid-content bg-purple">
              申请单编号：<el-input
                readonly
                v-model="checkArr['申请单编号']"
              ></el-input></div
          ></el-col>
          <el-col :span="12"
            ><div class="grid-content bg-purple-light">
              产品/设备编码：<el-input
                readonly
                v-model="checkArr['产品/设备编码']"
              ></el-input></div
          ></el-col>
        </el-row>
        <el-row>
          <el-col :span="12"
            ><div class="grid-content bg-purple">
              产品/设备名称：<el-input
                readonly
                v-model="checkArr['产品/设备名称']"
              ></el-input></div
          ></el-col>
          <el-col :span="12"
            ><div class="grid-content bg-purple-light">
              颜色/形状：<el-input
                readonly
                v-model="checkArr['颜色/形状']"
              ></el-input></div
          ></el-col>
        </el-row>
        <el-row>
          <el-col :span="12"
            ><div class="grid-content bg-purple">
              类型：<el-input
                readonly
                v-model="checkArr['类型']"
              ></el-input></div
          ></el-col>
          <el-col :span="12"
            ><div class="grid-content bg-purple-light">
              规格：<el-input
                readonly
                v-model="checkArr['规格']"
              ></el-input></div
          ></el-col>
        </el-row>
        <el-row>
          <el-col :span="12"
            ><div class="grid-content bg-purple">
              型号：<el-input
                readonly
                v-model="checkArr['型号']"
              ></el-input></div
          ></el-col>
          <el-col :span="12"
            ><div class="grid-content bg-purple-light">
              票据类型：<el-input
                readonly
                v-model="checkArr['票据类型']"
              ></el-input></div
          ></el-col>
        </el-row>
        <el-row>
          <el-col :span="12"
            ><div class="grid-content bg-purple">
              数量：<el-input
                type="number"
                min="0"
                :max="maxNum"
                v-model="currNum"
              ></el-input></div
          ></el-col>
          <el-col :span="12"
            ><div class="grid-content bg-purple-light">
              选择仓库：
              <el-select v-model="currStore" placeholder="请选择仓库">
                <el-option
                  v-for="item in storeArea"
                  :key="item.id"
                  :label="item.text"
                  :value="item.title"
                >
                </el-option>
              </el-select></div
          ></el-col>
        </el-row>
        <el-row>
          <el-col :span="8"
            ><div class="grid-content bg-purple">
              票据签收：
              <el-switch
                v-model="checkArr['票据签收']"
                active-color="#13ce66"
                inactive-color="#ff4949"
                active-value="是"
                inactive-value="否"
                active-text="是"
                inactive-text="否"
              >
              </el-switch></div
          ></el-col>
          <el-col :span="16"
            ><div class="grid-content bg-purple">
              备注：<el-input
                v-model="notes"
                placeholder="请输入不通过理由"
                class="note"
              ></el-input></div
          ></el-col>
        </el-row>
        <el-row style="margin-top: 30px">
          <el-button type="primary" @click="checkPass(1)">审核通过</el-button>
          <el-button @click="checkPass(0)">审核不通过</el-button>
        </el-row>
      </el-dialog>
    </div>
    <div class="text item">
      <el-table
        key="2"
        :data="tableChildData"
        :row-class-name="hover_style"
        size="medium"
        border
        stripe
        max-height="300"
        style="width: 100%"
      >
        <el-table-column
          label="序号"
          type="index"
          show-overflow-tooltip
          width="50"
        >
        </el-table-column>
        <el-table-column label="申请单编号" prop="申请单编号" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="产品/设备编码" prop="产品/设备编码" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="产品/设备名称" prop="产品/设备名称" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="类型" prop="类型" show-overflow-tooltip> </el-table-column>
        <el-table-column label="型号" prop="型号" show-overflow-tooltip> </el-table-column>
        <el-table-column label="规格" prop="规格" show-overflow-tooltip> </el-table-column>
        <el-table-column label="颜色/形状" prop="颜色/形状" show-overflow-tooltip> </el-table-column>
        <el-table-column label="规格" prop="规格" show-overflow-tooltip> </el-table-column>
        <el-table-column label="单位" prop="单位" show-overflow-tooltip> </el-table-column>
        <el-table-column label="数量" prop="数量" width="60"> </el-table-column>
        <el-table-column label="单价" prop="单价" width="60"> </el-table-column>
        <el-table-column label="运费" prop="运费" width="60"> </el-table-column>
        <el-table-column label="合计金额" prop="合计金额" width="60">
        </el-table-column>
        <el-table-column label="票据类型" prop="票据类型" show-overflow-tooltip> </el-table-column>
        <el-table-column label="票据签收" width="70">
          <template slot-scope="scope">
            <el-switch
              disabled
              v-model="scope.row['票据签收']"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-value="是"
              inactive-value="否"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="采购日期" prop="采购日期" show-overflow-tooltip> </el-table-column>
        <el-table-column label="用途" prop="用途" show-overflow-tooltip> </el-table-column>
        <el-table-column label="备注" prop="备注" show-overflow-tooltip> </el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="check(scope.row)"
              >审核</el-button
            >
          </template>
        </el-table-column>
      </el-table>
                <el-pagination
            @size-change="handleSizeChangeChild"
            @current-change="handleCurrentChangeChild"
            :current-page="pagenumChild"
            :page-sizes="[5, 10, 20, 30]"
            :page-size="pagesizeChild"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pagetotalChild"
          >
          </el-pagination>
    </div>
  </el-card>
  </div>
</el-card>
</template>

<script>
import { innerApi } from "@/api";

export default {
  data() {
    return {
      tableData: [],
      tableChildData: [],
      search: "",
      searchKey: "",
      dialogVisible: false,
      checkArr: [],
      checked: true,
      currStore: "",
      storeArea: [
        { id: 1, text: "设备类", title: "devicestorege" },
        { id: 2, text: "电子产品类", title: "elecprostorege" },
        { id: 3, text: "养护产品类", title: "carcarestorege" },
        { id: 4, text: "工具类", title: "toolstorege" },
        { id: 5, text: "日常用品类", title: "dailystorege" },
        { id: 6, text: "备用类", title: "reservestorege" },
      ],
      maxNum: 0, // 最大审核量
      currNum: 0, // 审核数量框中当前数量
      notes: "", // 审核不通过的备注信息
      // 分页
      pagenum: 1,
      pagesize: 5,
      pagetotal: 100,
      pagenumChild: 1,
      pagesizeChild: 4,
      pagetotalChild: 100,
      searchCode: '',
      searchDate: '',
      searchApplyMan: ''
    };
  },
  created() {
    this.initData();
  },
  methods: {
     hover_style({ row, rowIndex }) {
      if (rowIndex < 0) {
        return;
      } else {
        return "hover-style";
      }
    },
    check(row, event, column) {
      this.checkArr = row;
      this.maxNum = parseInt(row["数量"]);
      this.dialogVisible = true;
    },
    checkPass(val) {
      if (val === 1 && this.currStore === "") {
        this.$message.error("请选择仓库");
        return;
      }
      if (val === 0 && this.notes === "") {
        this.$message.error("请在备注中补充不通过原因");
        return;
      }
      let remainNum = this.checkArr["数量"] - this.currNum;
      let price = this.checkArr["单价"];
      let carry_fee = this.checkArr["运费"];
      // let checkMoney = parseInt(this.currNum) * parseFloat(price)
      let remainMoney =
        parseInt(remainNum) * parseFloat(price) + parseFloat(carry_fee);

      let mainArr = [];
      let currDevNumber = this.checkArr["申请单编号"];
      for (let item of this.tableData) {
        if (item["申请单编号"] === currDevNumber) {
          mainArr = item;
        }
      }
      let uname = localStorage.getItem("uname"); // 操作员
      let postObj = {
        title: val,
        operator: uname,
        notes: this.notes,
        money: remainMoney,
        checkNum: this.currNum,
        numb: remainNum,
        store: this.currStore,
        mainMsg: mainArr,
        detailMsg: this.checkArr,
      };

      innerApi.checkIn(postObj).then((res) => {
        if (res.meta.state == 200) {
          this.checkArr["数量"] = remainNum;
          this.currStore = "";
          this.notes = "";
          this.currNum = remainNum;
          this.$message.success('提交成功');
        } else {
          this.$message.error(res.meta.msg);
        }
      });
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    // 切换每页条数
    handleSizeChange(val) {
      this.pagesize = val;
      this.initData();
    },
    // 切换分页
    handleCurrentChange(val) {
      this.pagenum = val;
      this.initData();
    },
    // 切换每页条数
    handleSizeChangeChild(val) {
      this.pagesizeChild = val;
      this.initChildData();
    },
    // 切换分页
    handleCurrentChangeChild(val) {
      this.pagenumChild = val;
      this.initChildData();
    },
    handle(row, event, column) {
      let code = row["申请单编号"];
      innerApi
        .postChild({
          devNumber: code,
        pagenum: this.pagenumChild,
        pagesize: this.pagesizeChild
        })
        .then((res) => {
          this.tableChildData = res.data;
          this.pagetotalChild = res.pagetotal
        });
    },
    initData() {
      innerApi.get({
        pagenum: this.pagenum,
        pagesize: this.pagesize,
        searchCode: this.searchCode,
        searchDate: this.searchDate,
        searchApplyMan: this.searchApplyMan
      }).then((res) => {       
        this.tableData = res.data;
        this.pagetotal = res.pagetotal
      });
      innerApi.getChild({
        pagenum: this.pagenumChild,
        pagesize: this.pagesizeChild
      }).then((res) => {
        this.tableChildData = res.data;
        this.pagetotalChild = res.pagetotal
      });
    },
  },
};
</script>

<style>
.el-card__header {
  padding: 10px;
}
</style>
<style lang="scss" scoped>

.el-card {
  width: 100%;
  height: 100%;

.header {
  width: 30px;
  text-align: left;
}

  .el-dialog {
  width: 800px;
  height: 500px;
}

  .el-row {
    margin-bottom: 10px;
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
  .el-table {
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
}
</style>