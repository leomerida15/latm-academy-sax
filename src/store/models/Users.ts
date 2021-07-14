import Vue from 'vue';
import { AxiosResponse } from 'axios';
import { Module } from 'vuex';

interface state {
	info: any[];
	courses: any[];
	lang: any;
	lists: any;
	N: number;
	item: any;
	Institutes: any[];
}

const courses: Module<state, any> = {
	namespaced: true,
	state: {
		info: [],
		courses: [],
		lang: localStorage.getItem('lang'),
		lists: {},
		N: 0,
		item: {},
		Institutes: [],
	},
	mutations: {
		define_courses: (state: any, resp: AxiosResponse) => (state.courses = resp.data.info),
		define_lists: (state: any, data: any) => (state.lists = data),
		edit_data: (state: any, data: any) => (state.data = data),
		define_item: (state: state, i: number) => (state.item = state.info[i]),
		define_Institutes: (state: state, data: any) => (state.Institutes = data),
	},
	actions: {
		async createUsers({ commit, state }, body: any) {
			try {
				const resp: AxiosResponse = await Vue.axios.post('/auth/registerGrup', body);
				return resp.data.info;
			} catch (err) {
				console.error(err);
				return false;
			}
		},
		async editCourse({ commit, state }, body: any) {
			try {
				const { _id } = body;
				await Vue.axios.patch('/admin/course/' + _id, body);
				return true;
			} catch (err) {
				console.error(err);
				return false;
			}
		},
		async getCourses({ commit }: any) {
			try {
				// define Token  in the headres
				const resp: AxiosResponse = await Vue.axios.get('/admin/course');

				commit('define_courses', resp);

				return true;
			} catch (err) {
				return false;
			}
		},
		async getLists({ commit }: any) {
			try {
				// define Token  in the headres
				const resp: AxiosResponse = await Vue.axios.get('/api/log/list');

				const { items }: any = resp.data.info;

				commit('define_lists', items);

				return true;
			} catch (err) {
				console.error(err);
				return false;
			}
		},
		async deleteCourse({ commit }, id: string) {
			try {
				// response
				await Vue.axios.delete('/admin/course/' + id);

				return true;
			} catch (err) {
				console.error(err);
				return false;
			}
		},
		async deleteDoc({ commit }, id: string) {
			try {
				const base: string = id.split('/')[1];
				// response
				await Vue.axios.delete('/api/log/file/' + base);

				return true;
			} catch (err) {
				console.error(err);
				return false;
			}
		},
		async selectInstitutes({ commit }) {
			try {
				// define Token  in the headres
				const resp: AxiosResponse = await Vue.axios.get('/admin/institute');

				const data: any[] = resp.data.info.map((a: any) => {
					const { _id } = a;
					const lang: any = localStorage.getItem('lang') && 'es';
					const e = a[lang];

					return { _id, ...e };
				});

				commit('define_Institutes', data);

				return true;
			} catch (err) {
				console.error(err);
				return false;
			}
		},
	},
};

export default courses;
