<template>
  <div class="list">
    <!-- 卡片组件 -->
    <el-card class="box-card">
      <!-- 标题 -->
      <div slot="header" class="clearfix header">
        <span>角色列表</span>
        <el-button type="primary" round @click="jump('/roles/create')"
          >创建</el-button
        >
      </div>

      <!-- 表格 -->
      <el-table
        v-loading="loading"
        :data="tableData"
        stripe
        row-key="cat_id"
        style="width: 100%"
      >
        <el-table-column prop="role_id" label="编号" width="50" align="center">
        </el-table-column>

        <el-table-column
          prop="role_name"
          label="角色名称"
          width="160"
          align="center"
        >
        </el-table-column>

        <el-table-column prop="role_desc" label="角色描述" width="180">
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="item">
            <el-button type="primary" @click="handleAssign(item.row)" circle
              >分配权限</el-button
            >
            <el-button
              type="primary"
              @click="edit(item.row)"
              icon="el-icon-edit"
              circle
            ></el-button>
            <el-button
              type="danger"
              @click="del(item.row)"
              icon="el-icon-delete"
              circle
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- /表格 -->
    </el-card>
    <!-- /卡片组件 -->

    <!-- 编辑弹框 -->
    <el-dialog title="编辑角色权限" :visible.sync="dialogFormVisible">
      <el-tree
        :data="treeData"
        v-loading="treeLoading"
        show-checkbox
        ref="tree"
        node-key="auth_id"
        :default-expanded-keys="defaultAuthIds"
        :default-checked-keys="defaultAuthIds"
        :props="defaultProps"
      >
      </el-tree>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAuths">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-input v-model="editRow.roleName"></el-input>
      <el-input v-model="editRow.roleDesc"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sureEdit(editRow)">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
// 导入接口
import rolesApi from "@/api/roles/roles";

// 导出组件数据
export default {
  created() {
    this.initData();
  },
  methods: {
    // 编辑
    handleAssign(row) {
      // save role_id
      this.formEditData.role_name = row.role_name;

      // loading
      this.treeLoading = true;

      // 异步请求获取有权限
      rolesApi.getPower().then((res) => {
        // set loading
        this.treeLoading = false;
        // set data
        this.treeData = res;

        // 默认选中已有权限
        let tmp = row.roles_auth ? row.roles_auth_son.split(",") : [];
        this.defaultAuthIds = tmp;
      });

      // 显示弹框
      this.dialogFormVisible = true;
    },
    // 改变状态
    handleAuths() {
      let tmpIds = [];
      let tmpIdsSon = [];
      if (this.$refs.tree.getCheckedNodes()) {
        this.$refs.tree.getCheckedNodes().forEach((firstItem) => {
          // console.log(firstItem)
          if (firstItem.auth_id) tmpIds.push(firstItem.auth_id);
          if (firstItem.auth_id && firstItem.auth_pid != 0)
            tmpIdsSon.push(firstItem.auth_id);

          if (firstItem.children) {
            firstItem.children.forEach((twoItem) => {
              if (twoItem.auth_id) tmpIds.push(twoItem.auth_id);
              if (twoItem.auth_id && twoItem.auth_pid != 0)
                tmpIdsSon.push(twoItem.auth_id);
            });
          }
        });
      }

      // set loading
      this.treeLoading = false;
      // set ajax
      let auth_ids = [...new Set(tmpIds)].join(",");
      let auth_ids_son = [...new Set(tmpIdsSon)].join(",");
      // console.log(this.formEditData.role_name);
      rolesApi
        .assign({
          role_name: this.formEditData.role_name,
          auth_ids,
          auth_ids_son,
        })
        .then((res) => {
          // loading
          this.loading = false;
          if (res.status == 200) {
            this.$message.success("操作成功");
            this.initData();
            this.dialogFormVisible = false;
          } else {
            this.$message.error(res.msg);
          }
        });
    },
    edit(row) {
      this.dialogVisible = true;
      this.editRow = {
        roleId: row.role_id,
        roleName: row.role_name,
        roleDesc: row.role_desc,
      };
    },
    sureEdit(edit) {
      rolesApi
        .edit({
          edit,
        })
        .then((res) => {
          {
              console.log(res);
            if (res.status == 200) {
              this.$message.success(res.msg);
              this.initData();
              this.dialogVisible = false;
            } else {
                this.$message.error(res.msg);
              this.dialogVisible = false;
            }
          }
        });
    },
    del(row) {
        this.$confirm('此操作将删除此角色以及对应的用户, 请确定是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
        }).then(() => {
            rolesApi.delRole(row)
            .then(res => {
                if (res.status == 200)
                {
                    this.initData()
                    this.$message.success('删除成功!');
                } else {
                    this.$message.error(res.msg);
                }
            })
        }).catch(() => {
            this.$message.info('已取消删除!');
        });
    },
    // 初始化数据
    initData() {
      //   loading
      this.loading = true;
      //   data
      rolesApi.showRole().then((res) => {
        // loading
        this.loading = false;
        // data
        this.tableData = res;
      });
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
  },
  data() {
    return {
      // 默认角色权限选中
      defaultAuthIds: [],
      // 编辑
      formLabelWidth: "120px",
      dialogVisible: false,
      dialogFormVisible: false,
      formEditData: {
        role_name: "",
      },
      // 默认数据
      loading: false,
      tableData: [],
      // 权限树数据
      treeLoading: false,
      treeData: [],
      // 权限树数据字段声明
      defaultProps: {
        children: "children",
        label: "auth_name",
      },
      editRow: [],
    };
  },
};
</script>
<style lang="scss" scoped>
.list {
  // 卡片组件
  .el-card {
    // 头部
    .header .el-button {
      float: right;
      margin-top: -10px;
    }

    // 筛选
    .filter {
      margin-bottom: 20px;
      overflow: hidden;

      // 搜索框
      .el-input {
        width: 300px;
        float: left;
      }

      // 日期
      .el-date-editor {
        float: right;
      }
    }
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
}
</style>