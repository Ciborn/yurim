<script setup lang="ts">
import DramaEntry from './DramaEntry.vue';

defineProps<{
	cols: string[],
	dramas: any[],
}>();
</script>

<template>
	<table class="table table-sm table-pin-rows">
		<thead>
			<tr>
				<th></th>
				<th>Drama</th>
				<th>Category</th>
				<th v-if="cols.includes('rating')">Rating</th>
				<!-- <th>Status</th> -->
				<th v-if="cols.includes('progress')">Progress</th>
				<th v-if="cols.includes('started-on')">Started on</th>
				<th v-if="cols.includes('finished-on')">Finished on</th>
			</tr>
		</thead>
		<tbody>
			<DramaEntry v-for="drama in dramas" :entry="drama" :key="drama.id" :cols="cols" />
		</tbody>
	</table>
</template>

<style scoped></style>
