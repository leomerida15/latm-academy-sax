<template>
	<section class="users-create">
		<vs-dialog :loading="loading" @close="exit" scroll v-model="active">
			<template #header>
				<h2 class="not-margin">Crear estudiantes</h2>
			</template>

			<template>
				<div class="center">
					<vs-alert success :progress="progress" v-model="TimeAlertSuccess">
						<template #title>
							{{ msg }}
						</template>
					</vs-alert>

					<vs-alert danger :progress="progress" v-model="TimeAlertDanger">
						<template #title>
							{{ msg }}
						</template>
					</vs-alert>
				</div>
			</template>

			<div class="con-form">
				<div class="ed-grid">
					<farm class="ed-grid m-grid-3">
						<select v-model="course">
							<option disabled selected>curso</option>
							<option v-for="(course, i) in courses" :key="i" :value="course._id">
								{{ course.name }}
							</option>
						</select>

						<vs-input v-model="n" type="number" min="0" placeholder="Numero de usuarios a crear" />

						<vs-button flat :active="true" @click="generar">
							Agregar estudiantes
						</vs-button>
					</farm>
					<template>
						<div class="center">
							<vs-table>
								<template #thead>
									<vs-tr>
										<vs-th>
											Nombre completo
										</vs-th>
										<vs-th>
											Email
										</vs-th>
										<vs-th>
											Direccion
										</vs-th>
										<vs-th>
											Actions
										</vs-th>
									</vs-tr>
								</template>
								<template #tbody>
									<vs-tr :key="i" v-for="(tr, i) in users" :data="tr">
										<vs-td>
											<vs-input v-model="users[i].fullname" type="text" placeholder="Nombre completo" />
										</vs-td>
										<vs-td>
											<vs-input v-model="users[i].email" type="email" placeholder="email" />
										</vs-td>
										<vs-td>
											<vs-input v-model="users[i].direction" type="text" placeholder="Direccion" />
										</vs-td>
										<vs-td>
											<div class="ed-container">
												<vs-button @click="eliminar_item(i)" circle color="danger">
													<v-icon name="trash"></v-icon>
												</vs-button>
											</div>
										</vs-td>
									</vs-tr>
								</template>
							</vs-table>
						</div>
					</template>
				</div>
				<br /><br />
			</div>

			<template #footer>
				<div class="footer-dialog">
					<div class="ed-grid m-grid-2">
						<div class="m-x-2 ed-grid">
							<vs-button flat :active="true" @click="create">
								crear estudiantes
							</vs-button>
						</div>
					</div>
				</div>
			</template>
		</vs-dialog>

		<div class="btn-flot">
			<vs-button circle to="/front/users/create">
				<v-icon name="plus"></v-icon>
			</vs-button>
		</div>
	</section>
</template>

<script lang="ts">
	// modules
	import Vue from 'vue';
	import { mapActions } from 'vuex';

	export default Vue.extend({
		name: 'users-create',
		props: {
			courses: { type: Array, required: true },
			active: { type: Boolean, required: true },
		},
		mounted() {},
		data() {
			const data: any = {
				loading: false,
				TimeAlertSuccess: false,
				TimeAlertDanger: false,
				time: 4000,
				progress: 0,
				users: [],
				course: '',
				msg: '',
				n: 0,
			};
			return data;
		},
		methods: {
			...mapActions('Users', ['createUsers', 'addUsersInCourse']),
			generar() {
				const length: number = this.users.length + 1;
				for (let i = 0; i < this.n; i++) {
					this.users.push({
						fullname: 'nombre ' + (length + i),
						email: 'correo' + (length + i) + '@correo.com',
						direction: 'diceccion ' + (length + i),
					});
				}

				this.n = 0;
			},
			eliminar_item(i: number) {
				this.users.splice(i, 1);
			},
			exit() {
				this.$router.push({ name: 'admin-users' });
			},
			Alert(type: boolean) {
				if (type) {
					this.msg = 'usuarios creados y agregados al curos';
					this.TimeAlertSuccess = true;

					const interval = setInterval(() => {
						this.progress++;
					}, this.time / 100);

					setTimeout(() => {
						this.TimeAlertSuccess = false;
						clearInterval(interval);
						this.progress = 0;
					}, this.time);
				} else {
					this.msg = 'usuarios no creados';

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
			async create() {
				try {
					// crear usuarios
					this.loading = true;
					const users: any[] = this.users;

					const create = await this.createUsers({ users });
					if (!create) throw '';

					console.log('create');
					console.log(create);

					const ids: string[] = create.map((item: any) => ({ _id: item._id }));
					const body: any = { body: { users: ids }, id: this.course };

					await this.addUsersInCourse(body);

					this.Alert(true);
				} catch (err) {
					this.Alert(false);
				}

				this.loading = false;
			},
		},
		computed: {},
	});
</script>
