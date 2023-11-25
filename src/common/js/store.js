import { writableChromeStorage } from '@common/js/store-utils';

/** @type {import('svelte/store').Writable<string[]>} */
const blacklist = writableChromeStorage('blacklist', []);
/** @type {import('svelte/store').Writable<import('@common/js/types').Interval[]>} */
const intervals = writableChromeStorage('intervals', []);
/** @type {import('svelte/store').Writable<import('@common/js/types').Week>} */
const week = writableChromeStorage('week', {});

export { blacklist, intervals, week };
