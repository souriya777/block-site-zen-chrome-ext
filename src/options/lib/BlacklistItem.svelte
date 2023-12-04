<script>
  import { createEventDispatcher } from 'svelte';
  import BinSvg from '@common/lib/BinSvg.svelte';
  import { stats } from '@common/js/store';

  export let domain;
  $: stat = $stats?.[domain] ?? 0;
  $: statLabel = stat > 1 ? 'times' : 'time';

  const dispatch = createEventDispatcher();

  function handleClick() {
    dispatch('click', {
      domain,
    });
  }
</script>

<div class="blacklist-item">
  <span class="stat">Blocked {stat} {statLabel}</span>
  <span class="domain">{domain}</span>
  <span class="action">
    <button class="icon primary" on:click={handleClick}>
      <BinSvg />
    </button>
  </span>
</div>

<style>
  .blacklist-item {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    width: 100%;
  }

  .stat {
    font-style: italic;
  }

  .domain {
    font-family: 'montserrat-700';
    overflow-x: scroll;
  }

  .action {
    justify-self: end;
  }
</style>
