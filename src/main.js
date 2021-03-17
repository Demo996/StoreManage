import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

// 配置 混入
import '@/utils/mixin.js'
import '@/utils/filters.js'
// import '@/utils/bootstrap-table-export.min.js'
// import '@/utils/bootstrap-table.min.js'
// import '@/utils/tableExport.js'
// 模块 网站动画 animated
import animated from 'animate.css'
Vue.use(animated)
    // 模块 粒子特效
import VueParticles from 'vue-particles'
Vue.use(VueParticles)

import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.min.js'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')