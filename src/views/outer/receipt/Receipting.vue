
<template>
  <el-card class="box-card">
    <div slot="header" class="header">
      <el-tag style="fontsize: 16px">正在领用</el-tag>
    </div>
    <div class="text item">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <el-row class="search-form" :gutter="40">
            <el-col :span="6" :offset="2"
              ><div class="grid-content bg-purple">
                <el-input
                  placeholder="请输入产品/设备编号"
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
            <el-col :span="6" :offset="2"
              ><div class="grid-content bg-purple">
                <el-input
                  placeholder="请输入产品/设备名称"
                  v-model.trim="searchDevName"
                  clearable
                >
                  <el-button
                    slot="append"
                    icon="el-icon-search"
                    @click="initData"
                  ></el-button>
                </el-input></div
            ></el-col>
            <el-col :span="6" :offset="2"
              ><div class="grid-content bg-purple">
                <el-input
                  placeholder="请输入领用人"
                  v-model.trim="searchMan"
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
            :data="tableData"
            :row-class-name="hover_style"
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
            <el-table-column label="数量" prop="数量"> </el-table-column>
            <el-table-column label="领用人" prop="领用人"> </el-table-column>
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
    </div>
  </el-card>
</template>

<script>
import { outerReceiptApi } from "@/api";
export default {
  data() {
    return {
      tableData: [],
      // 分页
      pagenum: 1,
      pagesize: 10,
      pagetotal: 100,
      searchDevName: "",
      searchCode: "",
      searchMan: "",
    };
  },
  methods: {
    hover_style({ row, rowIndex }) {
      if (rowIndex < 0) {
        return;
      } else {
        return "hover-style";
      }
    },
    initData() {
      outerReceiptApi
        .receiptingPost({
          pagenum: this.pagenum,
          pagesize: this.pagesize,
          searchDevName: this.searchDevName,
          searchCode: this.searchCode,
          searchMan: this.searchMan,
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
.header {
  text-align: left;
}
</style>