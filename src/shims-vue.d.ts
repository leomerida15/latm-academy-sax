declare module '*.vue' {
	import Vue from 'vue';
	export default Vue;
}

// json-module.d.ts
declare module '*.json' {
	const data: any;
	export default data;
}
