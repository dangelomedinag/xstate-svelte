import { writable } from 'svelte/store';

const filterState = writable({
	sortSelected: "<",
	categorieSelected: undefined,
	feedbackSelected: "like"
});

export const filterstore = filterState;