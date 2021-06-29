import Vue from 'vue';
import { AxiosResponse } from 'axios';
import { Module } from 'vuex';

interface state {
	info: any[];
	lang: any;
	N: number;
	video: any;
}

const academys: Module<state, any> = {
	namespaced: true,
	state: {
		info: [],
		lang: 'es',
		N: 0,
		video: {},
	},
	mutations: {
		define_Academys: (state: any, resp: AxiosResponse) => (state.info = resp.data.info),
		edit_data: (state: any, data: any) => (state.data = data),
		define_video: (state: state, video: any) => (state.video = video),
		define_Academy: (state: state, id: string) => (state.info = state.info.filter((item: any) => item._id != id)),
	},
	actions: {
		async createAcademy({ commit, state }, body: any) {
			try {
				await Vue.axios.post('/admin/academy', body);
				const data = Vue.axios.defaults.headers;

				return true;
			} catch (err) {
				const data = Vue.axios.defaults.headers;

				console.error(err);
				return false;
			}
		},
		async editAcademy({ commit, state }, body: any) {
			try {
				const { _id } = body;
				await Vue.axios.patch('/admin/academy/' + _id, body);
				return true;
			} catch (err) {
				console.error(err);
				return false;
			}
		},
		async getAcademys({ commit }: any) {
			try {
				// define Token  in the headres
				const resp: AxiosResponse = await Vue.axios.get('/admin/academy');

				commit('define_Academys', resp);

				return true;
			} catch (err) {
				console.error(err);
				return false;
			}
		},
		async deleteAcademy({ commit }, id: string) {
			try {
				// response
				const resp: AxiosResponse = await Vue.axios.delete('/admin/academy/' + id);
				// commit
				commit('define_Academy', id);

				return true;
			} catch (err) {
				console.error(err);
				return false;
			}
		},
	},
};

export default academys;
