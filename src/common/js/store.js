import { writableChromeStorage } from '@common/js/store-utils';
import { writable } from 'svelte/store';

/** @type {import('svelte/store').Writable<string[]>} */
const blacklist = writableChromeStorage('blacklist', []);
/** @type {import('svelte/store').Writable<import('@common/js/types').Interval[]>} */
const intervals = writableChromeStorage('intervals', []);
/** @type {import('svelte/store').Writable<import('@common/js/types').Week>} */
const week = writableChromeStorage('week', {});
const snackbarMessage = writable('');

export { blacklist, intervals, week, snackbarMessage };
