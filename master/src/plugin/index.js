// 按需全局引入 vant组件
import Vue from 'vue'
import {List, Cell, Swipe, Overlay, SwipeItem, Lazyload, Skeleton, Image as VanImage, Loading, Icon, Dialog, CellGroup, Field, Popup, Button, Tabbar, TabbarItem, Search, Tab, Tabs, Empty, PullRefresh} from 'vant'
import 'vant/lib/index.css'

Vue.use(Cell).use(CellGroup)
Vue.use(Field)
Vue.use(List)
Vue.use(Swipe)
Vue.use(Overlay)
Vue.use(SwipeItem)
Vue.use(Skeleton)
Vue.use(Lazyload)
Vue.use(VanImage)
Vue.use(Loading)
Vue.use(Icon)
Vue.use(Dialog)
Vue.use(Popup)
Vue.use(Button)
Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(Search)
Vue.use(Tab).use(Tabs)
Vue.use(Empty)
Vue.use(PullRefresh)
