<template>
	<div class="hidden">
		<vs-sidebar absolute reduce hover-expand background="dark" v-model="active" open>
			<template #logo textWhite>
				<!-- ...img logo -->
			</template>
			<br />

			<vs-sidebar-item id="home">
				<template #icon>
					<v-icon name="flag"></v-icon>
				</template>
				Home
			</vs-sidebar-item>
			<vs-sidebar-item id="market"> 
				<template #icon>
					<v-icon name="rocket"></v-icon>
				</template>
				Academys
			</vs-sidebar-item>

			<template #footer>
				<vs-row justify="space-between">
					<vs-avatar>
						<img src="https://vuesax.com/avatars/avatar-5.png" alt="" />
						<br />
					</vs-avatar>

					<vs-avatar badge-color="danger" badge-position="top-right">
						<v-icon name="bell"></v-icon>
						<template #badge>
							28
						</template>
					</vs-avatar>
				</vs-row>
			</template>
		</vs-sidebar>
	</div>
</template>
<script lang="ts">
	// modules
	import Vue from 'vue';
	import { Academy } from '../../../../academy/server/src/config/Intf';

	export default Vue.extend({
		name: 'side-bar-index',
		props: [],
		mounted() {},
		data() {
			return {
				active: 'home',
			};
		},
		methods: {},
		computed: {},
	});
</script>

<style scoped lang="scss">
	.side-bar-index {
	}
</style>
