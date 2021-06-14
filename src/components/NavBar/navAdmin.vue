<template>
	<div class="center examplex">
		<vs-navbar :fixed="true" :textWhite="true" dark center-collapsed v-model="active">
			<template #left>
				<img src="/logo2.png" alt="" />
			</template>

			<template #right>
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
							<vs-button class="success-text" @click="exit" dark transparent>
								{{ $t('yes') }}
							</vs-button>
							<vs-button :active="true" @click="activeSalir = false" transparent>
								{{ $t('no') }}
							</vs-button>
						</div>
					</template>
				</vs-dialog>
			</template>
		</vs-navbar>
	</div>
</template>
<script lang="ts">
	// modules
	import Vue from 'vue';
	// componets
	import theme from '@/components/theme.vue';
	import login from '@/components/auth/login.vue';
	import register from '@/components/auth/register.vue';

	export default Vue.extend({
		name: 'nav-bar-admin',
		props: [],
		components: { theme, login, register },
		mounted() {
			console.log(this.$route);
		},
		data() {
			return {
				active: 'primary',
				color: 'dark',
				resal: true,
				password: '',
				remember: true,
				auth: '',
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
	.logo {
		width: 2.5rem;
		height: 2.5rem;
		border-radius: 50px;
	}
	.con-footer {
		display: flex;
		align-items: center;
		justify-content: flex-end;
	}
	.con-footer .vs-button {
		margin: 0px;
	}
	.con-footer .vs-button .vs-button__content {
		padding: 10px 30px;
	}
	.con-footer .vs-button ~ .vs-button {
		margin-left: 10px;
	}
	.not-margin {
		margin: 0px;
		font-weight: normal;
		padding: 10px;
		padding-bottom: 0px;
	}
	.con-content {
		width: 100%;
	}
	.con-content p {
		font-size: 0.8rem;
		padding: 0px 10px;
	}
	.con-content .vs-checkbox-label {
		font-size: 0.8rem;
	}
	.con-content .vs-input-parent {
		width: 100%;
	}
	.con-content .vs-input-content {
		margin: 10px 0px;
		width: calc(100%);
	}
	.con-content .vs-input-content .vs-input {
		width: 100%;
	}
	.footer-dialog {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		width: calc(100%);
	}
	.footer-dialog .new {
		margin: 0px;
		margin-top: 20px;
		padding: 0px;
		font-size: 0.7rem;
	}
	.footer-dialog .new a {
		color: rgba(var(--vs-primary), 1) !important;
		margin-left: 6px;
	}
	.footer-dialog .new a:hover {
		text-decoration: underline;
	}
	.footer-dialog .vs-button {
		margin: 0px;
	}
</style>
