<template>
	<vs-dialog :loading="loading" @close="back" :overflow-hidden="true" :prevent-close="true" :blur="true" dark v-model="active">
		<template #header>
			<h1 class="primary-text not-margin">
				{{ $t('sign_up.title') }}
				<b class="">!</b>
			</h1>
			<!-- <pre>{{ body }}</pre> -->
		</template>
		<div class="con-form">
			<vs-input
				@click="valid.email.alert = false"
				success
				type="email"
				v-model="body.email"
				:placeholder="$t('sign_up.email.label')"
			>
				<template #icon #message-success>
					<v-icon name="at"></v-icon>
				</template>

				<template v-if="valid.email.alert" #message-danger>
					{{ $t(valid.email.msg) }}
				</template>
			</vs-input>

			<vs-input @click="valid.name.alert = false" success type="text" v-model="body.name" :placeholder="$t('sign_up.name.label')">
				<template #icon #message-success>
					<v-icon name="rocket"></v-icon>
				</template>

				<template v-if="valid.name.alert" #message-danger>
					{{ $t(valid.name.msg) }}
				</template>
			</vs-input>

			<vs-input
				@click="valid.last_name.alert = false"
				success
				type="text"
				v-model="body.last_name"
				:placeholder="$t('sign_up.last_name.label')"
			>
				<template #icon #message-success>
					<v-icon name="rocket"></v-icon>
				</template>

				<template v-if="valid.last_name.alert" #message-danger>
					{{ $t(valid.last_name.msg) }}
				</template>
			</vs-input>

			<vs-input
				@click="valid.password.alert = false"
				success
				type="password"
				v-model="body.password"
				:placeholder="$t('sign_up.password.label')"
				:progress="getProgress"
				:visiblePassword="hasVisiblePassword"
				@click-icon="hasVisiblePassword = !hasVisiblePassword"
			>
				<template #icon>
					<i v-if="!hasVisiblePassword" class="bx bx-show-alt"></i>
					<v-icon name="lock"></v-icon>
				</template>

				<template v-if="getProgress >= 100" #message-success>
					{{ $t('sign_up.password.label') }}
				</template>

				<template v-if="valid.password.alert" #message-danger>
					{{ $t(valid.password.msg) }}
				</template>
			</vs-input>

			<vs-input
				@click="valid.re_password.alert = false"
				success
				type="password"
				v-model="body.re_password"
				:placeholder="$t('sign_up.repeat_password.label')"
			>
				<template #icon #message-success>
					<v-icon name="lock"></v-icon>
				</template>

				<template v-if="valid.re_password.alert" #message-danger>
					{{ $t(valid.re_password.msg) }}
				</template>
			</vs-input>
		</div>
		<template #footer>
			<div class="footer-dialog">
				<vs-button @click="register" block>
					{{ $t('sign_up.sign_up') }}
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
					{{ $t('sign_up.have_account') }}
					<router-link :to="'/auth/login'">{{ $t('login.login') }}!</router-link>
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
		name: 'auth-register',
		props: ['active'],
		mounted() {},
		data() {
			return {
				body: {
					email: '',
					password: '',
					re_password: '',
					name: '',
					last_name: '',
				},
				valid: {
					email: { alert: false, msg: '' },
					password: { alert: false, msg: '' },
					re_password: { alert: false, msg: '' },
					name: { alert: false, msg: '' },
					last_name: { alert: false, msg: '' },
				},
				click: false,
				hasVisiblePassword: false,
				loading: false,
			};
		},
		methods: {
			back() {
				this.$router.push({ name: 'Home' });
			},
			async register() {
				try {
					this.loading = true;

					const { name, last_name, email, password, re_password } = this.body;
					let valid: number = 0;

					if (/\d/.test(name)) {
						this.valid.name.alert = true;
						this.valid.name.msg = 'sign_up.name.invalid.pattern';
						valid++;
					} else if (!name) {
						this.valid.name.alert = true;
						this.valid.name.msg = 'sign_up.name.invalid.required';
						valid++;
					}

					if (/\d/.test(last_name)) {
						this.valid.last_name.alert = true;
						this.valid.last_name.msg = 'sign_up.last_name.invalid.pattern';
						valid++;
					} else if (!last_name) {
						this.valid.last_name.alert = true;
						this.valid.last_name.msg = 'sign_up.last_name.invalid.required';
						valid++;
					}

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

					if (re_password.length < 1 && re_password != password) {
						this.valid.re_password.alert = true;
						this.valid.re_password.msg = 'sign_up.repeat_password.invalid.required';
						valid++;
					}

					if (valid > 0) throw 'formulario no paso los requisitos';

					const resp: AxiosResponse = await Vue.axios.post('/auth/register', this.body);

					this.body = {
						email: '',
						password: '',
						re_password: '',
						name: '',
						last_name: '',
					};

					this.$router.push('/auth/login');
				} catch (err) {
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
			validPass() {
				if (this.body.re_password.length > 0 && this.body.password != this.body.re_password) {
					return false;
				} else {
					return true;
				}
			},
			validName() {
				if (!this.valid.name) return false;
				else if (!this.body.name) return 'required';
				else if (/\d/.test(this.body.name)) return 'pattern';
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
