import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    component: () =>
        import('../views/admin/Index.vue'),
    children: [{
        // 首页
        path: '/first/welcome',
        alias: '/',
        component: () =>
            import('../views/admin/Welcome.vue'),
        meta: { name1: "后台首页", name2: "欢迎页" }
    },
    {
        path: '/first/history',
        component: () =>
            import('../views/admin/History.vue'),
        meta: { name1: "后台首页", name2: "访客记录" }
    },
    //入库管理
    {
        path: '/inner/purchase',
        component: () =>
            import('../views/inner/purchase/Purchase.vue'),
        meta: { name1: "入库管理", name2: "采购入库" }
    },
    {
        path: '/inner/check',
        component: () =>
            import('../views/inner/purchase/Checkin.vue'),
        meta: { name1: "入库管理", name2: "采购审核" }
    },
    {
        path: '/inner/purchaseReco',
        component: () =>
            import('../views/inner/purchase/Record.vue'),
        meta: { name1: "入库管理", name2: "购入记录" }
    },
    {
        path: '/inner/back',
        component: () =>
            import('../views/inner/purchase/Back.vue'),
        meta: { name1: "入库管理", name2: "采购退回" }
    },
    {
        path: '/inner/product',
        component: () =>
            import('../views/inner/product/Product.vue'),
        meta: { name1: "入库管理", name2: "生产入库" }
    },
    {
        path: '/inner/productReco',
        component: () =>
            import('../views/inner/product/Search.vue'),
        meta: { name1: "入库管理", name2: "生产记录" }
    },
    {
        path: '/inner/statistics',
        component: () =>
            import('../views/inner/Statistic.vue'),
        meta: { name1: "入库管理", name2: "入库统计" }
    },
    //出库管理
    {
        path: '/outer/receipt',
        component: () =>
            import('../views/outer/receipt/Receipt.vue'),
        meta: { name1: "出库管理", name2: "部门领用" }
    },
    {
        path: '/outer/receiptReco',
        component: () =>
            import('../views/outer/receipt/Record.vue'),
        meta: { name1: "出库管理", name2: "领用记录" }
    },
    {
        path: '/outer/nowUse',
        component: () =>
            import('../views/outer/receipt/Receipting.vue'),
        meta: { name1: "出库管理", name2: "正在领用" }
    },
    {
        path: '/outer/sales',
        component: () =>
            import('../views/outer/sales/Sales.vue'),
        meta: { name1: "出库管理", name2: "销售出库" }
    },
    {
        path: '/outer/salesReco',
        component: () =>
            import('../views/outer/sales/Record.vue'),
        meta: { name1: "出库管理", name2: "销售记录" }
    },
    {
        path: '/outer/statistics',
        component: () =>
            import('../views/outer/Statistic.vue'),
        meta: { name1: "出库管理", name2: "出库统计" }
    },
    //退还管理
    {
        path: '/return/normal',
        component: () =>
            import('../views/outer/return/Normal.vue'),
        meta: { name1: "退还管理", name2: "正常退还" }
    },
    {
        path: '/return/awful',
        component: () =>
            import('../views/outer/return/Awful.vue'),
        meta: { name1: "退还管理", name2: "损坏退还" }
    },
    {
        path: '/return/normalReco',
        component: () =>
            import('../views/outer/return/Record.normal.vue'),
        meta: { name1: "退还管理", name2: "正常退还记录" }
    },
    {
        path: '/return/awfulReco',
        component: () =>
            import('../views/outer/return/Record.awful.vue'),
        meta: { name1: "退还管理", name2: "损坏退还记录" }
    },
    //库存管理
    {
        path: '/invent/overview',
        component: () =>
            import('../views/invent/Overview.vue'),
        meta: { name1: "库存管理", name2: "库存概览" }
    },
    {
        path: '/invent/alarm',
        component: () =>
            import('../views/invent/Alarm.vue'),
        meta: { name1: "库存管理", name2: "库存报警" }
    },
    //编码管理
    {
        path: '/code/input',
        component: () =>
            import('../views/coding/Input.vue'),
        meta: { name1: "编码管理", name2: "编码导入" }
    },
    {
        path: '/code/edit',
        component: () =>
            import('../views/coding/Edit.vue'),
        meta: { name1: "编码管理", name2: "编码编辑" }
    },
    //用户管理
    {
        path: '/user/create',
        component: () =>
            import('../views/users/Create.vue'),
        meta: { name1: "用户管理", name2: "用户创建" }
    },
    {
        path: '/user/index',
        component: () =>
            import('../views/users/Index.vue'),
        meta: { name1: "用户管理", name2: "用户列表" }
    },
    //角色管理
    {
        path: '/roles/create',
        component: () =>
            import('../views/roles/Create.vue'),
        meta: { name1: "角色管理", name2: "角色创建" }
    },
    {
        path: '/roles/index',
        component: () =>
            import('../views/roles/Index.vue'),
        meta: { name1: "角色管理", name2: "角色列表" }
    },
    //权限管理
    {
        path: '/power/index',
        component: () =>
            import('../views/power/Index.vue'),
        meta: { name1: "权限管理", name2: "权限列表" }
    }
    ]
}, {
    // 登录
    path: '/login',
    component: () =>
        import('../views/admin/Load.vue'),
    meta: { name1: "用户管理", name2: "用户登陆" }
},
{
    //非法地址跳转404
    path: '/404',
    component: () =>
        import('../views/404.vue')
},
{ path: '*', redirect: '/404' }
]
const router = new VueRouter({
    mode: 'history',
    routes
})
// 全局前置守卫
// 在Router实例上进行守卫
router.beforeEach((to, from, next) => {
    if (
        to.path == '/login' || to.path == '/404'
    ) {
        next()
    } else {
        let token = localStorage.getItem('token')
        if (!token) return next({ path: '/login' })
        next()
    }
})

export default router