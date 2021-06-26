<template>
	<div class="hidden">
		<vs-sidebar absolute reduce hover-expand background="dark" v-model="active" open>
			<template #logo textWhite>
				<!-- ...img logo -->
			</template>
			<br />

			<vs-sidebar-item to="/front/courses" id="Courses">
				<template #icon>
					<v-icon name="book"></v-icon>
				</template>
				Courses
			</vs-sidebar-item>

			<template #footer>
				<vs-row justify="space-between">
					<vs-button :to="'/auth/login'" transparent :textWhite="false" @click="activeSalir = true">
						{{ $t('exit.btn') }}
					</vs-button>
					<vs-dialog :blur="true" width="550px" not-center v-model="activeSalir">
						<template #header>
							<h2 class="s-center not-margin primary-text">
								{{ $t('exit.title') }}
								<b>?</b>
							</h2>
						</template>

						<template #footer>
							<div class="con-footer">
								<vs-button class="success-text" @click="exit" transparent>
									{{ $t('yes') }}
								</vs-button>
								<vs-button :active="true" @click="activeSalir = false" transparent>
									{{ $t('no') }}
								</vs-button>
							</div>
						</template>
					</vs-dialog>
				</vs-row>
			</template>
		</vs-sidebar>
	</div>
</template>
<script lang="ts">
	// modules
	import Vue from 'vue';

	export default Vue.extend({
		name: 'side-bar-index',
		props: [],
		mounted() {},
		data() {
			return {
				active: 'Courses',
				activeSalir: false,
			};
		},
		methods: {
			exit() {
				localStorage.clear();
				this.activeSalir = false;
				this.$router.push({ name: 'Home' });
			},
		},
		computed: {},
	});
</script>

<style scoped lang="scss">
	.vs-dialog {
		background-color: var(--contras);
	}
</style>
