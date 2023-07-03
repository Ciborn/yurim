<script setup lang="ts">
import Rainbow from 'rainbowvis.js';

defineProps<{
	cols: string[],
	entry: {
		id: number,
		position: number,
		localName: string,
		year: string,
		category: string,
		rating: number,
		status: string,
		startedAt: string,
		finishedAt: string,
		lastEp: number,
		progress: number,
	}
}>();

const rainbow = new Rainbow();
rainbow.setSpectrum('#661111', '#603311', '#114411');

function formatNumber(number: number) {
	return number
		? new Intl.NumberFormat('fr-FR', { minimumFractionDigits: 1 }).format(number)
		: null;
}
</script>

<template>
	<tr :class="['hover', entry.status === 'currently-watching' && 'bg-cyan-950']">
		<td class="text-slate-200">{{ entry.position }}</td>
		<td>
			{{ entry.localName }}
			<span class="brightness-75">({{ entry.year }})</span>
		</td>
		<td>{{ entry.category }}</td>
		<td v-if="cols.includes('rating')" :style="{ 'background-color': entry.rating ? `#${rainbow.colorAt(entry.rating * 10)}` : undefined }">{{ formatNumber(entry.rating) }}</td>
		<!-- <td v-if="entry.status === 'completed'" class="status"><div class="badge badge-sm badge-success"></div>Completed</td>
		<td v-if="entry.status === 'dropped'" class="status"><div class="badge badge-sm badge-error"></div>Dropped</td>
		<td v-if="entry.status === 'watching'" class="status"><div class="badge badge-sm badge-info"></div>Watching</td>
		<td v-if="entry.status === 'watchlist'" class="status"><div class="badge badge-sm badge-neutral"></div>Watchlist</td> -->
		<td v-if="cols.includes('progress')" class="flex flex-row items-center gap-3"><progress class="progress progress-success w-24" :value="entry.progress" max="100"></progress>ep. {{ entry.lastEp }}</td>
		<td v-if="cols.includes('started-on')">{{ entry.startedAt }}</td>
		<td v-if="cols.includes('finished-on')">{{ entry.finishedAt }}</td>
	</tr>
</template>

<style scoped>
table td.status {
	align-items: center;
	display: flex;
	flex-direction: row;
	gap: 0.4rem;
}
</style>
