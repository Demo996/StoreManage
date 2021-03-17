<template>
  <div class="auth">
    <button @click="changePower">分配权限</button>
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
  </div>
</template>

<script>
export default {
  methods: {
    changePower() {
      this.defaultAuthIds = [
        "27",
        "9",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
      ];
    },
  },
  data() {
    return {
      // 默认角色权限选中
      defaultAuthIds: [],
      // 编辑
      formLabelWidth: "120px",
      dialogFormVisible: false,
      formEditData: {
        role_id: 0,
      },
      // 默认数据
      loading: false,
      tableData: [],
      // 权限树数据
      treeLoading: false,
      // 权限树数据字段声明
      defaultProps: {
        children: "children",
        label: "auth_name",
      },
      treeData: [
        {
          auth_id: "1",
          auth_name: "后台首页",
          auth_pid: "0",
          url: "",
          children: [
            {
              auth_id: "27",
              auth_name: "欢迎页",
              auth_pid: "1",
              url: "/welcome",
            },
            {
              auth_id: "9",
              auth_name: "访客记录",
              auth_pid: "1",
              url: "/history",
            },
          ],
        },
        {
          auth_id: "2",
          auth_name: "商品分类",
          auth_pid: "0",
          url: "",
          children: [
            {
              auth_id: "10",
              auth_name: "分类列表",
              auth_pid: "2",
              url: "/goods/cate",
            },
            {
              auth_id: "11",
              auth_name: "分类创建",
              auth_pid: "2",
              url: "/goods/cate/create",
            },
          ],
        },
        {
          auth_id: "3",
          auth_name: "商品属性",
          auth_pid: "0",
          url: "",
          children: [
            {
              auth_id: "12",
              auth_name: "商品类型",
              auth_pid: "3",
              url: "/goods/type",
            },
            {
              auth_id: "13",
              auth_name: "类型创建",
              auth_pid: "3",
              url: "/goods/type/create",
            },
            {
              auth_id: "14",
              auth_name: "商品属性",
              auth_pid: "3",
              url: "/goods/attr",
            },
            {
              auth_id: "15",
              auth_name: "属性创建",
              auth_pid: "3",
              url: "/goods/attr/create",
            },
          ],
        },
        {
          auth_id: "4",
          auth_name: "商品管理",
          auth_pid: "0",
          url: "",
          children: [
            {
              auth_id: "16",
              auth_name: "商品列表",
              auth_pid: "4",
              url: "/goods",
            },
            {
              auth_id: "17",
              auth_name: "商品创建",
              auth_pid: "4",
              url: "/goods/create",
            },
            {
              auth_id: "18",
              auth_name: "商品回收站",
              auth_pid: "4",
              url: "/goods/recycle",
            },
          ],
        },
        {
          auth_id: "5",
          auth_name: "订单管理",
          auth_pid: "0",
          url: "",
          children: [
            {
              auth_id: "19",
              auth_name: "订单管理",
              auth_pid: "5",
              url: "/orders",
            },
            {
              auth_id: "20",
              auth_name: "订单回收站",
              auth_pid: "5",
              url: "/orders/recycle",
            },
            {
              auth_id: "21",
              auth_name: "订单统计",
              auth_pid: "5",
              url: "/orders/total",
            },
          ],
        },
        {
          auth_id: "6",
          auth_name: "用户管理",
          auth_pid: "0",
          url: "",
          children: [
            {
              auth_id: "22",
              auth_name: "用户列表",
              auth_pid: "6",
              url: "/users",
            },
            {
              auth_id: "23",
              auth_name: "用户创建",
              auth_pid: "6",
              url: "/users/create",
            },
          ],
        },
        {
          auth_id: "7",
          auth_name: "角色管理",
          auth_pid: "0",
          url: "",
          children: [
            {
              auth_id: "24",
              auth_name: "角色列表",
              auth_pid: "7",
              url: "/roles",
            },
            {
              auth_id: "25",
              auth_name: "角色创建",
              auth_pid: "7",
              url: "/roles/create",
            },
          ],
        },
        {
          auth_id: "8",
          auth_name: "权限管理",
          auth_pid: "0",
          url: "",
          children: [
            {
              auth_id: "26",
              auth_name: "权限列表",
              auth_pid: "8",
              url: "/auths",
            },
          ],
        },
      ]
    };
  },
};
</script>

<style scoped>
ul,
li {
  list-style: none;
  margin: 0;
  padding: 0;
}

.auth {
  width: 100%;
  height: 100%;
  /* display: flex;
    justify-content: center;
    align-items: center; */
  /* background-color: aqua; */
}
</style>