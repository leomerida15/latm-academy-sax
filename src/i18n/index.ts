import Vue from 'vue';
import VueI18n from 'vue-i18n';
Vue.use(VueI18n);

import es from './es.json';
import en from './en.json';

const messages = { es, en };

export const i18n = new VueI18n({
	locale: 'es',
	fallbackLocale: 'en',
	messages,
});
