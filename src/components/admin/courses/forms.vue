<template>
	<section class="forms">
		<vs-table>
			<template #thead>
				<vs-tr>
					<vs-th>
						Name
					</vs-th>
					<vs-th>
						Email
					</vs-th>
					<vs-th>
						Id
					</vs-th>
				</vs-tr>
			</template>
			<template #tbody>
				<vs-tr :key="i" v-for="(tr, i) in inputs" :data="tr">
					<vs-td>
						{{ tr.name }}
					</vs-td>
					<vs-td>
						{{ tr.email }}
					</vs-td>
					<vs-td>
						{{ tr.id }}
					</vs-td>
				</vs-tr>
			</template>
		</vs-table>
	</section>
</template>

<script lang="ts">
	import Vue from 'vue';

	export default Vue.extend({
		name: 'forms',
		props: [],
		mounted() {},
		data() {
			return {
				inputs: [],
			};
		},
		methods: {},
		computed: {},
	});
</script>

<style scoped lang="scss"></style>
