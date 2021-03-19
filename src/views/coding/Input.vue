<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <el-row
        ><input-excel @getResult="getMyExcelData" class="excel"></input-excel>
        <el-button
          type="primary"
          plain
          :disabled="disabled"
          size="medium"
          class="import"
          @click="importData"
          >导入数据库</el-button
        >
      </el-row>
    </div>
    <div class="text item">
      <el-table :data="tableData" border stripe style="width: 100%">
        <el-table-column
          label="序号"
          type="index"
          show-overflow-tooltip
          width="50"
        >
        </el-table-column>
        <el-table-column label="一级含义" prop="含义"> </el-table-column>
        <el-table-column label="一级编码" prop="编码"> </el-table-column>
        <el-table-column label="二级含义" prop="含义_1"> </el-table-column>
        <el-table-column label="二级编码" prop="编码_1"> </el-table-column>
        <el-table-column label="三级含义" prop="含义_2"> </el-table-column>
        <el-table-column label="三级编码" prop="编码_2"> </el-table-column>
        <el-table-column label="四级含义" prop="含义_3"> </el-table-column>
        <el-table-column label="四级编码" prop="编码_3"> </el-table-column>
        <el-table-column label="五级含义" prop="含义_4"> </el-table-column>
        <el-table-column label="五级编码" prop="编码_4"> </el-table-column>
        <el-table-column label="最终编码" prop="最终编码"> </el-table-column>
      </el-table>
    </div>
  </el-card>
</template>
<script>
import inputExcel from "@/components/Xlsx";
import codingApi from "@/api/coding/coding";
export default {
  data() {
    return {
      tableData: [],
      disabled: true,
    };
  },
  components: {
    inputExcel,
  },
  methods: {
    getMyExcelData(data) {
      if (data) {
        this.tableData = data;
        this.disabled = false;
      }
      // data 为读取的excel数据，在这里进行处理该数据
    },
    importData() {
      codingApi.importData(this.tableData).then((res) => {
        if (res.meta.state == 200) {
          this.$message.success("提交成功");
        } else {
          this.$message.error(res.meta.msg);
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.excel {
  float: left;
}
.import {
  float: left;
  margin-left: 20px;
}
</style>