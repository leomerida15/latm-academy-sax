import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '@/views/Home.vue';
import Admin from '@/views/Admin.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
	{
		path: '/',
		name: 'Home',
		component: Home,
		children: [
			{
				path: '/auth/:type',
				name: 'Auth',
				component: Home,
			},
		],
	},
	{
		path: '/admin',
		name: 'Admin',
		meta: {
			Auth: true,
			rol: 'Admin',
		},
		redirect: '/admin/',
		component: Admin,
		children: [
			{
				path: '/admin/',
				name: 'adminBase',
				meta: {
					Auth: true,
					rol: 'Admin',
				},
				component: () => import('@/templates/admin-Acadmys.vue'),
			},
			{
				path: '/admin/academys',
				name: 'Admin-Academys',
				meta: {
					Auth: true,
					rol: 'Admin',
				},
				component: () => import('@/templates/admin-Acadmys.vue'),
			},
			{
				path: '/admin/delete',
				name: 'delete-Academy',
				meta: {
					Auth: true,
					rol: 'Admin',
				},
				component: () => import('@/templates/admin-Acadmys.vue'),
			},
			{
				path: '/admin/edit',
				name: 'edit-Academy',
				meta: {
					Auth: true,
					rol: 'Admin',
				},
				component: () => import('@/templates/admin-Acadmys.vue'),
			},
			{
				path: '/admin/create',
				name: 'create-Academy',
				meta: {
					Auth: true,
					rol: 'Admin',
				},
				component: () => import('@/templates/admin-Acadmys.vue'),
			},
		],
	},
	{
		path: '/about',
		name: 'About',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
	},
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
});

router.beforeEach((to, from, next) => {
	//
	//debugger
	if (to.matched.some((record) => record.meta.Auth)) {
		//debugger

		//
		if (localStorage.getItem('rol') && localStorage.getItem('token')) {
			if (to.matched.some((record) => record.meta.rol != localStorage.getItem('rol'))) {
				//debugger

				const name: any = localStorage.getItem('rol');
				next({ name });
			} else next();
		} else {
			localStorage.clear();
			next({ name: 'Home' });
		}
		//
	} else {
		//debugger

		//
		if (localStorage.getItem('token') && localStorage.getItem('rol')) {
			//debugger

			//
			const name: any = localStorage.getItem('rol');
			next({ name });
			//
		} else {
			//debugger

			next();
		}
	}
});

export default router;
