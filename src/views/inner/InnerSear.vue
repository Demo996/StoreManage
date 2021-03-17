<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <el-tag style="float: left">审核入库记录</el-tag>
    </div>
    <div class="text item">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <el-row class="search-form" :gutter="20">
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
            <el-col :span="4"
              ><div class="grid-content bg-purple">
                <div class="block">
                  <el-date-picker
                    v-model="searchDate"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="选择申请日期"
                  >
                  </el-date-picker>
                </div></div
            ></el-col>
            <el-col :span="8"
              ><div class="grid-content bg-purple">
                <el-input placeholder="请输入申请单编号" v-model.trim="searchCode" clearable>
                  <el-button
                    slot="append"
                    icon="el-icon-search"
                    @click="initData"
                  ></el-button>
                </el-input></div
            ></el-col>
            <el-col :span="8"
              ><div class="grid-content bg-purple">
                <el-input placeholder="请输入申报人" v-model.trim="searchApplyMan" clearable>
                  <el-button
                    slot="append"
                    icon="el-icon-search"
                    @click="initData"
                  ></el-button>
                </el-input></div
            ></el-col>
          </el-row>
          <el-table
            :data="tableData"
            size="medium"
            :row-class-name="hover_style"
            border
            stripe
            @row-click="handle"
            style="width: 100%"
          >
            <el-table-column
              label="序号"
              type="index"
              show-overflow-tooltip
              width="50"
            >
            </el-table-column>
            <el-table-column label="申请单编号" prop="申请单编号" show-overflow-tooltip>
            </el-table-column>
            <el-table-column label="入库总数" prop="入库总数">
            </el-table-column>
            <el-table-column label="应付金额" prop="应付金额">
            </el-table-column>
            <el-table-column label="实付金额" prop="实付金额">
            </el-table-column>
            <el-table-column label="申报人" prop="申报人"> </el-table-column>
            <el-table-column label="使用部门" prop="使用部门">
            </el-table-column>
            <el-table-column label="申请日期" prop="申请日期">
            </el-table-column>
            <el-table-column label="采购人" prop="采购人"> </el-table-column>
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
          <!-- /分页 -->
        </div>

        <div class="text item">
          <el-table
            :data="tableChildData"
            :row-class-name="hover_style"
            border
            stripe
            size="medium"
            max-height="500"
            style="width: 100%"
          >
            <el-table-column
              label="序号"
              type="index"
              show-overflow-tooltip
              width="50"
            >
            </el-table-column>
            <el-table-column label="申请单编号" prop="申请单编号" show-overflow-tooltip>
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
            <el-table-column label="规格" prop="规格"> </el-table-column>
            <el-table-column label="单位" prop="单位"> </el-table-column>
            <el-table-column label="数量" prop="数量"> </el-table-column>
            <el-table-column label="单价" prop="单价"> </el-table-column>
            <el-table-column label="运费" prop="运费"> </el-table-column>
            <el-table-column label="合计金额" prop="合计金额">
            </el-table-column>
            <el-table-column label="票据类型" prop="票据类型">
            </el-table-column>
            <el-table-column label="票据签收">
              <template slot-scope="scope">
                <el-switch
                  disabled
                  v-model="scope.row['票据签收']"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  active-value="是"
                  inactive-value="否"
                >
                </el-switch>
              </template>
            </el-table-column>
            <el-table-column label="采购日期" prop="采购日期">
            </el-table-column>
            <el-table-column label="用途" prop="用途" show-overflow-tooltip> </el-table-column>
            <el-table-column label="备注" prop="备注" show-overflow-tooltip> </el-table-column>
            <el-table-column label="入库员" prop="入库员"> </el-table-column>
            <el-table-column label="入库日期" prop="入库日期">
            </el-table-column>
          </el-table>
          <!-- 分页 -->
          <el-pagination
            @size-change="handleSizeChangeChild"
            @current-change="handleCurrentChangeChild"
            :current-page="pagenumChild"
            :page-sizes="[5, 10, 20, 30]"
            :page-size="pagesizeChild"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pagetotalChild"
          >
          </el-pagination>
          <!-- /分页 -->
        </div>
      </el-card>
    </div>
  </el-card>
</template>

<script>
import { checkSearApi } from "@/api";
export default {
  data() {
    return {
      tableData: [],
      tableChildData: [],
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
      kw: "", // 点击主表行  保存行内申请单编号 以便下面联动搜索
      currIndex: 0, // 主表当前行
      // 分页
      pagenum: 1,
      pagesize: 5,
      pagetotal: 100,
      pagenumChild: 1,
      pagesizeChild: 4,
      pagetotalChild: 100,

      searchDate: "",
      searchCode: "",
      searchApplyMan: ""
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
      checkSearApi
        .post({
          store: this.currStore,
          pagenum: this.pagenum,
          pagesize: this.pagesize,
          searchDate: this.searchDate,
          searchCode: this.searchCode,
          searchApplyMan:this.searchApplyMan
        })
        .then((res) => {
          console.log(res);
          this.pagetotal = parseInt(res.pagetotal);
          this.tableData = res.data;
        });
    },
    initChildData() {
      checkSearApi
        .postChild({
          kw: this.kw,
          store: this.currStore,
          pagenum: this.pagenumChild,
          pagesize: this.pagesizeChild,
        })
        .then((res) => {
          // console.log(res);
          this.pagetotalChild = parseInt(res.pagetotal);
          this.tableChildData = res.data;
        });
    },
    // 父子表联动，点击父表的行，子表显示当前申请单编号里面的具体数据
    handle(row, event, column) {
      this.kw = row["申请单编号"];
      this.initChildData();
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
    // 切换每页条数
    handleSizeChangeChild(val) {
      // console.log(`每页 ${val} 条`);
      this.pagesizeChild = val;
      this.initChildData();
    },
    // 切换分页
    handleCurrentChangeChild(val) {
      // console.log(`当前页: ${val}`);
      this.pagenumChild = val;
      this.initChildData();
    },
  },
  watch: {
    //库变化表格也相应更新当前库数据
    currStore() {
      this.initData();
      this.initChildData();
    },
  },
  created() {
    this.initData();
    this.initChildData();
  },
};
</script>

<style lang="scss" scoped>
.search-form {
  margin-bottom: 10px;
}
</style>