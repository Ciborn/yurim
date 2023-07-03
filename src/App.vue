<script setup lang="ts">
import DramaList from './components/DramaList.vue';
import { parse } from 'graphql';
import { gql, request } from 'graphql-request';
import type { TypedDocumentNode } from '@graphql-typed-document-node/core';
import { ref } from 'vue';

const query: TypedDocumentNode = parse(gql`
	query {
		dramas(country: "kr") {
			id
			localName
			year
			category
			rating
			status
			startedAt
			finishedAt
			lastEp
			progress
		}
	}
`);

let entries = ref<any>([]);
request('http://localhost:3000/graphql', query).then((data: any) => {
	const { dramas } = data;

	const dramasByStatus = {
		dropped: [],
		completed: [],
		watching: [],
		watchlist: [],
	};

	for (const drama of dramas) {
		dramasByStatus[drama.status].push(drama);
	}

	for (const status of Object.keys(dramasByStatus)) {
		dramasByStatus[status].sort((a: any, b: any) => Date.parse(b.startedAt) - Date.parse(a.startedAt));

		for (let i = 0; i < dramasByStatus[status].length; i++) {
			dramasByStatus[status][i].position = dramasByStatus[status].length - i;
		}
	}
	
	entries.value = dramasByStatus;
});
</script>

<template>
	<main class="flex flex-col items-center gap-6 mt-4 mb-4">
		<section class="w-full max-w-3xl">
			<h2>Currently watching</h2>
			<DramaList :dramas="entries.watching" :cols="['rating', 'progress', 'started-on']" />
		</section>
		<section class="w-full max-w-3xl">
			<h2>Completed</h2>
			<DramaList :dramas="entries.completed" :cols="['rating', 'started-on', 'finished-on']" />
		</section>
		<section class="w-full max-w-3xl">
			<h2>Watchlist</h2>
			<DramaList :dramas="entries.watchlist" :cols="[]" />
		</section>
		<section class="w-full max-w-3xl">
			<h2>Dropped</h2>
			<DramaList :dramas="entries.dropped" :cols="['rating', 'started-on']" />
		</section>
	</main>
</template>

<style scoped>
</style>
