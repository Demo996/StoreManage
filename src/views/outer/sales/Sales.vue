<template>
  <div class="table-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="float: left">商品销售</span>
        <el-row>
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
                <el-input clearable v-model="scope.row.devCode"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="产品/设备名称" width="140">
              <template scope="scope">
                <el-input clearable v-model="scope.row.devName"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="类型" width="100">
              <template scope="scope">
                <el-input clearable v-model="scope.row.type"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="型号" width="100">
              <template scope="scope">
                <el-input clearable v-model="scope.row.model"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="规格" width="100">
              <template scope="scope">
                <el-input clearable v-model="scope.row.size"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="颜色/形状" :resizable="true">
              <template scope="scope">
                <el-input clearable v-model="scope.row.colorShape"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="单位" :resizable="true">
              <template scope="scope">
                <el-input clearable v-model="scope.row.unit"></el-input>
              </template>
            </el-table-column>

<el-table-column label="数量" width="80">
              <template scope="scope">
                <el-input
                  type="number"
                  min="0"
                  v-model="scope.row.number"
                  @change="calcMoney(scope.$index)"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column label="单价" width="80">
              <template scope="scope">
                <el-input
                type="number"
                  min="0"
                  v-model="scope.row.price"
                  @change="calcMoney(scope.$index)"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column label="总额" width="80">
              <template scope="scope">
                <el-input
                readonly
                  v-model="scope.row.total"
                ></el-input>
              </template>
            </el-table-column>

            <el-table-column label="出库人" width="80">
              <template scope="scope">
                <el-input clearable v-model="scope.row.outMan"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="送货人" width="80">
              <template scope="scope">
                <el-input clearable v-model="scope.row.deliver"></el-input>
              </template>
            </el-table-column>

            <el-table-column label="客户名称" width="80">
              <template scope="scope">
                <el-input clearable v-model="scope.row.client"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="签收人" width="80">
              <template scope="scope">
                <el-input clearable v-model="scope.row.signer"></el-input>
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
                <el-input clearable v-model="scope.row.notes"></el-input>
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
import { outerSalesApi } from "@/api";
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
          price: 0.0,
          total: 0.0,
          outMan: '',
          deliver: '',
          client: '',
          signer:'',
          outDate: "",
          notes: "",
          store: "",
          operator: "admin"
        }
      ]
    };
  },
  methods: {
      calcMoney(index){
      let tmp = this.tableData[index];
      let num1 = parseInt(tmp.number);
      let num2 = parseFloat(tmp.price);
      tmp.total = num1 * num2;
      },
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
          price: 0.0,
          total: 0.0,
          outMan: '',
          deliver: '',
          client: '',
          signer:'',
          outDate: "",
          notes: "",
          store: "",
          operator: "admin"
      }
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

      outerSalesApi.salesPost(tmpObj).then((res) => {
          console.log(res);
        if (res.status == 200) {
          if (res.status == 200) {
            this.$message.success(res.msg);
            this.deleteRow(index)
          } else {
            this.$message.error(res.msg);
          }
        }
      });
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

  //el-card样式
  .text {
    font-size: 14px;
  }

  .item {
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
        // border: 1px solid rgb(207, 206, 206);
        padding: 0px;
      }
    }
  }

  .operate-btn {
    float: right;
    width: 100px;
    height: 50px;
    font-size: 16px;
    margin-right: 50px;
    vertical-align: middle;
  }
}
</style>