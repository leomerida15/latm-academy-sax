import Vue from 'vue';
import { AxiosResponse } from 'axios';
import { Module } from 'vuex';

interface state {
	info: any[];
	lang: any;
	N: number;
	item: any;
}

const courses: Module<state, any> = {
	namespaced: true,
	state: {
		info: [],
		lang: localStorage.getItem('lang'),
		N: 0,
		item: {},
	},
	mutations: {
		define_info: (state: any, resp: AxiosResponse) => (state.info = resp.data.info),
		edit_data: (state: any, data: any) => (state.data = data),
		define_item: (state: state, i: number) => (state.item = state.info[i]),
		define_Academy: (state: state, id: string) => (state.info = state.info.filter((item: any) => item._id != id)),
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
		async ediInstitute({ commit, state }, body: any) {
			try {
				const { _id } = body;
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
	},
};

export default courses;
