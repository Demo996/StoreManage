<template>
  <div class="table-container">
    <el-card class="box-card">
      <div slot="header" class="header">
        <el-row>
          <el-tag style="fontsize: 16px">正常退还操作</el-tag>
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
            <el-table-column label="退还日期" width="140">
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

            <el-table-column label="入库员" width="80">
              <template scope="scope">
                <el-input v-model="scope.row.inputMan"></el-input>
              </template>
            </el-table-column>

            <el-table-column label="入库日期" width="140">
              <template scope="scope">
                <div class="block">
                  <el-date-picker
                    v-model="scope.row.inputDate"
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
                <el-input v-model="scope.row.notes"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="选择库" width="120">
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
      storeArea: [
        {
          id: 1,
          text: "设备类",
          title: "devicestorege",
        },
        {
          id: 2,
          text: "电子产品类",
          title: "elecprostorege",
        },
        {
          id: 3,
          text: "养护产品类",
          title: "carcarestorege",
        },
        {
          id: 4,
          text: "工具类",
          title: "toolstorege",
        },
        {
          id: 5,
          text: "日常用品类",
          title: "dailystorege",
        },
        {
          id: 6,
          text: "备用类",
          title: "reservestorege",
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
          backMan: "",
          backDate: "",
          inputMan: "",
          inputDate: "",
          notes: "",
          store: "",
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
        inputMan: "",
        inputDate: "",
        notes: "",
        store: "",
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

      outerReturnApi.normalPost(tmpObj).then((res) => {
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
        // border: 1px solid rgb(207, 206, 206);
        padding: 0px;
      }
    }
  }
}
</style>