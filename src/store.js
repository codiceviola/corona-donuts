import { writable, derived } from 'svelte/store';

function getData() {
    const { subscribe, set, update } = writable({});

    return {
        subscribe,
        set,
        reset: () => set({})
    };
}

export const data = getData();