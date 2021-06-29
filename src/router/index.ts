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
				path: '/front/auth/:type',
				name: 'Auth',
				component: Home,
			},
		],
	},
	{
		path: '/front/admin',
		name: 'Admin',
		meta: {
			Auth: true,
			rol: 'Admin',
		},
		redirect: '/',
		component: Admin,
		children: [
			{
				path: '/front/',
				name: 'Admin',
				meta: {
					Auth: true,
					rol: 'Admin',
				},
				component: () => import('@/templates/admin-Courses.vue'),
			},

			{
				path: '/front/courses',
				name: 'Admin-Courses',
				meta: {
					Auth: true,
					rol: 'Admin',
				},
				component: () => import('@/templates/admin-Courses.vue'),
			},
			{
				path: '/front/courses/delete',
				name: 'delete-Course',
				meta: {
					Auth: true,
					rol: 'Admin',
				},
				component: () => import('@/templates/admin-Courses.vue'),
			},
			{
				path: '/front/courses/edit',
				name: 'edit-Course',
				meta: {
					Auth: true,
					rol: 'Admin',
				},
				component: () => import('@/templates/admin-Courses.vue'),
			},
			{
				path: '/front/courses/create',
				name: 'create-Course',
				meta: {
					Auth: true,
					rol: 'Admin',
				},
				component: () => import('@/templates/admin-Courses.vue'),
			},
			{
				path: '/front/courses/recourses',
				name: 'recourses-Course',
				meta: {
					Auth: true,
					rol: 'Admin',
				},
				component: () => import('@/templates/admin-Courses.vue'),
			},
			{
				path: '/front/courses/playlistid',
				name: 'playlistid-Course',
				meta: {
					Auth: true,
					rol: 'Admin',
				},
				component: () => import('@/templates/admin-playlistid.vue'),
			},
			{
				path: '/front/courses/playlistid/image',
				name: 'image-playlistid-Course',
				meta: {
					Auth: true,
					rol: 'Admin',
				},
				component: () => import('@/templates/admin-playlistid.vue'),
			},
			{
				path: '/front/users',
				name: 'admin-users',
				meta: {
					Auth: true,
					rol: 'Admin',
				},
				component: () => import('@/templates/admin-Users.vue'),
			},
		],
	},
	{
		path: '/front/about',
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
