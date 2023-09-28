import { createApp } from 'vue'
import App from './App.vue'
import './styles/main.scss'
import router from './scripts/router'
import store from './scripts/store'
import Antd from "ant-design-vue"
import "ant-design-vue/dist/reset.css"
createApp(App).use(Antd).use(store).use(router).mount('#app').$nextTick(() => postMessage({ payload: 'removeLoading' }, '*') );

