<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
        <el-select v-model="currStore" placeholder="请选择仓库">
        <el-option
          v-for="item in storeArea"
          :key="item.id"
          :label="item.text"
          :value="item.title"
        >
        </el-option>
      </el-select>
    </div>
    <div class="text item">
      <el-table :data="tableData" border stripe :cell-style="addClass" style="width: 100%">
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
        <el-table-column label="库存量" prop="库存量"> </el-table-column>
        <!-- <el-table-column align="right">
          <template slot="header" slot-scope="scope">
            <el-input
              v-model="search"
              size="mini"
              placeholder="输入关键字搜索"
            />
          </template>
        </el-table-column> -->
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
</template>

<script>
import {inventApi} from '@/api'
export default {
  data() {
    return {
      tableData:[],      
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
      pagenum: 1,
      pagesize: 10,
      pagetotal: 100,
    };
  },
  methods: {
      addClass({row,column,rowIndex,columnIndex}){
          if(row["库存量"] < 3) {
              return 'background:rgb(209,73,78);color:#fff'
          } else {
              return 'background:rgb(230,180,80)'
          }
      },
      initData() {
          inventApi.alarmPost({
              store: this.currStore,
              pagenum: this.pagenum,
              pagesize: this.pagesize
          }).then(res=> {
            //   console.log(res.data);
              this.tableData = res.data
              this.pagetotal = res.pagetotal
          })
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
    }
  },
  watch:{
      currStore(){
          this.initData()
      }
  },
  created() {
      this.initData()
  },
};
</script>

<style lang="scss" scoped>
.box-card {
  width: 100%;
  .el-select{
      float: left;
  }

  .text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
  .el-pagination {
      margin-top: 20px;
      float: left;
  }
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
}
</style>