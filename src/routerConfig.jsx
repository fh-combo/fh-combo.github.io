// 首页
import Home from '@pages/home'
// 关于我
import About from '@pages/about'
// 联系方式
import Contact from '@pages/contact'
// 博文
import Article from '@pages/article'

let routes = [
  {text: '首页',path: '/',component: Home,exact: true},
  {text: '关于我',path: '/about',component: About},
  {text: '联系方式',path: '/contact',component: Contact},
  {text: '博文',path: '/article',component: Article}
]

export default routes
