<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <export-excel
        style="float: right"
        @getResult="getMyExcelData"
      ></export-excel>
      <el-dialog
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose"
      >
        <span>
          <el-row>
            <el-col :span="24"
              >编码：<el-input
                readonly
                v-model="currData['编码']"
                clearable
              ></el-input>
              <div class="grid-content bg-purple-dark"></div
            ></el-col>
          </el-row>
          <el-row>
            <el-col :span="12"
              >类型：<el-input v-model="currData['类型']"></el-input>
              <div class="grid-content bg-purple"></div
            ></el-col>
            <el-col :span="12"
              >规格型号：<el-input v-model="currData['规格型号']"></el-input>
              <div class="grid-content bg-purple"></div
            ></el-col>
          </el-row>
          <el-row>
            <el-col :span="12"
              >名称：<el-input v-model="currData['名称']"></el-input>
              <div class="grid-content bg-purple-light"></div
            ></el-col>
            <el-col :span="12"
              >颜色形状：<el-input v-model="currData['颜色形状']"></el-input>
              <div class="grid-content bg-purple-light"></div
            ></el-col>
          </el-row>
        </span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="editFn">保 存</el-button>
        </span>
      </el-dialog>
    </div>
    <div class="text item">
      <el-table
        id="mytable"
        :data="tableData"
        border
        stripe
        style="width: 100%"
      >
        <el-table-column
          label="序号"
          type="index"
          show-overflow-tooltip
          width="50"
        >
        </el-table-column>
        <el-table-column label="类型" prop="类型"> </el-table-column>
        <el-table-column label="名称" prop="名称"> </el-table-column>
        <el-table-column label="规格型号" prop="规格型号"> </el-table-column>
        <el-table-column label="颜色形状" prop="颜色形状"> </el-table-column>
        <el-table-column label="编码" prop="编码"> </el-table-column>
        <el-table-column label="操作" prop="操作">
          <template scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              @click="editCode(scope.row)"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              @click="deleteFn(scope.row['编码'])"
            ></el-button>
          </template>
        </el-table-column>
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
import exportExcel from "@/components/Export_excel";
import { codingApi } from "@/api";
export default {
  components: { exportExcel },
  data() {
    return {
      dialogVisible: false,
      currData: "",
      tableData: [],
      pagenum: 1,
      pagesize: 10,
      pagetotal: 100,
    };
  },
  methods: {
    getMyExcelData(obj) {
      return obj;
    },
    initData() {
      codingApi
        .getPost({
          pagenum: this.pagenum,
          pagesize: this.pagesize,
        })
        .then((res) => {
          if (res.meta.state == 200) {
            this.tableData = res.data;
            this.pagetotal = res.pagetotal;
          } else {
            this.$message.error(res.meta.msg);
          }
        });
    },
    editCode(row) {
      this.currData = row;
      this.dialogVisible = true;
    },
    editFn() {
      this.dialogVisible = false;
      codingApi.editData(this.currData).then((res) => {
        if (res.meta.state == 200) {
          this.$message.success("提交成功");
        } else {
          this.$message.error(res.meta.msg);
        }
      });
    },
    deleteFn(code) {
      this.$confirm("此操作将永久此编码, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          codingApi
            .deleteData({
              code: code,
            })
            .then((res) => {
              if (res.meta.state == 200) {
                this.initData();
                this.$message.success("删除成功");
              } else {
                this.$message.error(res.meta.msg);
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
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
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
  },
  watch: {
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
.box-card {
  width: 100%;
  .el-select {
    float: left;
  }

  .el-dialog {
    .el-row {
      margin-top: 20px;
      .el-input {
        width: 73%;
      }
    }
  }

  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }
}
</style>