<template>
	<div>
		<vs-dialog :prevent-close="true" :blur="true" v-model="remember">
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
