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
                   
                >
                </el-input></div
            ></el-col>
            <el-col :span="8"
              ><div class="grid-content bg-purple">
                <el-input
                  placeholder="请输入名称"
                  v-model.trim="filterName"
                   
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
                  @click="msgFill"
                  >确 定</el-button
                >
                <el-button type="info" @click="cancle">取 消</el-button>
              </div></el-col
            >
          </el-row>
        </div>
        <div class="text item">
          <el-table
            :data="drawerTableData"
            ref="multipleTable"
            size="medium"
            style="width: 100%"
            max-height="700"
            :row-key="bindRowKeys"
            @selection-change="handleSelectionChange"
          >
            <el-table-column
              type="selection"
              width="55"
              :reserve-selection="true"
            ></el-table-column>
            <el-table-column
              label="产品/设备编码"
              prop="产品/设备编码"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              label="产品/设备名称"
              prop="产品/设备名称"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column label="类型" prop="类型" show-overflow-tooltip>
            </el-table-column>
            <el-table-column label="型号" prop="型号" show-overflow-tooltip>
            </el-table-column>
            <el-table-column label="规格" prop="规格" show-overflow-tooltip>
            </el-table-column>
            <el-table-column label="颜色/形状" prop="颜色/形状">
            </el-table-column>
            <el-table-column label="单位" prop="单位"> </el-table-column>
            <el-table-column label="数量" prop="库存量"> </el-table-column>
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
    <el-card class="box-card">
      <div slot="header" class="header">
        <el-tag style="fontSize: 16px">领用登记</el-tag>
        <el-button type="primary" round class="el-icon-plus" @click="addRow">
          新增</el-button
        >
      </div>
      <div class="text item">
        <div class="data-table">
          <el-table
            :data="tableData"
            size="medium"
            style="width: 100%"
            max-height="600"
          >
            <el-table-column fixed label="产品/设备编号" width="140">
              <template scope="scope">
                <el-input   v-model="scope.row.devCode"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="产品/设备名称" width="140">
              <template scope="scope">
                <el-input   v-model="scope.row.devName"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="类型" width="100">
              <template scope="scope">
                <el-input   v-model="scope.row.type"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="型号" width="100">
              <template scope="scope">
                <el-input   v-model="scope.row.model"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="规格" width="100">
              <template scope="scope">
                <el-input   v-model="scope.row.size"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="颜色/形状" :resizable="true">
              <template scope="scope">
                <el-input   v-model="scope.row.colorShape"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="单位" :resizable="true">
              <template scope="scope">
                <el-input   v-model="scope.row.unit"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="数量" width="80">
              <template scope="scope">
                <el-input
                  type="number"
                  min="0"
                  v-model="scope.row.number"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column label="领用人" width="80">
              <template scope="scope">
                <el-input   v-model="scope.row.receiptMan"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="出库人" width="80">
              <template scope="scope">
                <el-input   v-model="scope.row.outMan"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="出库日期" width="140">
              <template scope="scope">
                <div class="block">
                  <el-date-picker
                    v-model="scope.row.outDate"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期"
                  >
                  </el-date-picker>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="备注" width="125">
              <template scope="scope">
                <el-input   v-model="scope.row.notes"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="选择库" width="140">
              <template scope="scope">
                <el-select v-model="scope.row.store" placeholder="请选择">
                  <el-option
                    v-for="item in storeArea"
                    :key="item.id"
                    :label="item.text"
                    :value="item.title"
                  >
                  </el-option>
                </el-select>
              </template>
            </el-table-column>

            <el-table-column label="操作" width="140">
              <template slot-scope="scope">
                <el-button
                  @click.native.prevent="saveRow(scope.$index)"
                  style="margin-left: 5px"
                  type="primary"
                  size="small"
                >
                  保存
                </el-button>
                <el-button
                  @click.native.prevent="deleteRow(scope.$index)"
                  type="info"
                  size="small"
                >
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { inventApi } from "@/api";
import { outerReceiptApi } from "@/api";
export default {
  data: function () {
    return {
      storeArea: [
        { id: 1, text: "设备类", title: "devicestorege" },
        { id: 2, text: "电子产品类", title: "elecprostorege" },
        { id: 3, text: "养护产品类", title: "carcarestorege" },
        { id: 4, text: "工具类", title: "toolstorege" },
        { id: 5, text: "日常用品类", title: "dailystorege" },
        { id: 6, text: "备用类", title: "reservestorege" },
      ],
      tableData: [],
      drawer: false, //显示抽屉、提示编码
      drawerTableData: [],
      multipleSelection: [],
      pagenum: 1,
      pagesize: 10,
      pagetotal: 100,
      filterCode: "",
      filterName: "",
    };
  },
  methods: {
    deleteRow(index) {
      this.tableData.splice(index, 1);
    },
    addRow() {
      this.drawer = true;
      this.initData();
    },
    saveRow(index) {
      let tmpObj = this.tableData[index];
      let operator = localStorage.getItem("uname");

      for (let key in tmpObj) {
        if (tmpObj[key] == "") {
          this.$message.error("数据不完整");
          return;
        }
      }
      outerReceiptApi
        .receiptPost({
          data: tmpObj,
          operator: operator,
        })
        .then((res) => {
          if (res.meta.state == 200) {
            this.$message.success("提交成功");
            this.deleteRow(index);
          } else {
            this.$message.error(res.meta.msg);
          }
        });
    },
    bindRowKeys(row) {
      return row["编码"];
    },
    msgFill() {
      if (this.multipleSelection) {
        let tmpArr = this.multipleSelection;
        tmpArr.forEach((element) => {
          let tmpObj = {};
          tmpObj["devCode"] = element["产品/设备编码"];
          tmpObj["devName"] = element["产品/设备名称"];
          tmpObj["type"] = element["类型"];
          tmpObj["model"] = element["型号"];
          tmpObj["size"] = element["规格"];
          tmpObj["colorShape"] = element["颜色/形状"];

          tmpObj["unit"] = "";
          tmpObj["number"] = 0;
          tmpObj["receiptMan"] = "";
          tmpObj["outMan"] = "";
          tmpObj["outDate"] = "";
          tmpObj["notes"] = "";
          tmpObj["store"] = "";
          this.tableData.push(tmpObj);
        });
        this.multipleSelection = [];
      }
    },
    cancle() {
      this.drawer = false;
      this.$refs.multipleTable.clearSelection();
    },
    initData() {
      inventApi
        .filter({
          filterCode: this.filterCode,
          filterName: this.filterName,
          pagenum: this.pagenum,
          pagesize: this.pagesize,
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
    },
  },
  watch: {
    filterCode() {
      this.initData();
    },
  },
};
</script>

<style lang="scss">
.el-table td .cell {
  padding: 2px;
  .el-input {
    width: 100%;
    height: 100%;
  }
}
</style>
<style lang="scss" scoped>
.table-container {
  height: 100%;
  background-color: #f0f2f5;

  .el-card {
    //el-card样式
    width: 100%;
    text-align: left;

    .header .el-button {
      float: right;
      margin-top: -5px;
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

    .data-table {
      width: 100%;
      padding: 10px;
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
          padding: 0px;
        }
      }
    }
  }
}
</style>