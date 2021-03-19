<template>
  <el-card class="box-card">
    <div slot="header" class="header">
      <el-tag style="fontSize: 16px">生产入库</el-tag>
      <el-button type="primary" round class="el-icon-plus" @click="addRow">
        新增</el-button
      >
    </div>
    <div class="text item">
      <div class="data-table">
        <el-table
          :data="tableData"
          size="small"
          border
          style="width: 100%"
          highlight-current-row
          max-height="700"
        >
          <el-table-column fixed label="产品/设备编号" width="140">
            <template scope="scope">
              <el-input v-model="scope.row.devCode" clearable></el-input>
            </template>
          </el-table-column>
          <el-table-column label="产品/设备名称" width="140">
            <template scope="scope">
              <el-input v-model="scope.row.devName" clearable></el-input>
            </template>
          </el-table-column>
          <el-table-column label="类型" width="100">
            <template scope="scope">
              <el-input v-model="scope.row.type" clearable></el-input>
            </template>
          </el-table-column>
          <el-table-column label="型号" width="100">
            <template scope="scope">
              <el-input v-model="scope.row.model" clearable></el-input>
            </template>
          </el-table-column>
          <el-table-column label="规格" width="100">
            <template scope="scope">
              <el-input v-model="scope.row.size" clearable></el-input>
            </template>
          </el-table-column>
          <el-table-column label="颜色/形状" resizable>
            <template scope="scope">
              <el-input v-model="scope.row.colorShape" clearable></el-input>
            </template>
          </el-table-column>
          <el-table-column label="单位" resizable>
            <template scope="scope">
              <el-input v-model="scope.row.unit" clearable></el-input>
            </template>
          </el-table-column>
          <el-table-column label="数量" resizable>
            <template scope="scope">
              <el-input
                type="number"
                min="0"
                v-model="scope.row.number"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column label="生产员" width="80">
            <template scope="scope">
              <el-input v-model="scope.row.productor" clearable></el-input>
            </template>
          </el-table-column>
          <el-table-column label="生产日期" width="140">
            <template scope="scope">
              <div class="block">
                <el-date-picker
                  v-model="scope.row.birthDate"
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
              <el-input v-model="scope.row.inputMan" clearable></el-input>
            </template>
          </el-table-column>

          <el-table-column label="入库日期" width="160">
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
          <el-table-column label="备注" width="140">
            <template scope="scope">
              <el-input v-model="scope.row.notes" clearable></el-input>
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
          <el-table-column label="操作" width="160">
            <template slot-scope="scope">
              <el-button
                style="margin-left: 5px"
                @click.native.prevent="saveRow(scope.$index)"
                type="success"
                size="small"
                >保存
              </el-button>
              <el-button
                @click.native.prevent="deleteRow(scope.$index)"
                type="danger"
                size="small"
                >删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </el-card>
</template>

<script>
import { productInApi } from "@/api";
export default {
  data() {
    return {
      //生产入库操作
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
          productor: "",
          birthDate: "",
          inputMan: "",
          inputDate: "",
          notes: "",
          store: "",
        },
      ],
      storeArea: [
        { id: 1, text: "设备类", title: "devicestorege" },
        { id: 2, text: "电子产品类", title: "elecprostorege" },
        { id: 3, text: "养护产品类", title: "carcarestorege" },
        { id: 4, text: "工具类", title: "toolstorege" },
        { id: 5, text: "日常用品类", title: "dailystorege" },
        { id: 6, text: "备用类", title: "reservestorege" },
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
        productor: "",
        birthDate: "",
        inputMan: "",
        inputDate: "",
        notes: "",
        store: "",
      };
      this.tableData.push(singleObj);
    },
    saveRow(index) {
      let currRow = this.tableData[index];
      for (let key in currRow) {
        if (!currRow[key]) {
          this.$message.error("数据填写不完整");
          return;
        }
      }

      let operator = localStorage.getItem("uname")
      productInApi
        .post({
          data: currRow,
          operator: operator
        })
        .then((res) => {
          // console.log(res);
          if (res.meta.state == 200) {
            this.$message.success('提交成功');
          } else {
            this.$message.error(res.meta.msg);
          }
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.el-card {
  //el-card样式
  width: 100%;
  text-align: left;

  .el-input {
    width: 100%;
  }

  .header .el-button {
    float: right;
    margin-top: -5px;
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