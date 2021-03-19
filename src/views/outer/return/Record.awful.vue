<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix"></div>

    <div class="text item">
      <el-table
        :data="tableData"
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
        <el-table-column label="产品/设备编码" prop="产品/设备编码">
        </el-table-column>
        <el-table-column label="产品/设备名称" prop="产品/设备名称">
        </el-table-column>
        <el-table-column label="类型" prop="类型"> </el-table-column>
        <el-table-column label="型号" prop="型号"> </el-table-column>
        <el-table-column label="规格" prop="规格"> </el-table-column>
        <el-table-column label="颜色/形状" prop="颜色/形状"> </el-table-column>
        <el-table-column label="单位" prop="单位"> </el-table-column>

        <el-table-column label="数量" prop="数量"> </el-table-column>

        <el-table-column label="退还人" prop="退还人"> </el-table-column>
        <el-table-column label="退还日期" prop="退还日期"> </el-table-column>
        <el-table-column label="备注" prop="备注"> </el-table-column>
        <el-table-column label="操作员" prop="操作员"> </el-table-column>
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
import { outerReturnApi } from "@/api";
export default {
  data() {
    return {
      tableData: [],
      // 分页
      pagenum: 1,
      pagesize: 10,
      pagetotal: 100,
    };
  },
  methods: {
    initData() {
      outerReturnApi
        .awfulRecord({
          pagenum: this.pagenum,
          pagesize: this.pagesize,
        })
        .then((res) => {
          if (res.meta.state == 200) {
            this.pagetotal = res.pagetotal;
            this.tableData = res.data;
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
  },
  watch: {
    //库变化表格也相应更新当前库数据
    currStore() {
      this.initData();
    },
  },
  created() {
    this.initData();
  },
};
</script>

<style lang="scss" scoped>
.store {
  text-align: left;
  margin-bottom: 10px;
}
</style>