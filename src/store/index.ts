import Vue from 'vue';
import Vuex from 'vuex';
import { i18n } from '@/i18n';

// scripts
import Swal from 'sweetalert2';

// modules
import Academys from './models/Academeys';
import Institutes from './models/Institutes';
import Courses from './models/Courses';
// @ts-ignore
import countrys from 'country-region-data/data';
import { AxiosResponse } from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {},
	mutations: {},
	actions: {},
	modules: { Academys, Institutes, Courses },
});
