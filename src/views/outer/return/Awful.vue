<template>
  <div class="table-container">
    <el-card class="box-card">
      <div slot="header" class="header">
        <el-row>
          <el-tag style="fontsize: 16px">损坏退还操作</el-tag>
          <el-button
            type="primary"
            class="operate-btn el-icon-plus"
            @click="addRow"
            round
            >新增</el-button
          >
        </el-row>
      </div>
      <div class="text item">
        <div class="data-table">
          <el-table :data="tableData" style="width: 100%" max-height="600">
            <el-table-column fixed label="产品/设备编号" width="140">
              <template scope="scope">
                <el-input v-model="scope.row.devCode"></el-input>
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
            <el-table-column label="颜色/形状" width="100">
              <template scope="scope">
                <el-input v-model="scope.row.colorShape"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="单位" width="80">
              <template scope="scope">
                <el-input v-model="scope.row.unit"></el-input>
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

            <el-table-column label="退还人" width="80">
              <template scope="scope">
                <el-input v-model="scope.row.backMan"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="退还日期" resizeable>
              <template scope="scope">
                <div class="block">
                  <el-date-picker
                    v-model="scope.row.backDate"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期"
                  >
                  </el-date-picker>
                </div>
              </template>
            </el-table-column>

            <el-table-column label="备注" resizeable>
              <template scope="scope">
                <el-input v-model="scope.row.notes"></el-input>
              </template>
            </el-table-column>

            <el-table-column label="操作" width="160">
              <template slot-scope="scope">
                <el-button
                  @click.native.prevent="saveRow(scope.$index)"
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
import { outerReturnApi } from "@/api";
export default {
  data: function () {
    return {
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
          backMan: "",
          backDate: "",
          notes: "",
        },
      ],
    };
  },
  methods: {
    deleteRow(index) {
      this.tableData.splice(index, 1);
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
        backMan: "",
        backDate: "",
        notes: "",
      };
      this.tableData.push(singleObj);
    },
    saveRow(index) {
      let tmpObj = this.tableData[index];

      for (let key in tmpObj) {
        if (tmpObj[key] == "") {
          this.$message.error("数据不完整");
          return;
        }
      }
      let operator = localStorage.getItem("uname");
      outerReturnApi
        .awfulPost({
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
  },
};
</script>

<style lang="scss" scoped>
.table-container {
  height: 100%;
  background-color: #f0f2f5;

  .header {
    text-align: left;
    .el-button {
      float: right;
      margin-top: -5px;
    }
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
</style>