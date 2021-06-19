<template>
	<div class="center examplex">
		<vs-navbar :fixed="true" :textWhite="true" dark center-collapsed v-model="active">
			<template #left>
				<img src="/logo2.png" alt="" />
			</template>
			<vs-navbar-group>
				Docs
				<template #items>
					<vs-navbar-item :active="active == 'guide'" id="guide">
						Guide
					</vs-navbar-item>
					<vs-navbar-item :active="active == 'docs'" id="docs">
						Documents
					</vs-navbar-item>
					<vs-navbar-item :active="active == 'components'" id="components">
						Components
					</vs-navbar-item>
				</template>
			</vs-navbar-group>

			<vs-navbar-group>
				Ecosystem

				<template #items>
					<h5 class="title">
						Social
					</h5>

					<vs-navbar-item :active="active == 'Github'" id="Github">
						Github
					</vs-navbar-item>
					<vs-navbar-item :active="active == 'Discord'" id="Discord">
						Discord
					</vs-navbar-item>
					<vs-navbar-item :active="active == 'Twitter'" id="Twitter">
						Twitter
					</vs-navbar-item>
					<vs-navbar-item :active="active == 'Medium'" id="Medium">
						Medium
					</vs-navbar-item>
				</template>
			</vs-navbar-group>

			<vs-navbar-item :active="active == 'License'" id="License">
				{{ auth_register }}
			</vs-navbar-item>

			<template #right>
				<vs-button :to="'/front/auth/login'" border :textWhite="false" :active="resal" @click="OpenLogin" flat>
					{{ $t('login.login') }}
				</vs-button>
				<vs-button :to="'/front/auth/register'" border :active="!resal" @click="RegisterLogin">
					{{ $t('sign_up.title') }}
				</vs-button>
			</template>
		</vs-navbar>

		<login :active="this.$route.params.type === 'login'" />
		<register :active="this.$route.params.type === 'register'" />
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
		name: 'nav-bar-index',
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
			};
		},
		methods: {},
		computed: {},
	});
</script>

<style scoped lang="scss">
	.logo {
		width: 2.5rem;
		height: 2.5rem;
		border-radius: 50px;
	}
</style>
