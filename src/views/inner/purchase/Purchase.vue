<template>
  <div class="table-container">
    <!-- 自动填写弹框 -->
    <el-drawer title="我是标题" :visible.sync="drawer" :with-header="false">
      <el-card class="box-card">
        <div slot="header">
          <el-row class="search-form" :gutter="20" style="margin-bottom: 10px">
            <el-col :span="8"
              ><div class="grid-content bg-purple">
                <el-input
                  placeholder="请输入编码"
                  v-model.trim="filterCode"
                  clearable
                >
                </el-input></div
            ></el-col>
            <el-col :span="8"
              ><div class="grid-content bg-purple">
                <el-input
                  placeholder="请输入类型"
                  v-model.trim="filterType"
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
                <el-button
                  type="primary"
                  style="margin-right: 10px"
                  @click="codeSure"
                  >确 定</el-button
                >
                <el-button type="info" @click="codeCancle">取 消</el-button>
              </div></el-col
            >
          </el-row>
          <el-row class="search-form" :gutter="20">
            <el-col :span="8"
              ><div class="grid-content bg-purple">
                <el-input
                  placeholder="请输入名称"
                  v-model.trim="filterName"
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
                  placeholder="请输入规格型号"
                  v-model.trim="filterModel"
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
                  placeholder="颜色形状"
                  v-model.trim="filterColorShape"
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
        </div>
        <div class="text item">
          <el-table
            :data="drawerTableData"
            ref="multipleTable"
            size="medium"
            style="width: 100%"
            max-height="700"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column label="编码" prop="编码" show-overflow-tooltip>
            </el-table-column>
            <el-table-column label="类型" prop="类型" show-overflow-tooltip>
            </el-table-column>
            <el-table-column label="名称" prop="名称" show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              label="规格型号"
              prop="规格型号"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column label="颜色形状" prop="颜色形状">
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
        </div>
      </el-card>
    </el-drawer>
    <!-- /自动填写弹框 -->
    <el-row>
      <el-button type="primary" class="operate-btn el-icon-plus" @click="addRow"
        >新增</el-button
      >
      <el-button
        type="success"
        class="operate-btn el-icon-check"
        @click="saveForm"
        >保存</el-button
      >
    </el-row>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <div class="head-form">
          <table>
            <tr>
              <td>
                <label for="hinp1">申请单编号：</label>
                <el-input
                  id="hinp1"
                  v-model.trim="tableNumber"
                  autocomplete="off"
                  clearable
                >
                </el-input>
              </td>
              <td>
                <label for="hinp2">申报人：</label>
                <el-input
                  id="hinp2"
                  v-model.trim="applyMan"
                  autocomplete="off"
                  clearable
                >
                </el-input>
              </td>
              <td>
                <label for="hinp3">采购人：</label>
                <el-input
                  id="hinp3"
                  v-model.trim="purchaser"
                  autocomplete="off"
                  clearable
                >
                </el-input>
              </td>
              <td>
                <label for="sel">使用部门：</label>
                <el-select v-model.trim="currDept" placeholder="请选择">
                  <el-option
                    v-for="item in deptArr"
                    :key="item.id"
                    :label="item.label"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </td>
            </tr>
            <tr>
              <td>
                <label for="hinp5">应付金额：</label>
                <el-input
                  id="hinp5"
                  v-model.trim="payMoney"
                  autocomplete="off"
                  clearable
                >
                </el-input>
              </td>
              <td>
                <label for="hinp6">实付金额：</label>
                <el-input
                  id="hinp6"
                  v-model.trim="payMoney"
                  autocomplete="off"
                  clearable
                >
                </el-input>
              </td>
              <td>
                <div class="block">
                  <span class="demonstration">申请日期：</span>
                  <el-date-picker
                    v-model.trim="applyDate"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期"
                  >
                  </el-date-picker>
                </div>
              </td>
            </tr>
            <tr>
              <td colspan="4">
                <label for="hinp7" class="notelabel">备 注：</label>
                <el-input
                  id="hinp7"
                  class="noteinp"
                  v-model.trim="note"
                  autocomplete="off"
                  clearable
                >
                </el-input>
              </td>
            </tr>
          </table>
        </div>
      </div>
      <div class="text item">
        <div class="data-table">
          <el-table
            :data="tableData"
            size="medium"
            style="width: 100%"
            max-height="250"
          >
            <el-table-column fixed label="产品/设备编号" width="140">
              <template scope="scope">
                <el-input
                  v-model="scope.row.devCode"
                  @click.native="showDrawer"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column label="产品/设备名称" width="140">
              <template scope="scope">
                <el-input v-model="scope.row.devName"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="类型" width="100">
              <template scope="scope">
                <el-input v-model="scope.row.type"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="型号" width="100">
              <template scope="scope">
                <el-input v-model="scope.row.model"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="规格" width="100">
              <template scope="scope">
                <el-input v-model="scope.row.size"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="颜色/形状" :resizable="true">
              <template scope="scope">
                <el-input v-model="scope.row.colorShape"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="单位" :resizable="true">
              <template scope="scope">
                <el-input v-model="scope.row.unit"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="数量" width="80">
              <template scope="scope">
                <el-input
                  type="number"
                  v-model="scope.row.number"
                  @change="calcMoney(scope.$index)"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column label="单价" width="80">
              <template scope="scope">
                <el-input
                  type="number"
                  v-model="scope.row.price"
                  @change="calcMoney(scope.$index)"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column label="运费" width="80">
              <template scope="scope">
                <el-input
                  type="number"
                  v-model="scope.row.freight"
                  @change="calcMoney(scope.$index)"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column label="合计金额" width="80">
              <template scope="scope">
                <el-input v-model="scope.row.total"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="票据类型" width="140">
              <template scope="scope">
                <el-select v-model="scope.row.billType" placeholder="请选择">
                  <el-option
                    v-for="item in feeTypeObj"
                    :key="item.id"
                    :label="item.text"
                    :value="item.text"
                  >
                  </el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column label="采购日期" width="160">
              <template scope="scope">
                <div class="block">
                  <el-date-picker
                    v-model="scope.row.purchaseDate"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期"
                  >
                  </el-date-picker>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="用途" :resizable="true">
              <template scope="scope">
                <el-input v-model="scope.row.purpose"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="备注" :resizable="true">
              <template scope="scope">
                <el-input v-model="scope.row.notes"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="操作" :resizable="true">
              <template slot-scope="scope">
                <el-button
                  type="text"
                  style="margin-left: 10px"
                  @click.native.prevent="deleteRow(scope.$index, tableData)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import codeApi from "@/api/coding/coding";
