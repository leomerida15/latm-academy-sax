<template>
	<div>
		<vs-dialog :prevent-close="true" :blur="true" dark v-model="remember">
			<template #header>
				<h1 class="primary-text not-margin">
					{{ $t('login.success') }}
					<b class="">!</b>
				</h1>
			</template>

			<login />

			<template #footer>
				<div class="footer-dialog">
					<vs-button block>
						{{ $t('login.login') }}
					</vs-button>

					<div class="new">
						{{ $t('login.not_account') }}
						<a href="#">{{ $t('login.sign_up') }}</a>
					</div>
				</div>
			</template>
		</vs-dialog>
	</div>
</template>

<script lang="ts">
	// moduls
	import Vue from 'vue';
	// componenrs
	import login from '@/components/auth/login.vue';

	export default Vue.extend({
		name: 'auth-login',
		props: { active: { type: String } },
		components: { login },
		mounted() {},
		data() {
			return {
				email: '',
				password: '',
				remember: false,
			};
		},
		methods: {},
		computed: {},
	});
</script>

<style lang="scss">
	.vs-dialog {
		background-color: #121212;
	}

	.not-margin {
		margin: 0px;
		font-weight: normal;
		padding: 10px;
	}
	.con-form {
		width: 100%;
	}
	.con-form .flex {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.con-form .flex a {
		font-size: 0.8rem;
		opacity: 0.7;
	}
	.con-form .flex a:hover {
		opacity: 1;
	}
	.con-form .vs-checkbox-label {
		font-size: 0.8rem;
	}
	.con-form .vs-input-content {
		margin: 10px 0px;
		width: calc(100%);
	}
	.con-form .vs-input-content .vs-input {
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
		color: rgba(var(--vs-success), 1);
		margin-left: 6px;
	}
	.footer-dialog .new a:hover {
		text-decoration: underline;
	}
	.footer-dialog .vs-button {
		margin: 0px;
	}
</style>
