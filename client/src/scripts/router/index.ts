import {createRouter, createWebHashHistory, RouteRecordRaw} from "vue-router";
import AuthView from '../../views/AuthView.vue'

const routes: Array<RouteRecordRaw> = [
	{
		path: "/",
		name: "home",
		// component: () => import(/* webpackChunkName: "about" */ "../views/MessageView.vue"),
		 component: AuthView,
	},
	{
		path: "/login",
		name: "login",
		// component: () => import(/* webpackChunkName: "about" */ "../views/MessageView.vue"),
		component: AuthView,
	},
	{
		path: "/registration",
		name: "registration",
		// component: () => import(/* webpackChunkName: "about" */ "../views/MessageView.vue"),
		component: AuthView,
	},
	{
		path: "/message",
		name: "message",


		component: () => import(/* webpackChunkName: "about" */ "../../views/MessageView.vue"),
	},
];

const router = createRouter({
	history: createWebHashHistory(),
	routes,
});

export default router;
