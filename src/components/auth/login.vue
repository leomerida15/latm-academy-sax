<template>
	<vs-dialog :loading="loading" @close="back" :prevent-close="true" :blur="true" dark v-model="active">
		<template #header>
			<h1 class="primary-text not-margin">
				{{ $t('login.success') }}
				<b class="">!</b>
			</h1>
		</template>

		<template>
			<div class="center">
				<vs-alert success :progress="progress" v-model="TimeAlertSuccess">
					<template #title>
						{{ $t('login.success') }}
					</template>
				</vs-alert>

				<vs-alert danger :progress="progress" v-model="TimeAlertDanger">
					<template #title>
						{{ $t('login.wrong.title') }}
					</template>
				</vs-alert>
				<br />
			</div>
		</template>

		<div class="con-form">
			<vs-input success type="email" v-model="body.email" :placeholder="$t('sign_up.email.label')">
				<template #icon #message-success>
					<v-icon name="rocket"></v-icon>
				</template>

				<template v-if="valid.email.alert" #message-danger>
					{{ $t(valid.email.msg) }}
				</template>
			</vs-input>

			<vs-input success type="password" v-model="body.password" :placeholder="$t('login.password')">
				<template #icon #message-success>
					<v-icon name="lock"></v-icon>
				</template>

				<template v-if="valid.password.alert" #message-danger>
					{{ $t(valid.password.msg) }}
				</template>
			</vs-input>

			<div class="flex ed-container">
				<div class="s-100 s-right">
					<a href="#" class="success-text">{{ $t('login.forgot_password') }}</a>
				</div>
			</div>
		</div>
		<template #footer>
			<div class="footer-dialog">
				<vs-button @click="login" block>
					{{ $t('login.login') }}
				</vs-button>

				<br />
				<vs-button block color="#4285F4">
					Google
					<template #animate>
						<i class="bx bx-user"></i>
						{{ $t('login.login') }}
					</template>
				</vs-button>

				<div class="new">
					{{ $t('login.not_account') }}
					<router-link :to="'/front/auth/register'">{{ $t('login.sign_up') }}</router-link>
				</div>
			</div>
		</template>
	</vs-dialog>
</template>

<script lang="ts">
	// moduls
	import Vue from 'vue';
	import { AxiosResponse } from 'axios';

	export default Vue.extend({
		name: 'auth-login',
		props: ['active'],
		mounted() {},
		data() {
			return {
				TimeAlertSuccess: false,
				TimeAlertDanger: false,
				time: 4000,
				progress: 0,
				body: { email: '', password: '' },
				valid: {
					email: { alert: false, msg: '' },
					password: { alert: false, msg: '' },
				},
				loading: false,
			};
		},
		methods: {
			Alert(type: boolean) {
				const rol: any = localStorage.getItem('rol');
				if (type) {
					this.TimeAlertSuccess = true;

					const interval = setInterval(() => {
						this.progress++;
					}, this.time / 100);

					setTimeout(() => {
						this.TimeAlertSuccess = false;
						clearInterval(interval);
						this.progress = 0;
						this.$router.push({ name: rol });
					}, this.time);
				} else {
					this.TimeAlertDanger = true;

					const interval = setInterval(() => {
						this.progress++;
					}, this.time / 100);

					setTimeout(() => {
						this.TimeAlertDanger = false;
						clearInterval(interval);
						this.progress = 0;
					}, this.time);
				}
			},
			back() {
				this.$router.push({ name: 'Home' });
			},
			async login() {
				try {
					let valid: number = 0;
					const { email, password } = this.body;

					if (!email || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
						this.valid.email.alert = true;
						this.valid.email.msg = 'sign_up.email.invalid.pattern';
						valid++;
					} else if (!email) {
						this.valid.email.alert = true;
						this.valid.email.msg = 'sign_up.email.invalid.required';
						valid++;
					}

					if (password.length < 1 && this.getProgress < 80) {
						this.valid.password.alert = true;
						this.valid.password.msg = 'sign_up.password.invalid.required';
						valid++;
					}

					if (valid > 0) throw 'no cumple con los criteriosde login';
					this.loading = true;
					const resp: AxiosResponse = await Vue.axios.post('/auth/login', this.body);

					localStorage.setItem('token', resp.data.info.token);
					localStorage.setItem('rol', resp.data.info.rol);

					this.Alert(true);
				} catch (err) {
					this.Alert(false);
					console.clear();
					console.error(err);
				}
				this.loading = false;
			},
		},
		computed: {
			getProgress() {
				let progress = 0;

				// at least one number

				if (/\d/.test(this.body.password)) {
					progress += 20;
				}

				// at least one capital letter

				if (/(.*[A-Z].*)/.test(this.body.password)) {
					progress += 20;
				}

				// at menons a lowercase

				if (/(.*[a-z].*)/.test(this.body.password)) {
					progress += 20;
				}

				// more than 5 digits

				if (this.body.password.length >= 6) {
					progress += 20;
				}

				// at least one special character

				if (/[^A-Za-z0-9]/.test(this.body.password)) {
					progress += 20;
				}

				return progress;
			},
		},
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
