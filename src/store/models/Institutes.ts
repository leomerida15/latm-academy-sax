import Vue from 'vue';
import { AxiosResponse } from 'axios';
import { Module } from 'vuex';
import * as intf from '@/config/intf';

interface state {
	info: any[];
	lang: any;
	N: number;
	item: any;
	Academys: intf.AcSelect[];
}

const courses: Module<state, any> = {
	namespaced: true,
	state: {
		info: [],
		lang: localStorage.getItem('lang'),
		N: 0,
		item: {},
		Academys: [],
	},
	mutations: {
		define_info: (state: any, resp: AxiosResponse) => (state.info = resp.data.info),
		edit_data: (state: any, data: any) => (state.data = data),
		define_item: (state: state, i: number) => (state.item = state.info[i]),
		define_Academys: (state: state, data: intf.AcSelect[]) => (state.Academys = data),
	},
	actions: {
		async createInstitute({ commit, state }, body: any) {
			try {
				await Vue.axios.post('/admin/institute', body);
				return true;
			} catch (err) {
				console.error(err);
				return false;
			}
		},
		async editInstitute({ commit, state }, body: any) {
			try {
				const { _id } = body;
				debugger;
				await Vue.axios.patch('/admin/institute/' + _id, body);
				return true;
			} catch (err) {
				console.error(err);
				return false;
			}
		},
		async getInstitutes({ commit }: any) {
			try {
				// define Token  in the headres
				const resp: AxiosResponse = await Vue.axios.get('/admin/institute');

				commit('define_info', resp);

				return true;
			} catch (err) {
				console.error(err);
				return false;
			}
		},
		async deleteInstitute({ commit }, id: string) {
			try {
				// response
				const resp: AxiosResponse = await Vue.axios.delete('/admin/institute/' + id);
				// commit
				commit('define_institute', id);

				return true;
			} catch (err) {
				console.error(err);
				return false;
			}
		},
		async selectAcademys({ commit }) {
			try {
				// define Token  in the headres
				const resp: AxiosResponse = await Vue.axios.get('/admin/academy');

				const data: intf.AcSelect[] = resp.data.info.map((a: any) => {
					const { _id } = a;
					const lang: any = localStorage.getItem('lang') && 'es';
					const e = a[lang];

					return { _id, ...e };
				});

				commit('define_Academys', data);

				return true;
			} catch (err) {
				console.error(err);
				return false;
			}
		},
	},
};

export default courses;