import { purchaseApi } from "@/api";
export default {
  data: function () {
    return {
      // 头部表单
      totalNum: 0,
      tableNumber: "",
      applyMan: "",
      purchaser: "",
      currDept: "行政部门",
      applyDate: "",
      payMoney: 0,
      note: "",
      deptArr: [
        { id: 1, label: "行政部门" },
        { id: 2, label: "研发部门" },
        { id: 3, label: "装配部门" },
        { id: 4, label: "外务部门" },
      ],
      //采购操作表格
      feeTypeObj: [
        {
          id: 1,
          text: "普票",
        },
        {
          id: 2,
          text: "专票",
        },
        {
          id: 3,
          text: "增值税普票",
        },
        {
          id: 4,
          text: "增值税专票",
        },
      ],
      tableData: [
        {
          devCode: "",
          devName: "",
          type: "",
          model: "",
          size: "",
          colorShape: "",
          unit: "",
          number: 0,
          price: 0,
          freight: 0,
          total: 0,
          billType: "",
          purchaseDate: "",
          purpose: "",
          notes: "",
        },
      ],
      drawer: false, //显示抽屉、提示编码
      drawerTableData: [],
      multipleSelection: [],

      filterCode: "",
      filterType: "",
      filterName: "",
      filterModel: "",
      filterColorShape: "",
      pagenum: 1,
      pagesize: 10,
      pagetotal: 100,
    };
  },
  methods: {
    //计算每行的合计金额
    calcMoney(index) {
      let tmp = this.tableData[index];
      let num1 = parseInt(tmp.number);
      let num2 = parseFloat(tmp.price);
      let num3 = parseFloat(tmp.freight);
      tmp.total = num1 * num2 + num3;
      this.totalMoney();
    },
    totalMoney() {
      let money = 0;
      let number = 0;
      for (var p of this.tableData) {
        money += parseFloat(p.total);
        number += parseInt(p.number);
      }
      this.payMoney = money;
      this.totalNum = number;
    },
    deleteRow(index, row) {
      this.tableData.splice(index, 1);
      this.totalMoney();
    },
    addRow() {
      let singleObj = {
        devCode: "",
        devName: "",
        type: "",
        model: "",
        size: "",
        colorShape: "",
        unit: "",
        number: 0,
        price: 0,
        freight: 0,
        total: 0,
        billType: "",
        purchaseDate: "",
        purpose: "",
        notes: "",
      };
      this.tableData.push(singleObj);
    },
    saveForm() {
      let mainMsg = {
        tableNumber: this.tableNumber,
        applyMan: this.applyMan,
        purchaser: this.purchaser,
        currDept: this.currDept,
        applyDate: this.applyDate,
        totalNum: this.totalNum,
        payMoney: this.payMoney,
        note: this.note,
      };
      for (let key in mainMsg) {
        if (mainMsg[key] === "") {
          this.$message.error("数据不完整");
          return;
        }
      }
      for (let item of this.tableData) {
        for (let key in item) {
          if (!item[key]) {
            this.$message.error("数据填写不完整");
            return;
          }
        }
      }

      let operator = localStorage.getItem("operator");
      let sendMsg = {
        operator: operator,
        main: mainMsg,
        detail: this.rowContent,
      };

      purchaseApi.post(sendMsg).then((res) => {
        if (res.meta.state == 200) {
          this.$message.success("提交成功");
        } else {
          this.$message.error(res.meta.msg);
        }
      });
    },
    showDrawer() {
      this.drawer = true;
      this.initData();
    },
    initData() {
      codeApi
        .filterCode({
          filterCode: this.filterCode,
          filterType: this.filterType,
          filterName: this.filterName,
          filterModel: this.filterModel,
          filterColorShape: this.filterColorShape,
          pagenum: this.pagenum,
          pagesize: this.pagesize,
          pagetotal: this.pagetotal,
        })
        .then((res) => {
          if (res.meta.state == 200) {
            this.drawerTableData = res.data;
            this.pagetotal = res.pagetotal;
          } else {
            this.$message.error(res.meta.msg);
          }
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
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(this.multipleSelection);
    },
    codeSure() {
      if (this.multipleSelection) {
        let tmpObj = {
          devCode: "",
          devName: "",
          type: "",
          model: "",
          size: "",
          colorShape: "",
          unit: "",
          number: 0,
          price: 0,
          freight: 0,
          total: 0,
          billType: "",
          purchaseDate: "",
          purpose: "",
          notes: "",
        };
        let tmpArr = this.multipleSelection;
        tmpArr.forEach((element) => {
          tmpObj["devCode"] = element["编码"];
          tmpObj["devName"] = element["名称"];
          tmpObj["type"] = element["类型"];
          tmpObj["model"] = element["规格型号"];
          tmpObj["size"] = element["规格型号"];
          tmpObj["colorShape"] = element["颜色形状"];
          this.tableData.push(tmpObj);
        });
        console.log(this.tableData);
        this.multipleSelection = [];
      }
    },
    codeCancle() {
      this.drawer = false;
    },
  },
  watch: {
    filterCode() {
      this.initData();
    },
  },
};
</script>

<style>
.el-drawer {
  width: 40% !important;
}
</style>

<style lang="scss" scoped>
.table-container {
  height: 100%;
  background-color: #f0f2f5;

  .el-input {
    width: 100%;
  }

  //el-card样式
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .box-card {
    width: 100%;
  }
  // 头部表单
  .head-form {
    width: 100%;
    /* padding: 20px; */
    background-color: #fff;
  }

  .head-form table {
    width: 100%;
    background-color: #fff;
  }

  .head-form .el-input {
    width: 200px;
    height: 100%;
  }

  .head-form .form-control {
    width: auto;
    display: inline-block;
  }

  .head-form tr,
  .head-form td {
    height: 40px;
    margin: 0;
    padding: 0;
  }

  .head-form td {
    padding: 5px 0;
  }

  .head-form .noteinp {
    width: calc(100% - 60px);
  }

  .head-form .notelabel {
    width: 60px;
  }

  .data-table {
    width: 100%;
    margin-top: 20px;
    background-color: #fff;

    .table {
      width: 100%;
      font-size: 14px;
      border: none;

      .el-input {
        width: 100%;
        height: 100%;
      }

      td {
        border: none;
        // border: 1px solid rgb(207, 206, 206);
        padding: 0px;
      }
    }
  }

  .operate-btn {
    float: left;
    margin: 10px 5px;
    padding: 0 10px;
    height: 35px;
    line-height: 35px;
  }
}
</style>