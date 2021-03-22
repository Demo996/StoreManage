<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <el-tag style="float: left">生产入库记录</el-tag>
    </div>
    <div class="text item">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <el-row class="search-form" :gutter="40">
            <el-col :span="4"
              ><div class="grid-content bg-purple">
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
            <el-col :span="4" :offset="2"
              ><div class="grid-content bg-purple">
                <div class="block">
                  <el-date-picker
                    v-model="searchDate"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="选择生产日期"
                  >
                  </el-date-picker>
                </div></div
            ></el-col>
            <el-col :span="5" :offset="2"
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
            <el-col :span="5" :offset="2"
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
            <el-table-column label="产品/设备编码" prop="产品/设备编码" show-overflow-tooltip>
            </el-table-column>
            <el-table-column label="产品/设备名称" prop="产品/设备名称" show-overflow-tooltip>
            </el-table-column>
            <el-table-column label="类型" prop="类型" show-overflow-tooltip> </el-table-column>
            <el-table-column label="型号" prop="型号" show-overflow-tooltip> </el-table-column>
            <el-table-column label="规格" prop="规格" show-overflow-tooltip> </el-table-column>
            <el-table-column label="颜色/形状" prop="颜色/形状" show-overflow-tooltip>
            </el-table-column>
            <el-table-column label="单位" prop="单位"> </el-table-column>
            <el-table-column label="数量" prop="数量"> </el-table-column>
            <el-table-column label="生产员" prop="生产员"> </el-table-column>
            <el-table-column label="生产日期" prop="生产日期">
            </el-table-column>
            <el-table-column label="入库员" prop="入库员"> </el-table-column>
            <el-table-column label="入库日期" prop="入库日期">
            </el-table-column>
            <el-table-column label="备注" prop="备注" show-overflow-tooltip> </el-table-column>
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
        </div>
      </el-card>
    </div>
  </el-card>
</template>


<script>
import { productSearApi } from "@/api";
export default {
  data() {
    return {
      tableData: [],
      search: "",
      currStore: "",
      storeArea: [
        { id: 0, text: "所有库", title: "" },
        { id: 1, text: "设备类", title: "devicestorege" },
        { id: 2, text: "电子产品类", title: "elecprostorege" },
        { id: 3, text: "养护产品类", title: "carcarestorege" },
        { id: 4, text: "工具类", title: "toolstorege" },
        { id: 5, text: "日常用品类", title: "dailystorege" },
        { id: 6, text: "备用类", title: "reservestorege" },
      ],
      // 分页
      pagenum: 1,
      pagesize: 5,
      pagetotal: 100,
      searchDate: "",
      searchCode: "",
      searchDevName: "",
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
      productSearApi
        .post({
          store: this.currStore,
          pagenum: this.pagenum,
          pagesize: this.pagesize,
          searchCode: this.searchCode,
          searchDate: this.searchDate,
          searchDevName: this.searchDevName
        })
        .then((res) => {
          if(res.meta.state == 200) {
              this.pagetotal = res.pagetotal;
              this.tableData = res.data;
          } else {
            this.$message.error(res.meta.msg)
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
// 分页
.el-pagination {
  width: 100%;
  padding: 10px 0px;
  background: #ebeef5;
  text-align: right;
  margin-top: 10px;
  padding-right: 10px;
  box-sizing: border-box;
}
</style>