import { writable } from 'svelte/store';

const globalStore  = writable({
		products: [],
		categories: [],
		comments: [],
	});

export const store = globalStore;