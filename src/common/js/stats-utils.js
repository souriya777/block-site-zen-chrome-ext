import { get } from 'svelte/store';
import { stats } from '@common/js/store';

const START_TIMESTAMP_KEY = '_START_TIMESTAMP';

function incrementStat(domain) {
  if (!get(stats)?.[START_TIMESTAMP_KEY]) {
    stats.update((current) => ({ ...current, [START_TIMESTAMP_KEY]: new Date().getTime() }));
  }

  let count = get(stats)?.[domain] ?? 0;
  stats.update((current) => ({ ...current, [domain]: count + 1 }));

  // TO DEBUG
  // console.log(get(stats));
}

export { incrementStat, START_TIMESTAMP_KEY };
