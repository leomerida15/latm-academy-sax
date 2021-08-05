<template>
	<section class="admin-form">
		<create-forms />
	</section>
</template>

<script lang="ts">
	// modules
	import Vue from 'vue';
	// components
	import createForms from '../components/admin/courses/forms.vue';

	export default Vue.extend({
		name: 'admin-form',
		props: [],
		components: { createForms },
		mounted() {},
		data() {
			return {};
		},
		methods: {},
		computed: {},
	});
</script>

<style scoped lang="scss"></style>
