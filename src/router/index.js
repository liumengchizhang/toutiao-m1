import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const routes = [
  {
    path: '/',
    redirect: '/home',
    component: () => import('@/views/lauout'),
    children: [
      {
        path: '/home',
        name: 'shouye',
        component: () => import('@/views/shouye')
      },
      {
        path: '/wenda',
        name: 'wenda',
        component: () => import('@/views/wenda')
      },
      {
        path: '/video',
        name: 'video',
        component: () => import('@/views/video')
      },
      { path: '/my', name: 'my', component: () => import('@/views/my') }
    ]
  },
  // 登陆界面的路由
  { path: '/login', name: 'Login', component: () => import('@/views/login') },

  // 搜索历史界面
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/search')
  },
  // 获取文章详情页
  {
    path: '/article/:articleId',
    name: 'article',
    component: () => import('@/views/article'),
    props: true
  },
  // 获取个人资料页面
  {
    path: '/personalCenter',
    name: 'personalCenter',
    component: () => import('@/views/personalCenter')
  }
]

const router = new VueRouter({
  routes
})

export default router
